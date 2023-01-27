import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter }  from 'next/router'
import styles from './home.module.scss'
import main from '../../src/script/main.mjs'
import NavBar  from '../../src/components/navbar'
import Footer from '../../src/components/footer'
import Cards from '../../src/components/cards'
import FilterDropDowns from '../../src/components/filter'
import Cookie from 'js-cookie'

// Main Function :------------------------------------------------------------------------------------

const Home = () => {

    const [images, setImages] = React.useState<string[]>([])
    const [isChecked, setIsChecked] = React.useState(true)

    const Fetcher = () => {
        let status = 200
        fetch('/api/images/', {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type' : 'application/json', 'type' : 'shopping' }
        })
        .then(response => {
            status = response.status
            return response.json()
        })
        .then(resMessage => {
            if(status === 200) setImages(currImages => currImages = resMessage)
            else {}
        })
    }

    React.useEffect(() => {
        Fetcher()
        main()
        Cookie.remove('filterParams', {path: ''})
        Cookie.remove('searchParams', {path: ''})
        Cookie.remove('urlId', {path: ''})
        Cookie.remove('currentItemSrc', {path: ''})
        Cookie.remove('orderDetails', {path: ''})
        Cookie.remove('filteredProducts', {path: ''})
        Cookie.remove('currentItem', {path: ''})
        const body = document.querySelector('body')
        body.style.backgroundColor = '#e8e8e8'
    },[])

    const handleChange = (event:React.ChangeEvent) => {
        if(isChecked) {
            setIsChecked(currState => currState = false)
            Cookie.set('flag', 'false')
        } else {
            setIsChecked(currState => currState = true)
            Cookie.set('flag', 'true')
        }
    }

    // Gender Switch :------------------------------------------------------------------------------------

    const Switch = () => {
        return (
            <div className={`${styles["switches-container"]} switches-container`}>
                <input type="radio" id="male" name="switchPlan" value="male" checked={isChecked} onChange={handleChange} />
                <input type="radio" id="female" name="switchPlan" value="female" checked={!isChecked} onChange={handleChange} />
                <label htmlFor="male">Male</label>
                <label htmlFor="female">Female</label>
                <div className={`${styles["switch-wrapper"]} switch-wrapper`}>
                    <div className={`${styles.switch} switch`} onClick={() => console.log()}>
                        <div>Male</div>
                        <div>Female</div>
                    </div>
                </div>
            </div>
        )
    }

    // Shopping Card Containers :------------------------------------------------------------------------------------

    const CardCont1 = () => {
        const img =  (images[0] as any as string[]) || ["c9", "c10", "c11", "c12", "c13", "c14", "c15", "c16"]
        const Row = () => {
            return (
                <div className={styles["card"]}>
                    {img.map((el,i) => {
                        return <Cards key={i} type='shopping' image={el} />
                    })}
                </div>
            )
        }
        return (
            <div className={`${styles["cardcont"]} cardCont`}>
                <div className={styles["heading"]}>
                    <p className={styles["div_title"]}>TRENDING</p>
                    <p className={styles["div_subtitle"]}>TOP WISHES OF THIS WEEK</p>
                </div>
                <Row />
    
                <br /><br /><br /><br />
            </div>
        )
    }
    
    const CardCont2 = () => {
        const img =  (images[1] as any as string[]) || ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"]
        const Row = () => {
            return (
                <div className={styles["card"]}>
                    {img.map((el,i) => {
                        return <Cards key={i} type='shopping' image={el} />
                    })}
                </div>
            )
        }
        return (
            <div className={`${styles["cardcont"]} cardCont`}>
                <div className={styles["heading"]}>
                    <p className={styles["div_title"]}>BEST SELLER</p>
                    <p className={styles["div_subtitle"]}>TOP PRODUCTS OF THIS WEEK</p>
                </div>
                <Row />
    
                <br /><br /><br /><br />
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <Head>
                <link rel = "icon" href = "/z.png" type = "image/x-icon" />
                <meta charSet="UTF-8" />
                <meta name="description" content="E-commerce Web App" />
                <meta name="keywords" content="Fashion, Commerce, Clothing" />
                <meta name="author" content="Deep" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
                <title>Zevon</title>
            </Head>
        
            {/* -----------------------------------TITLE-------------------------------------*/}
        
            <div id="title" className={`${styles.title} ${styles.main}`} style={{backgroundImage: "url('/a7.jpg')"}}>
        
                <NavBar />
        
                <div className={styles["logo"]}><i>Zevon</i></div>
                <div className={styles["shopcont"]}>
                    <a href="#cat-title-sep" className={styles["shopnow"]}>
                        <div className={styles.shopnowText}>Shop Now</div>
                    </a>
                </div>
            </div>
        
            <div id="cat-title-sep" className={`${styles["divider"]} ${styles["cat-title-sep"]}`} />
        
            {/* -----------------------------------CATEGORIES-------------------------------------*/}
        
            <Cards type='category' />
            
            <div className={styles.divider} />
            
            {/* -----------------------------------PAGINATOR-------------------------------------*/}
            {/* <div className={styles["page"]}>
                <div className={`${styles.paginator} ${styles.main}`}>
                    <div className={styles["filtercont"]} id="filtercont" data-toggle="off">
                        <span id="filter" className={styles.filter}>
                            <Image src="/filter1.png" alt="filter" width={32} height={32} layout='intrinsic' />
                        </span>
                        <span id="filterOff" className={styles.filterOff}>
                            <Image src="/cancel.png" alt="cancel" width={32} height={32} layout='intrinsic' />
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
                                router.push(`/filterRes/${JSON.parse(data).url}`, `/filterRes/${JSON.parse(data).url}`, {shallow: true})
                            } else {
                                router.push(`/filterRes/all`, `/filterRes/all`, {shallow: true})
                            }
                            
                        }}>{`Go >`}</button>
                    </section>
                    <FilterDropDowns />
                </menu>
            </div> */}
        
            {/* -----------------------------------SHOP-------------------------------------*/}
    
            <CardCont2 />
            
            <CardCont1 />
            
            <Cards type='blog' />
    
            <div className={styles.divider} />
    
            {/*-----------------------------------FOOTER-------------------------------------*/}
    
            {/* <Footer /> */}
        </div>
    )
}

export default Home