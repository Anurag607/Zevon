import React from "react";
import styles from "../styles/burgerMenu.module.scss";
import { Menu } from "../script/burger.mjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookie from "js-cookie";
import Image from "next/image";
import { userDetails } from "../utils/userDetails";
import { search } from "../script/Search.mjs";

const Burger = () => {
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
  const pathname = usePathname();

  /* eslint-disable */

  React.useEffect(() => {
    Menu();
    search();
    let cart = Cookie.get("cart");
    let auth = Cookie.get("currentLoggedIn");
    setItemList(JSON.parse(cart ? cart : `[]`).length);
    SetuserDetails(JSON.parse(auth || JSON.stringify(userDetails)));
  }, []);

  /* eslint-enable */

  const router = useRouter();

  return (
    <div
      className={`${styles.burgerWrapper} burgerWrapper`}
      style={{
        backgroundColor: `${pathname === "/home" ? "#ffffff" : "transparent"}`,
      }}
    >
      <div
        className={`${styles.menu1} menu1`}
        data-toggle="close"
        onClick={Menu}
      >
        <div className={`${styles.menuBarCont} menuBarCont`}>
          <span className={`${styles["menu_bar1"]} menu_bar1`} />
          <span className={`${styles["menu_bar2"]} menu_bar2`} />
          <span className={`${styles["menu_bar3"]} menu_bar3`} />
        </div>
      </div>
      <div className={`${styles["sidebar"]} sidebar`}>
        <li className={`${styles.sidebarel} sidebarel`}>
          <Link href="/home">
            <div className={`${styles.navl} navl`}>Home</div>
          </Link>
        </li>
        <li className={`${styles.sidebarel} sidebarel`}>
          <Link href="/blog">
            <div className={`${styles.navl} navl`}>Blog</div>
          </Link>
        </li>
        <li className={`${styles.sidebarel} sidebarel`}>
          <Link href="about">
            <div className={`${styles.navl} navl`}>About</div>
          </Link>
        </li>
        <li className={`${styles.sidebarel} sidebarel`}>
          <Link href="/contacts">
            <div className={`${styles.navl} navl`}>Contact</div>
          </Link>
        </li>
        <div className={`${styles["nav-right"]} nav-right`}>
          <div className={styles["searchbox"]} id="searchbox">
            <input
              type="search"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Burger;
