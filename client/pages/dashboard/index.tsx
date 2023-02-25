import React from "react";
import styles from "./dash.module.scss";
import Link from "next/link";
import Cookie from "js-cookie";
import Head from "next/head";
import parseCookies from "../../src/script/cookieParser.mjs";
import { NextApiRequest } from "next";
import { userDetails } from "../../src/utils/userDetails";
import { useRouter } from "next/router";
import { ordersType } from "../../src/utils/ordersType";
import Image from "next/image";

const Dashboard = ({
  auth,
  orders,
}: {
  auth: string;
  orders: ordersType[];
}) => {
  const router = useRouter();

  const [userDetails, setUserDetails] = React.useState<userDetails>(
    JSON.parse(auth)
  );
  const [userAddr, setUserAddr] = React.useState<string>("");

  React.useEffect(() => {
    const body = document.querySelector("body");
    body.style.backgroundColor = "#ffffff";
    setUserAddr(
      `${
        userDetails.address.address_line1 !== null
          ? userDetails.address.address_line1
          : ""
      } ${
        userDetails.address.address_line2 !== null
          ? userDetails.address.address_line2
          : ""
      } ${
        userDetails.address.city !== null ? ", " + userDetails.address.city : ""
      } ${
        userDetails.address.country !== null
          ? ", " + userDetails.address.country
          : ""
      } ${
        userDetails.address.pincode !== null
          ? "- " + userDetails.address.pincode
          : ""
      }`
    );
  }, []); // eslint-disable-line

  const Orders = () => {
    let row = new Array(10).fill(1);
    return (
      <>
        {orders.length > 0 ? (
          <div className={styles.orders}>
            {orders.map((el, i) => {
              return (
                <div className={styles.head} key={i}>
                  <div>
                    <span className={styles.desc}>{`${el.product_desc}`}</span>
                    <span className={styles.qtynSize}>
                      <span>{`Quantity: ${el.qty}`}</span>
                      <span>{`Size: ${el.product_size}`}</span>
                    </span>
                    <span
                      className={styles.price}
                    >{`Price: ₹${el.price}`}</span>
                  </div>
                  <div
                    className={`${styles.itemImg} itemImg`}
                    style={{
                      backgroundImage: `url('${
                        typeof el.productimg === "string"
                          ? el.productimg
                          : "/casual2.jpg"
                      }')`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.noOrders}>
            <div className={styles.head}>
              <div>
                <h1>{"Oops!"}</h1>
                <p>{"no Orders available"}</p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div id="dashboard" className={styles.dashboard}>
      <Head>
        <link rel="icon" href="/z.png" type="image/x-icon" />
        <meta charSet="UTF-8" />
        <meta name="description" content="E-commerce Web App" />
        <meta name="keywords" content="Fashion, Commerce, Clothing" />
        <meta name="author" content="Deep" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Zevon</title>
      </Head>
      <section id="sidebar" className={styles.sidebar}>
        <div className={styles.title}>
          <h1>Z</h1>
          <span>e</span>
          <h3>v</h3>
          <span>on</span>
        </div>
        <Link href="/home" as="/home" passHref>
          <a id="logout" className={styles.home}>
            <Image src="/home.png" alt="home" width={32} height={32} />
            <span>Home</span>
          </a>
        </Link>
        <Link href="/login" as="/login" passHref>
          <a
            id="logout"
            className={styles.logout}
            onClick={() => {
              Cookie.remove("currentLoggedIn", { path: "" });
              router.push("/home", "/home", { shallow: true });
            }}
          >
            <Image src="/logout.svg" alt="logout" width={32} height={32} />
            <span>Logout</span>
          </a>
        </Link>
      </section>
      <section id="profile" className={styles.profile}>
        <div className={styles.sidebarToggle}>
          <div className={styles.title}>
            <h1>Z</h1>
            <span>e</span>
            <h3>v</h3>
            <span>on</span>
          </div>
          <Link href="/home" as="/home" passHref>
            <a id="logout" className={styles.home}>
              <Image src="/home.png" alt="home" width={32} height={32} />
              <span>Home</span>
            </a>
          </Link>
          <Link href="/login" as="/login" passHref>
            <a
              id="logout"
              className={styles.logout}
              onClick={() => {
                Cookie.remove("currentLoggedIn", { path: "" });
                router.push("/home", "/home", { shallow: true });
              }}
            >
              <Image src="/logout.svg" alt="logout" width={32} height={32} />
              <span>Logout</span>
            </a>
          </Link>
        </div>
        <div className={styles.header}>
          <Image
            src="/right-arrow.png"
            alt="right-arrow"
            height={32}
            width={32}
          />
          <div>
            <p>Hi {userDetails.name},</p>
            <span>Welcome Back!</span>
          </div>
        </div>
        <div className={styles.profile}>
          <div id="profileImg" className={styles.profileimg} />
          <div id="info" className={styles.info}>
            <span className={`${styles.name} name`}>
              <p>{`${
                typeof userDetails.name !== "undefined"
                  ? userDetails.name
                  : "-NA-"
              }`}</p>
            </span>
            <span className={`${styles.email} email`}>
              <span>Email Id:</span>
              <p>{`${
                typeof userDetails.email !== "undefined"
                  ? userDetails.email
                  : "-NA-"
              }`}</p>
            </span>
            <span className={`${styles.phnum} phnum`}>
              <span>Contact Number: </span>
              <p>{`${
                userDetails.phone_number === "undefined" ||
                userDetails.phone_number === null
                  ? "-NA-"
                  : userDetails.phone_number
              }`}</p>
            </span>
            <span className={`${styles.addr} addr`}>
              <span>Address: </span>
              <p>{`${
                userAddr !== undefined &&
                userAddr !== null &&
                userAddr !== "    "
                  ? userAddr
                  : "-NA-"
              }`}</p>
            </span>
          </div>
        </div>
        <Orders />
        <div className={styles.paymentDetails}></div>
      </section>
    </div>
  );
};

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const cookies = parseCookies(req);
  let userId = JSON.parse(cookies.currentLoggedIn).user_id;
  let orderDetails = [];
  let status = 201;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCTION_SERVER}/api/orders/getOrders`,
    {
      method: "POST",
      mode: "cors",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ userId: `${userId}` }),
    }
  );
  status = response.status;
  const resMessage = await response.json();
  orderDetails = resMessage;

  return {
    props: {
      auth: cookies.currentLoggedIn ? cookies.currentLoggedIn : "{}",
      orders: orderDetails,
    },
  };
}

export default Dashboard;
