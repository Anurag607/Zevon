// eslint-disable

import { useState, useEffect, FormEvent, useContext } from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

import styles from "./filterRes.module.scss";
import NavBar from "../../src/components/navbar";
import Cards from "../../src/components/cards";
import { filterParamsType } from "../../src/utils/filterParamsType";
import parseCookies from "../../src/script/cookieParser.mjs";
import filterRes from "../../src/script/filterRes.mjs";
import { AppContext } from "../_app";

const colors = [
  "red",
  "green",
  "yellow",
  "blue",
  "black",
  "white",
  "orange",
  "purple",
  "pink",
  "gray",
  "brown",
  "teal",
];

const hex = [
  "#ff4040",
  "#4cbb17",
  "#ffef00",
  "#2a52be",
  "#000000",
  "#e8e8e8",
  "#fc6a03",
  "#7851a9",
  "#faafba",
  "#37474f",
  "#65350f",
  "#008080",
];

const categories = [
  "Shirts & Tops",
  "Pants & Lowers",
  "Jackets",
  "Accessories",
  "Shoes & Footwear",
];
const type = ["shirt", "lowers", "jackets", "accessories", "shoes"];

const ProductList = ({ result }) => {
  let img_sources: string[] = [];
  (result !== undefined ? result : []).forEach(
    (el: filterParamsType | string) => {
      if (typeof el === "string") img_sources.push(el);
      else img_sources.push(el.img_url);
    }
  );
  return (
    <section className={`${styles.resList} resList`}>
      {(result !== undefined ? result : []).map(
        (el: filterParamsType | string, i: number) => {
          return (
            <Cards
              key={i}
              type="shopping"
              details={el}
              image={img_sources[i]}
            />
          );
        }
      )}
    </section>
  );
};

