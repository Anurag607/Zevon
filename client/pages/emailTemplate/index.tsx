import React from 'react'
import Head from 'next/head'
import NavBar from '../../src/components/navbar'
import Footer from '../../src/components/footer'
import styles from './email.module.css'
import { productType } from '../../src/utils/productType'
import { useRouter } from 'next/router'
import { NextApiRequest } from 'next'
import Cookie from 'js-cookie'
import parseCookies from '../../src/script/cookieParser.mjs'

const Page = ({cookieCart, userDetails} : {cookieCart: string, userDetails: string}) => {

    const router = useRouter()

    const [cart, setCart] = React.useState<productType[]>(JSON.parse(cookieCart ? cookieCart : '[]'))

    let ttlAmt = 0
    cart.forEach(el => {
        ttlAmt += el.cost*el.quantity
    })

    React.useEffect(() => {
        document.querySelector('body').style.backgroundColor = '#ffffff'
    }, [])

    const Bill = () => {
        let items = []
        let prices = []
        let img = []
        let qty = []
        cart.forEach(el => {
            img.push(el.img_url)
            items.push(el.description)
            prices.push(el.cost)
            qty.push(el.quantity)
        })
        return (
            <div className={styles["billContents"]}>
                {items.map((el,i) => {
                    return (
                        <div className={`${styles.item} item`} key={i}>
                            <span className={styles.itemImg} style={{backgroundImage: `url('${img[i]}')`}}/>
                            <span className={styles.itemName}>{el}</span>
                            <span className={styles.price}> ₹ {qty[i]*prices[i]} </span>
                        </div>
                    )
                })}
            </div>
        )
    }

    return( 
        <div className={styles.orderDetailsWrapper}>
            <Head>
                <link rel = "icon" href = "/z.png" type = "image/x-icon" />
                <meta charSet="UTF-8" />
                <meta name="description" content="E-commerce Web App" />
                <meta name="keywords" content="Fashion, Commerce, Clothing" />
                <meta name="author" content="Deep" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
                <title>Zevon | Order Details</title>
            </Head>
            <NavBar />
            <div className={styles.greeting}>
                <h1>Hello {JSON.parse(userDetails).name},</h1>
                <p>Thank you for your order, the details for which are listed below : </p>
            </div>
            <main className={`${styles.cartContent} cartContent`}>
                <div className={`${styles.bill} bill`}>
                    <h2 className={styles.head}>Order Details</h2>
                    <Bill />
                    <div className={styles.ttlAmt}>
                        Total Amount Settled: 
                        <span> ₹ {ttlAmt} </span>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export async function getServerSideProps ({req} : {req: NextApiRequest}) {
    const cookies = parseCookies(req)
    
    return {
        props : {
            cookieCart: (cookies.orderDetails) ? cookies.orderDetails : `[]`,
            userDetails: (cookies.currentLoggedIn) ? cookies.currentLoggedIn : `{}`
        }
    }
}

export default Page