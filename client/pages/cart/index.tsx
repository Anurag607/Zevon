import React from 'react'
import Link from 'next/link'
import NavBar from '../../src/components/navbar'
import Footer from '../../src/components/footer'
import Head from 'next/head'
import styles from './cart.module.scss'
import Cards from '../../src/components/cards'
import { productType } from '../../src/utils/productType'
import { useRouter } from 'next/router'
import { NextApiRequest } from 'next'
import parseCookies from '../../src/script/cookieParser.mjs'
import Cookie from 'js-cookie'

const Page = ({cookieCart, userDetails} : {cookieCart: string, userDetails: string}) => {

    const router = useRouter()

    const [cart, setCart] = React.useState<productType[]>(JSON.parse(cookieCart ? cookieCart : '[]'))
    const [redirect, setRedirect] = React.useState(0)
    let ttlAmt = 0
    cart.forEach(el => {
        ttlAmt += el.cost*el.quantity
    })

    React.useEffect(() => {
        const bodySelector = document.querySelector("body")
        bodySelector.style.backgroundColor = "#ffffff"
    }, [])

    const ItemsCont = () => {
        let img = []
        let prices = []
        cart.forEach(el => {
            img.push(el.img_url)
            prices.push(el.cost)
        })
        const Row = () => {
            return (
                <div className={styles["card"]}>
                    {img.map((el,i) => {
                        return <Cards key={i} type='cartItems' image={el} price={prices[i]} details={cart[i]}/>
                    })}
                </div>
            )
        }
        return (
            <div className={`${styles["cardcont"]} cardCont`}>
                <Row />
            </div>
        )
    }

    const Bill = () => {
        let items = []
        let prices = []
        let qty = []
        let color = []
        let size = []
        cart.forEach(el => {
            items.push(el.description)
            prices.push(el.cost)
            qty.push(el.quantity)
            color.push(el.color)
            size.push(el.size)
        })
        return (
            <div className={styles["billContents"]}>
                {items.map((el,i) => {
                    return (
                        <div className={styles.item} key={i}>
                            <div className={`${styles.otherDetails} otherDetails`}>
                                <span className={`${styles.itemName} itemName`}>{el}</span>
                                <div className={styles.extra}>
                                    <span className={`${styles.Itemsize} size`}>Size: {size[i]} |</span>
                                    <span className={`${styles.Itemcolor} color`}>Color: {color[i]} |</span>
                                    <span className={`${styles.Itemqty} qty`}>Qty: {qty[i]}</span>
                                </div>
                            </div>
                            <span className={styles.price}> ₹{qty[i]*prices[i]} </span>
                        </div>
                    )
                })}
            </div>
        )
    }

    return(
        (cart.length === 0) ? <div className={styles.emptyCartWrapper}>
            <Head>
                <link rel = "icon" href = "/z.png" type = "image/x-icon" />
                <meta charSet="UTF-8" />
                <meta name="description" content="E-commerce Web App" />
                <meta name="keywords" content="Fashion, Commerce, Clothing" />
                <meta name="author" content="Deep" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
                <title>Zevon</title>
            </Head>
            <NavBar />
            <div className={styles.message}>
                <span />
                <h2>Oops! Your Cart is Empty!</h2>
                <p>Looks like you haven&apos;t added anything to your cart yet</p>
                <Link href={'/home'} as={'/home'} passHref>
                    <a>
                        <button>Shop Now</button>
                    </a>
                </Link>
            </div>
        </div> : 
        <div className={styles.cartWrapper}>
            <Head>
                <link rel = "icon" href = "/z.png" type = "image/x-icon" />
                <meta charSet="UTF-8" />
                <meta name="description" content="E-commerce Web App" />
                <meta name="keywords" content="Fashion, Commerce, Clothing" />
                <meta name="author" content="Deep" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
                <title>Zevon</title>
            </Head>
            <NavBar />
            <main className={`${styles.cartContent} cartContent`}>
                <section className={styles.itemList}>
                    <ItemsCont />
                </section>
                <section className={styles.bill}>
                    <h2 className={styles.head}>Order Details</h2>
                    <Bill />
                    <div className={styles.ttlAmt}>
                        Total Payable Amount : 
                        <span> ₹ {ttlAmt} </span>
                    </div>
                    <button className={styles.placeOrder} onClick={() => {
                        if(JSON.parse(userDetails || '{}').hasOwnProperty('token')) {
                            setRedirect(0)
                            Cookie.set('orderDetails', cookieCart)
                            Cookie.set('ttlAmt', ttlAmt)
                            router.push('/payment', '/payment', {shallow: true})
                        } else {
                            setRedirect(1)
                        }
                    }}>
                        Proceed
                    </button>
                </section>
            </main>
            <div className={styles.loginRedirect} style={{display: `${(redirect) ? 'flex' : 'none'}`}}>
                <div>
                    <h2 className={styles.message}>You must be logged in before proceeding!</h2>
                    <span className={styles.redirection}>
                        <Link href={'/login'} as={'/login'} passHref>
                            <a>
                                <button>Log In</button>
                            </a>
                        </Link>
                    </span>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export async function getServerSideProps ({req} : {req: NextApiRequest}) {
    const cookies = parseCookies(req)
    
    return {
        props : {
            cookieCart: (cookies.cart) ? cookies.cart : `[]`,
            userDetails: (cookies.currentLoggedIn) ? cookies.currentLoggedIn : `{}`
        }
    }
}

export default Page