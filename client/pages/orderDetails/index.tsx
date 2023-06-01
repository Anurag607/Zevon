import React from "react";
import Head from "next/head";
import NavBar from "../../src/components/navbar";
import Footer from "../../src/components/footer";
import styles from "./orderDetails.module.scss";
import { productType } from "../../src/utils/productType";
import { NextApiRequest } from "next";
import Cookie from "js-cookie";
import parseCookies from "../../src/script/cookieParser.mjs";
import { userDetails } from "../../src/utils/userDetails";
import Link from "next/link";
import { useRouter } from "next/router";

const Page = ({
  cookieCart,
  userDetails,
}: {
  cookieCart: string;
  userDetails: string;
}) => {
  const [cart, setCart] = React.useState<productType[]>(
    JSON.parse(cookieCart ? cookieCart : "[]")
  );
  const auth = React.useRef<userDetails>(JSON.parse(userDetails));
  const [userAddr, setUserAddr] = React.useState<string>("");

  const router = useRouter();

  let ttlAmt = 0;
  cart.forEach((el) => {
    ttlAmt += el.cost * el.quantity;
  });

  const sendMail = () => {
    let status = 200;
    fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTION_SERVER}/api/email/confirmation`,
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          user: userDetails,
          content: document.querySelector(".item").innerHTML,
        }),
      }
    )
      .then((response) => {
        status = response.status;
        return response;
      })
      .then((resMessage) => {
        if (status !== 200) {
        }
      });
  };

  const updateOrders = () => {
    let status = 201;
    let productIds = [];
    let productDescs = [];
    let productQtys = [];
    let productSizes = [];
    let product_imgs = [];
    let productPrices = [];
    let productColors = [];
    cart.map((el, i) => {
      productIds.push(el.product_id);
      productDescs.push(el.description);
      product_imgs.push(el.img_url);
      productPrices.push(el.cost);
      productSizes.push(el.size);
      productQtys.push(el.quantity);
      productColors.push(el.color);
    });
    let data = {
      user_id: auth.current.user_id,
      payment_id: auth.current.payment_id,
      product_ids: productIds,
      product_descs: productDescs,
      prices: productPrices,
      qtys: productQtys,
      product_sizes: productSizes,
      product_colors: productColors,
      productImgs: product_imgs,
    };
    fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTION_SERVER}/api/orders/placeOrder`,
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((resMessage) => {
        if (status === 201) {
        }
      });
  };

  React.useEffect(() => {
    const modal: HTMLDivElement = document.querySelector("#modal");
    modal.style.display = "none";
    setUserAddr(
      `${
        auth.current.address.address_line1 !== null
          ? auth.current.address.address_line1
          : ""
      } ${
        auth.current.address.address_line2 !== null
          ? auth.current.address.address_line2
          : ""
      } ${
        auth.current.address.city !== null
          ? ", " + auth.current.address.city
          : ""
      } ${
        auth.current.address.country !== null
          ? ", " + auth.current.address.country
          : ""
      } ${
        auth.current.address.pincode !== null
          ? "- " + auth.current.address.pincode
          : ""
      }`
    );
  }, []);

  const Bill = () => {
    let items = [];
    let prices = [];
    let img = [];
    let qty = [];
    let color = [];
    let size = [];
    cart.forEach((el) => {
      img.push(el.img_url);
      items.push(el.description);
      prices.push(el.cost);
      qty.push(el.quantity);
      color.push(el.color);
      size.push(el.size);
    });
    return (
      <div className={`${styles["billContents"]} billContents`}>
        {items.map((el, i) => {
          return (
            <div className={`${styles.item} item`} key={i}>
              <span
                className={`${styles.itemImg} itemImg`}
                style={{ backgroundImage: `url('${img[i]}')` }}
              />
              <div className={`${styles.otherDetails} otherDetails`}>
                <span className={`${styles.itemName} itemName`}>{el}</span>
                <div className={styles.extra}>
                  <span className={`${styles.Itemsize} size`}>
                    Size: {size[i]} |
                  </span>
                  <span className={`${styles.Itemcolor} color`}>
                    Color: {color[i]} |
                  </span>
                  <span className={`${styles.Itemqty} qty`}>Qty: {qty[i]}</span>
                </div>
              </div>
              <span className={`${styles.price} price`}>
                {" "}
                ₹{qty[i] * prices[i]}{" "}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.orderDetailsWrapper}>
      <Head>
        <link rel="icon" href="/z.png" type="image/x-icon" />
        <meta charSet="UTF-8" />
        <meta name="description" content="E-commerce Web App" />
        <meta name="keywords" content="Fashion, Commerce, Clothing" />
        <meta name="author" content="Deep" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Zevon | Order Details</title>
      </Head>
      <NavBar />
      <div className="item">
        <div
          style={{
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "5rem",
          }}
        >
          <div className={`${styles.greeting} greeting`}>
            <h1>Hello {JSON.parse(userDetails).name},</h1>
            <p>{userAddr}</p>
            <p>Your order details for which are listed below : </p>
          </div>
          <main className={`${styles.cartContent} cartContent`}>
            <div className={`${styles.bill} bill`}>
              <h2 className={`${styles.head} head`}>Order Details</h2>
              <Bill />
              <div className={`${styles.ttlAmt} ttlAmt`}>
                Total Payable Amount:
                <span> ₹ {ttlAmt} </span>
              </div>
            </div>
          </main>
        </div>
      </div>
      <button
        className={styles.placeOrder}
        onClick={() => {
          updateOrders();
          const modal: HTMLDivElement = document.querySelector("#modal");
          modal.style.display = "flex";
          sendMail();
          Cookie.remove("cart");
          Cookie.remove("ttlAmt");
        }}
      >
        Place Order
        <span />
      </button>
      <div className={styles.modal} id="modal">
        <div>
          <span className={styles.checkmark} />
          <h2 className={styles.confirmation}>Your Order has been Placed!</h2>
          <span className={styles.redirection}>
            <Link href={"/home"} as={"/home"} passHref>
              <a>
                <button>Continue Shopping</button>
              </a>
            </Link>
            .
          </span>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const cookies = parseCookies(req);

  return {
    props: {
      cookieCart: cookies.orderDetails ? cookies.orderDetails : `[]`,
      userDetails: cookies.currentLoggedIn ? cookies.currentLoggedIn : `{}`,
    },
  };
}

export default Page;
