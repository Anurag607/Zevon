import React from 'react'
import Image from 'next/image'
import styles from '../../src/styles/navbar.module.scss'
import Link from 'next/link'
import Cookie from 'js-cookie'
import parseCookies from '../../src/script/cookieParser.mjs'
import { userDetails } from '../utils/userDetails'
import Burger from './burgerMenu'
import { useRouter } from 'next/router'
import { search, searchonclick } from '../script/Search.mjs'

const NavBar = () => {

    const [userDetails, SetuserDetails] = React.useState<userDetails>({
        email: '',
        name: '',
        password: '',
        user_type: '',
        token: '',
        user_id: 0,
        phone_number: 0,
        address: {
            addr_id: 0,
            user_id: 0,
            address_line1: '',
            address_line2: '',
            city: '',
            pincode: 100000,
            country: ''
        }
    })
    
    const [itemList, setItemList] = React.useState(0)

    const router = useRouter()

    React.useEffect(() => {
        let cart = Cookie.get('cart')
        let auth = Cookie.get('currentLoggedIn')
        setItemList(JSON.parse(cart ? cart: `[]`).length)
        SetuserDetails(JSON.parse(auth || JSON.stringify(userDetails)))
        const searchico:HTMLElement = document.querySelector("#search-img")
        searchico.style.zIndex = '500'
    }, [])

    return (
        <nav className = {`${styles['nav']} nav`}>
            <Burger />
            <div className={styles["nav-left"]}>
                <li>
                    <Link href='/home' as='/home' passHref>
                        <a className= {styles.navl}>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href='/blog' as='/blog' passHref>
                        <a className= {styles.navl}>Blog</a>
                    </Link>
                </li>
                <li>
                    <Link href='about' as='/about' passHref>
                        <a className= {styles.navl}>About</a>
                    </Link>
                </li>
                <li>
                    <Link href='/contacts' as='/contacts' passHref>
                        <a className= {styles.navl}>Contact</a>
                    </Link>
                </li>
            </div>
            <div className={styles["nav-right"]}>
                <div className={styles["searchbox"]} id="searchbox">
                    <input type="search" id='searchInput' placeholder="Search" onKeyDown={(event) => {
                        if(event.key === 'Enter') {
                            Cookie.set('searchParams', event.currentTarget.value, {path: '/'})
                            Cookie.set('filterParams', JSON.stringify({url: event.currentTarget.value, data: {color: [event.currentTarget.value], category: [event.currentTarget.value], gender: [event.currentTarget.value], cost: []}}), {path: '/'})
                            router.push(`/filterRes/filterSearchResults`, `/filterRes/filterSearchResults`, {shallow: true})
                            // router.push(`/filterRes/search:${event.currentTarget.value}`, `/filterRes/search:${event.currentTarget.value}`, {shallow: true})
                        }
                    }} />
                    <div>
                        <Image src="/search1.png" id="search-img" className={styles['search-img']} alt="search" data-toggle="off" width={32} height={32} layout='intrinsic' onClick={searchonclick} />
                    </div>
                </div>
                <div className={styles["navicons"]}>
                    <Link href='/wishList' as='/wishList' passHref>
                        <a className= {styles["navico"]}>
                            <span>
                                <Image className={styles.navimg} src="/wishlist.png" alt="wishlist" width={32} height={32} layout='intrinsic' />
                            </span>
                        </a>
                    </Link>
                    <Link href={(itemList === 0) ? '#' : '/cart'} as='/cart' passHref>
                        <a className= {styles["navico"]}>
                            <span>
                                <Image className={styles.navimg} src="/cart.png" alt="cart" width={32} height={32} layout='intrinsic' />
                            </span>
                            <div className={styles.cartCount}>{itemList}</div>
                            {/* {(userDetails.hasOwnProperty("name") && userDetails.name.length > 0) ? <span className={styles.cartCount}>{itemList}</span> : <></>} */}
                        </a>
                    </Link>
                    {(userDetails.hasOwnProperty("name") && userDetails.name.length > 0) ?
                        <Link href='/dashboard' as={`/dashboard`} passHref>
                            <a className={styles.navDash} onClick={() => {}}>
                                <div />
                                <div>{userDetails.name}</div>
                            </a>
                        </Link>
                         : 
                        <Link href='/login' as='/login' passHref>
                            <a className={styles.login}>
                                <div />
                                <span>Login</span>
                            </a>
                        </Link> 
                    }
                </div>
            </div>
        </nav>
    )
}

export async function getServerSideProps ({req}) {
    const cookies = parseCookies(req)
    
    return {
        props : {
            auth: (cookies.currentLoggedIn) ? cookies.currentLoggedIn : "{}",
            cart: (cookies.orderDetails) ? cookies.orderDetails : `[]`
        }
    }
}

export default NavBar