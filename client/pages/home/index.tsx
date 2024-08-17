import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./home.module.scss";
import main from "../../src/script/main.mjs";
import NavBar from "../../src/components/navbar";
import Footer from "../../src/components/footer";
import Cards from "../../src/components/cards";
import FilterDropDowns from "../../src/components/filter";
import Cookie from "js-cookie";

// Main Function :------------------------------------------------------------------------------------

const Home = () => {
  const [images, setImages] = React.useState<string[]>([]);
  const [isChecked, setIsChecked] = React.useState(true);

  const Fetcher = () => {
    let status = 200;
    fetch("/api/images/", {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json", type: "shopping" },
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((resMessage) => {
        if (status === 200)
          setImages((currImages) => (currImages = resMessage));
        else {
        }
      });
  };

  React.useEffect(() => {
    Fetcher();
    main();
    Cookie.remove("filterParams", { path: "" });
    Cookie.remove("searchParams", { path: "" });
    Cookie.remove("urlId", { path: "" });
    Cookie.remove("currentItemSrc", { path: "" });
    Cookie.remove("orderDetails", { path: "" });
    Cookie.remove("filteredProducts", { path: "" });
    Cookie.remove("currentItem", { path: "" });
    const body = document.querySelector("body");
    body.style.backgroundColor = "#e8e8e8";
  }, []);

  const handleChange = (event: React.ChangeEvent) => {
    if (isChecked) {
      setIsChecked((currState) => (currState = false));
      Cookie.set("flag", "false");
    } else {
      setIsChecked((currState) => (currState = true));
      Cookie.set("flag", "true");
    }
  };

  // Gender Switch :------------------------------------------------------------------------------------

  const Switch = () => {
    return (
      <div className={`${styles["switches-container"]} switches-container`}>
        <input
          type="radio"
          id="male"
          name="switchPlan"
          value="male"
          checked={isChecked}
          onChange={handleChange}
        />
        <input
          type="radio"
          id="female"
          name="switchPlan"
          value="female"
          checked={!isChecked}
          onChange={handleChange}
        />
        <label htmlFor="male">Male</label>
        <label htmlFor="female">Female</label>
        <div className={`${styles["switch-wrapper"]} switch-wrapper`}>
          <div className={`${styles.switch} switch`}>
            <div>Male</div>
            <div>Female</div>
          </div>
        </div>
      </div>
    );
  };

  // Shopping Card Containers :------------------------------------------------------------------------------------

  const CardCont1 = () => {
    const img = (images[0] as any as string[]) || [
      "c9",
      "c10",
      "c11",
      "c12",
      "c13",
      "c14",
      "c15",
      "c16",
    ];
    const Row = () => {
      return (
        <div className={styles["card"]}>
          {img.map((el, i) => {
            return <Cards key={i} type="shopping" image={el} />;
          })}
        </div>
      );
    };
    return (
      <div className={`${styles["cardcont"]} cardCont`}>
        <div className={styles["heading"]}>
          <p className={styles["div_title"]}>TRENDING</p>
          <p className={styles["div_subtitle"]}>TOP WISHES OF THIS WEEK</p>
        </div>
        <Row />

        <br />
        <br />
        <br />
        <br />
      </div>
    );
  };

  const CardCont2 = () => {
    const img = (images[1] as any as string[]) || [
      "c1",
      "c2",
      "c3",
      "c4",
      "c5",
      "c6",
      "c7",
      "c8",
    ];
    const Row = () => {
      return (
        <div className={styles["card"]}>
          {img.map((el, i) => {
            return <Cards key={i} type="shopping" image={el} />;
          })}
        </div>
      );
    };
    return (
      <div className={`${styles["cardcont"]} cardCont`}>
        <div className={styles["heading"]}>
          <p className={styles["div_title"]}>BEST SELLER</p>
          <p className={styles["div_subtitle"]}>TOP PRODUCTS OF THIS WEEK</p>
        </div>
        <Row />

        <br />
        <br />
        <br />
        <br />
      </div>
    );
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ text: "", file: null });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsLoading(false);
      setIsSubmitted(true);
      // closeModal();
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/z.png" type="image/x-icon" />
        <meta charSet="UTF-8" />
        <meta name="description" content="E-commerce Web App" />
        <meta name="keywords" content="Fashion, Commerce, Clothing" />
        <meta name="author" content="Deep" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Zevon</title>
      </Head>

      {/* -----------------------------------TITLE-------------------------------------*/}

      {isModalOpen && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              <img src={"/cancel.png"} alt="cancel" width={16} height={16} />
            </button>
            <h2>
              {isSubmitted ? (
                <div
                  className={styles["backButton"]}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSubmitted(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    width="16"
                    height="16"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                    image-rendering="optimizeQuality"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    viewBox="0 0 298 511.93"
                  >
                    <path
                      fill="white"
                      fill-rule="nonzero"
                      d="M285.77 441c16.24 16.17 16.32 42.46.15 58.7-16.16 16.24-42.45 16.32-58.69.16l-215-214.47c-16.24-16.16-16.32-42.45-.15-58.69L227.23 12.08c16.24-16.17 42.53-16.09 58.69.15 16.17 16.24 16.09 42.54-.15 58.7l-185.5 185.04L285.77 441z"
                    />
                  </svg>
                </div>
              ) : (
                <>{"Try On!"}</>
              )}
            </h2>
            {isSubmitted ? (
              <div className={styles.imageOutput}>
                {/* <img
                  src={"output.png" ?? URL.createObjectURL(formData.file)}
                  alt="output"
                /> */}
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit1}>
                <label>
                  <p>{"Item Name: "}</p>
                  <input
                    type="text"
                    name="text"
                    value={formData.text}
                    onChange={handleChange1}
                    className={styles.inputField}
                  />
                </label>
                <label>
                  <p>{"Image: "}</p>
                  <input
                    type="file"
                    name="file"
                    onChange={handleChange1}
                    className={styles.fileInput}
                  />
                </label>
                <button type="submit" className={styles.submitButton}>
                  Submit
                </button>
                {isLoading && (
                  <div className={styles["spinner-overlay"]}>
                    <div className={styles.spinner}></div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}

      <div
        id="title"
        className={`${styles.title}`}
        style={{ backgroundImage: "url('/a7.jpg')" }}
      >
        <NavBar openModal={openModal} />

        <div className={styles["logo"]}>
          <i>Zevon</i>
        </div>
        <div className={styles["shopcont"]}>
          <a href="#cat-title-sep" className={styles["shopnow"]}>
            <div className={styles.shopnowText}>Shop Now</div>
          </a>
        </div>
      </div>

      <div
        id="cat-title-sep"
        className={`${styles["divider"]} ${styles["cat-title-sep"]}`}
      />

      {/* -----------------------------------CATEGORIES-------------------------------------*/}

      <Cards type="category" />

      <div className={styles.divider} />

      {/* -----------------------------------PAGINATOR-------------------------------------*/}
      {/* <div className={styles["page"]}>
                <div className={`${styles.paginator}`}>
                    <div className={styles["filtercont"]} id="filtercont" data-toggle="off">
                        <span id="filter" className={styles.filter}>
                            <Image src="/filter1.png" alt="filter" width={32} height={32} />
                        </span>
                        <span id="filterOff" className={styles.filterOff}>
                            <Image src="/cancel.png" alt="cancel" width={32} height={32} />
                        </span>
                    </div>
                    <div>
                        <span id="prev" className={styles.prev}> {'<'} </span>
                        <span id="next" className={styles.next}> {'>'} </span>
                    </div>
                </div>
                <menu className={styles["items-wrapper"]} id="items-wrapper">
                    <section>
                        <div className={styles["item-cont-range"]} data-toggle="off" style={{display: "flex; flex-direction: column"}}>
                            <label htmlFor="price">Price Range</label>
                            <div>
                                <span id='minPrice'>{0}</span>
                                <input type="range" id='price' name='price' className={`${styles.menu} ${styles.priceSlider}`} min="0" max="2500" step="500" />
                                <span id='maxPrice'>{2500}</span>
                            </div>
                        </div>
                        <div className={`${styles["item-cont"]} itemCont`} id="items-cont" data-toggle="off">
                            <span className={styles["menu"]} data-type="Colors">Color</span>
                        </div>
                        <div className={`${styles["item-cont"]} itemCont`} id="items-cont" data-toggle="off">
                            <span className={styles["menu"]} data-type="Categories">Category</span>
                        </div>
                        <Switch />
                        <button className={`goBtn ${styles.resGo}`} onClick={() => {
                            let data = Cookie.get('filterParams')
                            if(typeof data !== 'undefined' && data!.length > 0 && JSON.parse(data).url.length > 0) {
                                router.push(`/filterRes/${JSON.parse(data).url}`)
                            } else {
                                router.push(`/filterRes/all`)
                            }
                            
                        }}>{`Go >`}</button>
                    </section>
                    <FilterDropDowns />
                </menu>
            </div> */}

      {/* -----------------------------------SHOP-------------------------------------*/}

      <CardCont2 />

      <CardCont1 />

      <Cards type="blog" />

      <div className={styles.divider} />

      {/*-----------------------------------FOOTER-------------------------------------*/}

      <Footer />
    </div>
  );
};

export default Home;
