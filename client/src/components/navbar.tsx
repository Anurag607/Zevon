import React from "react";
import Image from "next/image";
import styles from "../../src/styles/navbar.module.scss";
import Link from "next/link";
import Cookie from "js-cookie";
import parseCookies from "../../src/script/cookieParser.mjs";
import { userDetails } from "../utils/userDetails";
import Burger from "./burgerMenu";
import { usePathname, useRouter } from "next/navigation";
import { search, searchonclick } from "../script/Search.mjs";

const NavBar = ({ openModal }: { openModal?: VoidFunction }) => {
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
  const pathname = usePathname();

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
    <div
      className={`${styles[`${pathname !== "/home" ? "nav-light" : "nav"}`]} ${
        pathname !== "/home" ? "nav-light" : "nav"
      }`}
    >
      <Burger />
      <div className={styles["nav-left-hero"]}>
        <li>
          <Link href="/home" className={styles.navl}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/blog" className={styles.navl}>
            Blog
          </Link>
        </li>
        <li>
          <Link href="about" className={styles.navl}>
            About
          </Link>
        </li>
        <li>
          <Link className={styles.navl} href="/contacts">
            Contact
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
                router.push(`/filterRes/filterSearchResults`);
                if (pathname === "/filterRes/filterSearchResults")
                  router.refresh();
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
          <Link
            href="/wishList"
            className={styles["navico"]}
            onClick={(e) => {
              e.preventDefault();
              openModal();
            }}
          >
            <span>
              <Image
                className={styles.navimg}
                src="/wishlist.png"
                alt="wishlist"
                width={32}
                height={32}
              />
            </span>
          </Link>
          <Link
            className={styles["navico"]}
            href={itemList === 0 ? "/#" : "/cart"}
          >
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
          </Link>
          {userDetails.hasOwnProperty("name") && userDetails.name.length > 0 ? (
            <Link href="/dashboard" className={styles.navDash}>
              <div>{userDetails.name}</div>
            </Link>
          ) : (
            <Link href="/login" className={styles["login-hero"]}>
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
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