const Page = ({ products }: { products: filterParamsType[] | string[] }) => {
  const router = useRouter();
  const { setIsLoading } = useContext(AppContext);
  const [gender, setGender] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    let filterCookies = Cookie.get("filterParams");
    if (filterCookies && filterCookies !== undefined) {
      filterCookies = JSON.parse(filterCookies);
      if (filterCookies.data === undefined) return;

      let genderCookie = [filterCookies.url];
      if (filterCookies.data.gender !== undefined) {
        genderCookie = Array.from(
          new Set([...genderCookie, ...filterCookies.data.gender])
        );
      }

      let categoryCookie = [];
      if (filterCookies.data.category !== undefined) {
        categoryCookie.push(...filterCookies.data.category);
      }

      setGender(genderCookie);
      setCategory(categoryCookie);
    }
  }, [products]);

  useEffect(() => {
    filterRes(false);
    Cookie.remove("searchParams", { path: "" });
    const body = document.querySelector("body");
    body.style.backgroundColor = "#ffffff";
  }, []);

  const fetcher = () => {
    let status = 200;
    fetch(`${process.env.NEXT_PUBLIC_PRODUCTION_SERVER}/api/product/filtered`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: Cookie.get("filterParams").data ?? `{}`,
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((resMessage) => {
        if (status === 200) {
          let data = JSON.parse(
            Cookie.get("filterParams") ?? {
              url: "",
              data: {
                color: [],
                category: [],
                gender: [],
                cost: [],
              },
            }
          ).data;
          let urlId = "";
          for (let key of Object.keys(data)) {
            let value = data[key];
            let len = value.length;
            if (len > 0) {
              urlId += `${key}:`;
              for (let i = 0; i < len; i++) {
                if (i !== len - 1) urlId += `${value[i]},`;
                else urlId += `${value[i]}`;
              }
              urlId += ";";
            }
          }
          urlId = urlId.substring(0, urlId.length - 1);
          Cookie.set("urlId", urlId, { path: "" });
          router.push(`/filterRes?${urlId.replaceAll(":", "=")}`);
        }
      })
      .catch((err) => console.error(err.message));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    filterRes(true);
    fetcher();
  };

  const FilterBar = () => {
    let row = [];
    let clrLen = colors.length / 2;
    let index = 0;

    while (clrLen--) {
      for (let i = 0; i < 1; i++) {
        row.push(
          <div className={styles.filterColorRow}>
            <span key={index} data-color={hex[index]} className="filterColor">
              <input
                type="checkbox"
                id={`${colors[index]}`}
                name="color"
                value={`${colors[index]}`}
              />
              <label htmlFor={`${colors[index]}`}>{`${colors[index]}`}</label>
            </span>
            <span
              key={index + 1}
              data-color={hex[index + 1]}
              className="filterColor"
            >
              <input
                type="checkbox"
                id={`${colors[index + 1]}`}
                name="color"
                value={`${colors[index + 1]}`}
              />
              <label htmlFor={`${colors[index + 1]}`}>{`${
                colors[index + 1]
              }`}</label>
            </span>
          </div>
        );
        index += 2;
      }
    }

    let ColorColumn = () => {
      return (
        <div className={styles.filterColor}>
          <h3>color : </h3>
          {row.map((el, i) => {
            return <div key={i}>{el}</div>;
          })}
        </div>
      );
    };

    let CatColumn = () => {
      return (
        <div className={styles.filterCategory}>
          <h3>category : </h3>
          {categories.map((el, i) => {
            return (
              <span key={i}>
                <input
                  type="checkbox"
                  id={`${type[i]}`}
                  name="category"
                  value={`${type[i]}`}
                  defaultChecked={category.some((catEl) =>
                    el.toLocaleLowerCase().includes(catEl)
                  )}
                />
                <label htmlFor={`${type[i]}`}>{`${el}`}</label>
              </span>
            );
          })}
        </div>
      );
    };

    return (
      <section className={`${styles.filterOptions} filterOptions`}>
        <form
          className={`${styles.filterForm} filterForm`}
          onSubmit={handleSubmit}
        >
          <div className={styles.filterGender}>
            <h3>gender : </h3>
            <span>
              <input
                type="checkbox"
                id="msex"
                name="gender"
                value="male"
                defaultChecked={gender.includes("male")}
              />
              <label htmlFor="msex">male</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="fsex"
                name="gender"
                value="female"
                defaultChecked={gender.includes("female")}
              />
              <label htmlFor="fsex">female</label>
            </span>
          </div>
          <ColorColumn />
          <CatColumn />
          <div className={styles.filterCost}>
            <h3>cost : </h3>
            <span>
              <input type="checkbox" id="low" name="cost" value="0,500" />
              <label htmlFor="low">₹0-₹500</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="average"
                name="cost"
                value="500,1000"
              />
              <label htmlFor="average">₹500-₹1000</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="intermediate"
                name="cost"
                value="1000,1500"
              />
              <label htmlFor="intermediate">₹1000-₹1500</label>
            </span>
            <span>
              <input type="checkbox" id="high" name="cost" value="1500,2000" />
              <label htmlFor="high">₹1500-₹2000</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="expensive"
                name="cost"
                value="2000,2500"
              />
              <label htmlFor="expensive">₹2000-₹2500</label>
            </span>
          </div>
          <input type="submit" className={styles.goFilter} value="Go >" />
        </form>
      </section>
    );
  };

  return (
    <div className={styles.filterResWrapper}>
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
      <div className={styles.resContent}>
        <section>
          <div
            className={`${styles.filterToggle} filterToggle`}
            data-toggle="close"
            onClick={(event) => {
              const target = event.currentTarget;
              const filter: HTMLElement =
                document.querySelector(".filterOptions");
              if (target.dataset.toggle == "close") {
                filter.style.width = "100vw";
                target.dataset.toggle = "open";
              } else {
                filter.style.width = "0vw";
                target.dataset.toggle = "close";
              }
            }}
          >
            <div />
            Filter
          </div>
        </section>
        <FilterBar />
        <ProductList result={products} />
      </div>
    </div>
  );
};

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const cookies = parseCookies(req);

  if (cookies.filterParams === undefined) {
    return {
      redirect: {
        destination: "/nf",
        permanent: false,
      },
    };
  }
  const filter = {
    ...JSON.parse(cookies.filterParams),
    search: cookies.searchParams ?? "",
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCTION_SERVER}/api/product/filtered`,
    {
      method: "POST",
      mode: "cors",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(filter),
    }
  );

  if (!response.ok) {
    res.writeHead(302, { Location: "/nf" }).end();
    return {
      props: {
        products: [],
      },
    };
  }

  const data = await response.json();

  if (data) {
    return {
      props: {
        products: data,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/nf",
        permanent: false,
      },
    };
  }
}

export default Page;
