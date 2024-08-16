import React from "react";
import { useRouter } from "next/router";
import styles from "./payment.module.scss";
import Head from "next/head";
import NavBar from "../../src/components/navbar";
import Footer from "../../src/components/footer";
import { userDetails } from "../../src/utils/userDetails";
import Cookie from "js-cookie";
import parseCookies from "../../src/script/cookieParser.mjs";
import { NextApiRequest } from "next";
import { deSelectOptions } from "../../src/script/deselect.mjs";

const Page = ({ userDetails }: { userDetails: string }) => {
  const router = useRouter();

  const auth = React.useRef<userDetails>(JSON.parse(userDetails));
  const styling = {
    warning: React.useRef<HTMLInputElement>(null),
  };

  const [phNum, setPhnum] = React.useState(
    auth.current.phone_number !== "undefined" ? auth.current.phone_number : ""
  );
  const [fname, setfname] = React.useState(auth.current.name.split(" ")[0]);
  const [lname, setlname] = React.useState(auth.current.name.split(" ")[1]);
  const [userEmail, setemail] = React.useState(auth.current.email);
  const address = React.useRef(
    `${
      auth.current.address.address_line1 != null
        ? `${auth.current.address.address_line1}${auth.current.address.address_line2}`
        : ""
    }`
  );

  const payment = {
    payment_type: React.useRef(""),
    provider_name: React.useRef(""),
  };

  const [addr, SetAddr] = React.useState({
    address: address.current.length > 0 ? address.current : "",
    city:
      typeof auth.current.address.city !== "undefined" &&
      auth.current.address.city !== null
        ? auth.current.address.city
        : "",
    pincode:
      typeof auth.current.address.pincode !== "undefined" &&
      auth.current.address.pincode !== null
        ? `${auth.current.address.pincode}`
        : "",
    country:
      typeof auth.current.address.country !== "undefined" &&
      auth.current.address.country !== null
        ? auth.current.address.country
        : "",
  });

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.currentTarget;
    switch (target.name) {
      case "addr": {
        SetAddr({
          ...addr,
          address: target.value,
        });
        break;
      }
      case "pin": {
        SetAddr({
          ...addr,
          pincode: target.value,
        });
        break;
      }
      case "city": {
        SetAddr({
          ...addr,
          city: target.value,
        });
        break;
      }
      case "country": {
        SetAddr({
          ...addr,
          country: target.value,
        });
        break;
      }
      case "phnum": {
        setPhnum(target.value);
        break;
      }
      case "fname": {
        setfname(target.value);
        break;
      }
      case "lname": {
        setlname(target.value);
        break;
      }
      case "email": {
        setemail(target.value);
        break;
      }
      default: {
        SetAddr({
          ...addr,
        });
        break;
      }
    }
  };

  const userFetcher = () => {
    let status = 201;
    let userDetails = {
      user_id: auth.current.user_id,
      name: `${fname} ${lname}`,
      phone_number: phNum,
      email: userEmail,
    };
    if (
      userDetails.name === auth.current.name &&
      userDetails.phone_number === auth.current.phone_number &&
      userDetails.email === auth.current.email
    )
      return;
    fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTION_SERVER}/api/user/updateProfile`,
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userDetails),
      }
    )
      .then((response) => {
        status = response.status;
        return response;
      })
      .then((resMessage) => {
        if (status !== 201) {
          console.log("ERROR IN USER UPDATION!");
        } else {
          auth.current = {
            ...auth.current,
            name: userDetails.name,
            phone_number: userDetails.phone_number,
            email: userDetails.email,
          };
          Cookie.set("currentLoggedIn", JSON.stringify(auth.current), {
            expires: 0.125,
          });
        }
      });
  };

  const addrFetcher = () => {
    let status = 201;
    let address = {
      user_id: auth.current.user_id,
      addr_1:
        addr.address.length > 128 ? addr.address.slice(0, 127) : addr.address,
      addr_2:
        addr.address.length > 128
          ? addr.address.slice(128, addr.address.length - 1)
          : "",
      city: addr.city,
      pincode: addr.pincode,
      country: addr.country,
    };
    if (
      address.addr_1 === auth.current.address.address_line1 &&
      address.addr_2 === auth.current.address.address_line2 &&
      address.pincode === `${auth.current.address.pincode}` &&
      address.city === auth.current.address.city &&
      address.country === auth.current.address.country
    )
      return;
    fetch(`${process.env.NEXT_PUBLIC_PRODUCTION_SERVER}/api/user/address`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(address),
    })
      .then((response) => {
        status = response.status;
        return response;
      })
      .then((resMessage) => {
        if (status !== 201) {
          console.log("ERROR IN ADDR INSERTION!");
        } else {
          auth.current.address = {
            addr_id: auth.current.address.addr_id,
            user_id: auth.current.user_id,
            address_line1:
              addr.address.length > 128
                ? addr.address.slice(0, 127)
                : addr.address,
            address_line2:
              addr.address.length > 128
                ? addr.address.slice(128, addr.address.length - 1)
                : "",
            city: addr.city,
            pincode: parseInt(addr.pincode),
            country: addr.country,
          };
          Cookie.set("currentLoggedIn", JSON.stringify(auth.current), {
            expires: 0.125,
          });
        }
      });
  };

  const paymentFetcher = () => {
    let status = 201;
    let paymentDetails = {
      cust_id: auth.current.user_id,
      payment_type: payment.payment_type.current,
      provider_name: payment.provider_name.current,
      total_amount: parseFloat(Cookie.get("ttlAmt")),
      payment_status: "complete",
    };
    fetch(`${process.env.NEXT_PUBLIC_PRODUCTION_SERVER}/api/user/payment`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(paymentDetails),
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((resMessage) => {
        if (status !== 201) {
          console.log("ERROR IN PAYMENT INSERTION!");
        } else {
          auth.current["payment_id"] = resMessage.payment_id;
          Cookie.set("currentLoggedIn", JSON.stringify(auth.current), {
            expires: 0.125,
          });
        }
      });
  };

  const cardValidation = () => {
    styling.warning.current!.style.display = "none";

    const cvv: HTMLInputElement = document.querySelector("#cvv");
    const cvvLabel: HTMLLabelElement = document.querySelector("#cvvLabel");
    const cardnum: HTMLInputElement = document.querySelector("#cardnum");
    const cardnumLabel: HTMLLabelElement =
      document.querySelector("#cardnumLabel");
    const masterCardrgx =
      /^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/;
    if (masterCardrgx.test(cardnum.value) === false) {
      cardnum.style.borderColor = "rgba(255, 0, 0, 0.5)";
      cardnum.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
      cardnum.style.color = "#ffffff";
      cardnumLabel.style.padding = "0rem 1rem";
      cardnumLabel.style.color = "rgba(255, 0, 0, 0.5)";
      cardnumLabel.innerHTML = "Invalid Card Number";
      if (cardnum === document.activeElement) {
        cardnumLabel.style.top = "-0.175rem";
        cardnumLabel.style.left = "0.375rem";
      }
      return;
    } else {
      cardnum.style.borderColor = "#c5c5c5";
      cardnum.style.backgroundColor = "#ffffff";
      cardnum.style.color = "#c5c5c5";
      cardnumLabel.style.padding = "0rem 0rem";
      cardnumLabel.innerHTML = "Card Number";
      cardnumLabel.style.color = "#c5c5c5";
    }
    if (cvv.value.length !== 3) {
      cvv.style.borderColor = "rgba(255, 0, 0, 0.5)";
      cvv.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
      cvv.style.color = "#ffffff";
      cvvLabel.style.color = "rgba(255, 0, 0, 0.5)";
      cvvLabel.style.padding = "0.15rem 1rem";
      cvvLabel.innerHTML = "Invalid CVV";
      if (cvv === document.activeElement) {
        cvvLabel.style.top = "-0.175rem";
        cvvLabel.style.left = "0.375rem";
      }
      return;
    } else {
      cvv.style.borderColor = "#c5c5c5";
      cvv.style.backgroundColor = "#ffffff";
      cvv.style.color = "#c5c5c5";
      cvvLabel.style.padding = "0rem 0rem";
      cvvLabel.innerHTML = "cvc/cvv";
      cvvLabel.style.color = "#c5c5c5";
    }
    router.push("/orderDetails", "/orderDetails", { shallow: true });
  };

  const upiValidation = () => {
    styling.warning.current!.style.display = "none";

    const upi: HTMLInputElement = document.querySelector("#upiId");
    const upiLabel: HTMLLabelElement = document.querySelector("#upiLabel");
    const upirgx = /^[a-zA-Z0-9.\-_]{2,256}@paypal$/;
    if (upirgx.test(upi.value) === false) {
      upi.style.borderColor = "rgba(255, 0, 0, 0.5)";
      upi.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
      upi.style.color = "#ffffff";
      upiLabel.style.padding = "0rem 1rem";
      upiLabel.style.color = "rgba(255, 0, 0, 0.5)";
      upiLabel.innerHTML = "Invalid Upi ID";
      if (upi === document.activeElement) {
        upiLabel.style.top = "-0.175rem";
        upiLabel.style.left = "0.375rem";
      }
      return;
    } else {
      upi.style.borderColor = "#c5c5c5";
      upi.style.backgroundColor = "#ffffff";
      upi.style.color = "#c5c5c5";
      upiLabel.style.padding = "0rem 0rem";
      upiLabel.innerHTML = "Upi Id";
      upiLabel.style.color = "#c5c5c5";
    }
    router.push("/orderDetails", "/orderDetails", { shallow: true });
  };

  return (
    <div className={styles.paymentWrapper}>
      <Head>
        <link rel="icon" href="/z.png" type="image/x-icon" />
        <meta charSet="UTF-8" />
        <meta name="description" content="E-commerce Web App" />
        <meta name="keywords" content="Fashion, Commerce, Clothing" />
        <meta name="author" content="Deep" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Zevon</title>
      </Head>
      <NavBar />
      <div className={styles.paymentPage}>
        <div className={styles.heading}>
          <h1>Checkout</h1>
        </div>
        <form
          className={styles.content}
          onSubmit={(event) => {
            event.preventDefault();
            if (payment.payment_type.current === "upi") upiValidation();
            else if (payment.payment_type.current === "card") cardValidation();
            else if (phNum === "") {
              styling.warning.current!.style.display = "block";
              styling.warning.current!.innerHTML = "Enter Phone Number";
            } else if (
              addr.address === "" ||
              addr.city === "" ||
              addr.country === "" ||
              addr.pincode === ""
            ) {
              styling.warning.current!.style.display = "block";
              styling.warning.current!.innerHTML = "Enter all Address Details";
            } else if (payment.payment_type.current === "") {
              styling.warning.current!.style.display = "block";
              styling.warning.current!.innerHTML = "Select a Payment Method";
            }
            userFetcher();
            addrFetcher();
            paymentFetcher();
          }}
        >
          <div className={styles.prsnlblockWrapper}>
            <aside>
              <span>{`01`}</span>
              <h2>{"personal details"}</h2>
            </aside>
            <div className={styles.prsnlForm}>
              <div className={styles.name}>
                <div className={styles.inputField}>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    value={fname}
                    onChange={HandleChange}
                    required
                  />
                  <label htmlFor={"fname"}>{"first name"}</label>
                </div>
                <div className={styles.inputField}>
                  <input
                    type="text"
                    name="lname"
                    id="lname"
                    value={lname || ""}
                    onChange={HandleChange}
                    required
                  />
                  <label htmlFor={"lname"}>{"last name"}</label>
                </div>
              </div>
              <div className={styles.others}>
                <div className={styles.inputField}>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={userEmail}
                    onChange={HandleChange}
                    required
                  />
                  <label htmlFor={"email"}>{"email address"}</label>
                </div>
                <div className={styles.inputField}>
                  <input
                    type="tel"
                    name="phnum"
                    id="phnum"
                    value={phNum}
                    onChange={HandleChange}
                    required
                  />
                  <label htmlFor={"phnum"}>{"phone number"}</label>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.shippingblockWrapper}>
            <aside>
              <span>{`02`}</span>
              <h2>{"shipping address"}</h2>
            </aside>
            <div className={styles.shippingForm}>
              <div className={styles.address}>
                <div className={styles.inputField}>
                  <input
                    type="text"
                    name="addr"
                    id="addr"
                    value={addr.address}
                    onChange={HandleChange}
                    required
                  />
                  <label htmlFor={"addr"}>address</label>
                </div>
              </div>
              <div className={styles.others}>
                <div className={styles.inputField}>
                  <input
                    type="text"
                    name="pin"
                    id="pin"
                    value={addr.pincode}
                    onChange={HandleChange}
                    required
                  />
                  <label htmlFor={"pin"}>{"pin code"}</label>
                </div>
                <div className={styles.inputField}>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={addr.city}
                    onChange={HandleChange}
                    required
                  />
                  <label htmlFor={"city"}>{"city"}</label>
                </div>
                <div className={styles.inputField}>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={addr.country}
                    onChange={HandleChange}
                    required
                  />
                  <label htmlFor={"country"}>{"country"}</label>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.paymentblockWrapper}>
            <aside>
              <span>{`03`}</span>
              <h2>{"payment method"}</h2>
            </aside>
            <div className={styles.paymentForm}>
              <div className={styles.options}>
                <span>
                  <span style={{ backgroundImage: `url('/paypal.png')` }} />
                  <label htmlFor="upi">{"PayPal"}</label>
                  <input
                    type="radio"
                    className="option_upi"
                    name="upi"
                    id="upi"
                    onClick={() => {
                      deSelectOptions();
                      const upi: HTMLDivElement =
                        document.querySelector(".upi");
                      const card: HTMLDivElement =
                        document.querySelector(".card");
                      upi.style.display = "flex";
                      (
                        upi.children[0].children[0] as HTMLInputElement
                      ).required = true;
                      card.style.display = "none";
                      payment.payment_type.current = "upi";
                      payment.provider_name.current = "paypal";
                    }}
                  />
                </span>
                <span>
                  <span style={{ backgroundImage: `url('/mastercard.png')` }} />
                  <label htmlFor="card">{"Credit Card or Debit"}</label>
                  <input
                    type="radio"
                    className="option_card"
                    name="card"
                    id="card"
                    onClick={() => {
                      deSelectOptions();
                      const upi: HTMLDivElement =
                        document.querySelector(".upi");
                      const card: HTMLDivElement =
                        document.querySelector(".card");
                      upi.style.display = "none";
                      card.style.display = "flex";
                      card.childNodes.forEach(
                        (el: HTMLDivElement, i: number) => {
                          (el.children[0] as HTMLInputElement).required = true;
                        }
                      );
                      payment.payment_type.current = "card";
                      payment.provider_name.current = "rupay";
                    }}
                  />
                </span>
              </div>
              <div className={`${styles.upi} upi`}>
                <div className={styles.inputField}>
                  <input type="text" name="upiId" id="upiId" autoFocus />
                  <label id={"upiLabel"} htmlFor={"upiId"}>
                    {"upi id"}
                  </label>
                </div>
              </div>
              <div className={`${styles.card} card`}>
                <div className={styles.inputField}>
                  <input type="text" name="cardnum" id="cardnum" autoFocus />
                  <label id={"cardnumLabel"} htmlFor={"cardnum"}>
                    {"card number"}
                  </label>
                </div>
                <div className={styles.inputField}>
                  <input
                    type="date"
                    name="expirydate"
                    id="expirydate"
                    onChange={HandleChange}
                  />
                  <label htmlFor={"expirydate"}>{"expiry date"}</label>
                </div>
                <div className={styles.inputField}>
                  <input type="number" name="cvv" id="cvv" />
                  <label id={"cvvLabel"} htmlFor={"cvv"}>
                    {"cvc/cvv"}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <input
              type="submit"
              className={styles.proceed}
              value={"Checkout"}
            />
            <span className={styles.warning} ref={styling.warning}>
              Invalid Username or Password
            </span>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const cookies = parseCookies(req);

  if (cookies.currentLoggedIn) {
    return {
      props: {
        userDetails: cookies.currentLoggedIn ? cookies.currentLoggedIn : "{}",
      },
    };
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

export default Page;
