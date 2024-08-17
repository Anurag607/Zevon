import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/card.module.scss";
import Cookie from "js-cookie";
import { productType } from "../utils/productType";
import { useRouter } from "next/navigation";
import { AppContext } from "../../pages/_app";

// Main Function :------------------------------------------------------------------------------------

const Cards = (props: {
  type?: string;
  image?: string;
  price?: number;
  details?: productType | string;
}) => {
  const router = useRouter();
  const { setIsLoading } = useContext(AppContext);

  // Blog Cards:------------------------------------------------------------------------------------

  const BlogGen: React.FC<{ img: string }> = (props) => {
    let src = `/${props.img}.jpg`;
    return (
      <div className={styles["c"]}>
        <div
          className={styles.shopimgCont}
          style={{ backgroundImage: `url(${src})` }}
        >
          <Image src={src} alt="Image17" width={256} height={384} />
        </div>
        <div className={styles["overlay1"]} />
      </div>
    );
  };

  const Blog = () => {
    const img = ["m1", "w3", "m3", "w5"];
    return (
      <div className={`${styles["cardcont"]} ${styles["blog"]} cardCont`}>
        <div className={styles["heading"]}>
          <p className={styles["div_title"]}>LATEST FROM BLOG</p>
          <p className={styles["div_subtitle"]}>
            THE FRESHEST AND MOST EXCITING NEWS
          </p>
        </div>
        <div className={styles["card"]}>
          {img.map((el, i) => {
            return <BlogGen key={i} img={el} />;
          })}
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  };

  // Shopping Cards :------------------------------------------------------------------------------------

  const Sizegen: React.FC<{ size: string }> = (props) => {
    return (
      <li>
        {props.size}
        <div className={styles.overlay} />
      </li>
    );
  };

  const CardGen: React.FC<{
    img: string;
    price: number;
    details: productType | string;
  }> = (props) => {
    let data =
      typeof props.details === "string"
        ? JSON.parse(props.details || JSON.stringify({ quantity: 6 }))
        : props.details;
    let src = props.img[0] !== "/" ? `/${props.img}.webp` : props.img;
    if (props.img === "placeholder") src = `/${props.img}.png`;
    let size = ["S", "M", "L", "XL", "XXL"];
    if (typeof props.details !== "string") size = props.details.size.split(",");
    const temp = src.split("/");
    let img_name = props.img[0] !== "/" ? props.img : temp[temp.length - 1];
    return (
      <div
        className={styles.c}
        onClick={() => {
          Cookie.set("currentItemSrc", src);
          Cookie.set("currentItem", JSON.stringify(props.details));
        }}
      >
        <Link
          href={data.quantity > 0 ? "/items/[id]" : "/#"}
          as={data.quantity > 0 ? `/items/${img_name}` : ""}
        >
          <div>
            <div
              className={styles.shopimgCont}
              style={{ backgroundImage: `url(${src})` }}
            >
              {props.img !== "placeholder" ? (
                <Image src={src} alt="Image" width={256} height={320} />
              ) : (
                <></>
              )}
            </div>
            {props.img === "placeholder" ? (
              <></>
            ) : data.quantity > 0 ? (
              <>
                <span className={styles["cardwish"]}>
                  <Image
                    src="/wish.svg"
                    alt="ADD TO WISHLIST"
                    width={43}
                    height={43}
                  />
                </span>
                <div className={styles["size"]}>
                  <ul>
                    {size.map((el, i) => {
                      return <Sizegen key={i} size={el} />;
                    })}
                  </ul>
                </div>
                <span className={styles["itemPrice"]}>
                  {" "}
                  ₹{" "}
                  {typeof props.details !== "string" && props.details.cost
                    ? props.details.cost
                    : props.price}{" "}
                </span>
              </>
            ) : (
              <div className={styles.outOfStock}>
                <p>Out of Stock</p>
              </div>
            )}
          </div>
        </Link>
      </div>
    );
  };

  // Category Grid :------------------------------------------------------------------------------------

  const CategoryGen: React.FC<{
    color: string;
    img: string;
    width: string;
    height: string;
    type: string;
  }> = (props) => {
    let src: string | string[];
    if (props.img == "shoes") {
      src = `/${props.img}.jpg`;
    } else {
      src = `/${props.img}.webp`;
    }

    return (
      <div
        className={styles["cards"]}
        onClick={() => {
          let type = "others";
          let params = props.type.toLowerCase();
          if (params === "men") {
            params = "male";
            type = "gender";
          } else if (params === "women") {
            params = "female";
            type = "gender";
          }

          let filters = {
            url: params,
            data: {
              color: [],
              category: [],
              gender: [],
              cost: [],
            },
          };

          if (type === "gender") filters["data"]["gender"].push(`${params}`);
          else filters["data"]["category"].push(`${params}`);

          Cookie.set("filterParams", JSON.stringify(filters), {
            path: "/",
          });
          const filterCookie = Cookie.get("filterParams");

          if (filterCookie && filterCookie !== undefined) {
            setIsLoading(true);
            const query =
              type === "gender" ? `gender=${params}` : `category=${params}`;
            router.push(`/filterRes?${query}`);
          }
        }}
      >
        <div className={styles.catImg}>
          <img src={src} alt="category" style={{ objectFit: "cover" }} />
        </div>
        <div className={styles["overlay"]}>
          <div
            className={styles["card_text"]}
            style={{ "--color": `${props.color}` } as React.CSSProperties}
          >
            <span>{props.type}</span>
          </div>
        </div>
      </div>
    );
  };

  const Categories = () => {
    const img = ["ms", "mn", "wt", "mt", "at", "shoes"];
    const clr = [
      "#32de84",
      "#faafba",
      "#faafba",
      "#2a52be",
      "#aa336a",
      "#a64b2a",
    ];
    const type = ["Sale", "New", "Women", "Men", "Accessories", "Shoes"];
    const width = ["310", "310", "310", "310", "310", "628"];
    const height = ["265.78", "265.78", "544.9", "265.78", "265.78", "430.6"];
    return (
      <div className={`${styles["category"]}`}>
        {img.map((el, i) => {
          return (
            <CategoryGen
              key={i}
              img={el}
              color={clr[i]}
              type={type[i]}
              width={width[i]}
              height={height[i]}
            />
          );
        })}
      </div>
    );
  };

  // Cart Items :------------------------------------------------------------------------------------

  const CartItems: React.FC<{
    img: string;
    price: number;
    details: productType | string;
  }> = (props) => {
    let src = props.img[0] !== "/" ? `/${props.img}.webp` : props.img;
    if (props.img === "placeholder") src = `/${props.img}.png`;
    return (
      <div className={styles.cartItem}>
        <div
          className={styles.shopimgCont}
          style={{ backgroundImage: `url(${src})` }}
        />
        {props.img === "placeholder" ? (
          <></>
        ) : (
          <div className={styles.overlay}>
            {typeof props.details !== "string" ? (
              <>
                <span
                  className={styles["price"]}
                  style={{
                    backgroundColor: `${
                      props.details.color === "white"
                        ? "#e8e8e8"
                        : props.details.color
                    }`,
                  }}
                >
                  {" "}
                  ₹ {props.price}{" "}
                </span>
                <span
                  className={styles["size"]}
                  style={{
                    backgroundColor: `${
                      props.details.color === "white"
                        ? "#e8e8e8"
                        : props.details.color
                    }`,
                  }}
                >
                  {" "}
                  Size : {props.details.size}{" "}
                </span>
                <span
                  className={styles["qty"]}
                  style={{
                    backgroundColor: `${
                      props.details.color === "white"
                        ? "#e8e8e8"
                        : props.details.color
                    }`,
                  }}
                >
                  {" "}
                  {typeof props.details.quantity !== "undefined" &&
                  props.details.quantity !== null
                    ? props.details.quantity
                    : 1}{" "}
                </span>
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    );
  };

  const CardRenderer: React.FC<{
    type: string;
    img: string;
    price: number;
    details?: productType | string;
  }> = (props) => {
    switch (props.type) {
      case "shopping": {
        return (
          <CardGen
            img={props.img}
            details={props.details}
            price={props.price}
          />
        );
        break;
      }

      case "blog": {
        return <Blog />;
        break;
      }

      case "category": {
        return <Categories />;
        break;
      }

      case "cartItems": {
        return (
          <CartItems
            img={props.img}
            price={props.price}
            details={props.details}
          />
        );
        break;
      }

      default: {
        return <></>;
        break;
      }
    }

    return <></>;
  };

  return (
    <CardRenderer
      type={props.type ? props.type : ""}
      img={props.image ? props.image : "placeholder"}
      price={props.price ? props.price : 1200.0}
      details={props.details ? props.details : ``}
    />
  );
};

export default Cards;
