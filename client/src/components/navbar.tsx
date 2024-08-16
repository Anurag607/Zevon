import React from "react";
import Image from "next/image";
import styles from "../../src/styles/navbar.module.scss";
import Link from "next/link";
import Cookie from "js-cookie";
import parseCookies from "../../src/script/cookieParser.mjs";
import { userDetails } from "../utils/userDetails";
import Burger from "./burgerMenu";
import { useRouter } from "next/router";
import { search, searchonclick } from "../script/Search.mjs";

const NavBar = () => {
  const [userDetails, SetuserDetails] = React.useState<userDetails>({
    email: "",
    name: "",
    password: "",
    user_type: "",
    token: "",
    user_id: 0,
    phone_number: "",
    address: {
      addr_id: 0,
      user_id: 0,
      address_line1: "",
      address_line2: "",
      city: "",
      pincode: 100000,
      country: "",
    },
  });

  const [itemList, setItemList] = React.useState(0);

  const router = useRouter();

  /* eslint-disable */

  React.useEffect(() => {
    let cart = Cookie.get("cart");
    let auth = Cookie.get("currentLoggedIn");
    setItemList(JSON.parse(cart ? cart : `[]`).length);
    SetuserDetails(JSON.parse(auth || JSON.stringify(userDetails)));
    const searchico: HTMLElement = document.querySelector("#search-img");
    searchico.style.zIndex = "500";
  }, []);

  /* eslint-enable */

  return (
    <nav className={`${styles["nav"]} nav`}>
      <Burger />
      <div className={styles["nav-left"]}>
        <li>
          <Link href="/home">
            <div className={styles.navl}>Home</div>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <div className={styles.navl}>Blog</div>
          </Link>
        </li>
        <li>
          <Link href="about">
            <div className={styles.navl}>About</div>
          </Link>
        </li>
        <li>
          <Link href="/contacts">
            <div className={styles.navl}>Contact</div>
          </Link>
        </li>
      </div>
      <div className={styles["nav-right"]}>
        <div className={styles["searchbox"]} id="searchbox">
          <input
            type="search"
            id="searchInput"
            placeholder="Search"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                Cookie.set("searchParams", event.currentTarget.value, {
                  path: "/",
                });
                Cookie.set(
                  "filterParams",
                  JSON.stringify({
                    url: event.currentTarget.value,
                    data: {
                      color: [event.currentTarget.value],
                      category: [event.currentTarget.value],
                      gender: [event.currentTarget.value],
                      cost: [],
                    },
                  }),
                  { path: "/" }
                );
                router.push(
                  `/filterRes/filterSearchResults`,
                  `/filterRes/filterSearchResults`,
                  { shallow: true }
                );
                if (router.asPath === "/filterRes/filterSearchResults")
                  router.reload();
              }
            }}
          />
          <div>
            <Image
              src="/search1.png"
              id="search-img"
              className={styles["search-img"]}
              alt="search"
              data-toggle="off"
              width={32}
              height={32}
              onClick={searchonclick}
            />
          </div>
        </div>
        <div className={styles["navicons"]}>
          <Link href="/wishList">
            <div className={styles["navico"]}>
              <span>
                <Image
                  className={styles.navimg}
                  src="/wishlist.png"
                  alt="wishlist"
                  width={32}
                  height={32}
                />
              </span>
            </div>
          </Link>
          <Link href={itemList === 0 ? "#" : "/cart"}>
            <div className={styles["navico"]}>
              <span>
                <Image
                  className={styles.navimg}
                  src="/cart.png"
                  alt="cart"
                  width={32}
                  height={32}
                />
              </span>
              <div className={styles.cartCount}>{itemList}</div>
              {/* {(userDetails.hasOwnProperty("name") && userDetails.name.length > 0) ? <span className={styles.cartCount}>{itemList}</span> : <></>} */}
            </div>
          </Link>
          {userDetails.hasOwnProperty("name") && userDetails.name.length > 0 ? (
            <Link href="/dashboard">
              <div className={styles.navDash} onClick={() => {}}>
                <div />
                <div>{userDetails.name}</div>
              </div>
            </Link>
          ) : (
            <Link href="/login">
              <div
                className={styles.login}
                onMouseOver={(event) =>
                  (event.currentTarget.style.color = "#37474f")
                }
              >
                <div />
                <span>Login</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export async function getServerSideProps({ req }) {
  const cookies = parseCookies(req);

  return {
    props: {
      auth: cookies.currentLoggedIn ? cookies.currentLoggedIn : "{}",
      cart: cookies.orderDetails ? cookies.orderDetails : `[]`,
    },
  };
}

export default NavBar;
