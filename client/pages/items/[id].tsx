import React from 'react'
import { useRouter } from 'next/router'
import styles from './itemPage.module.scss'
import Head from 'next/head'
import NavBar from '../../src/components/navbar'
import Footer from '../../src/components/footer'
import {deSelectSize, deSelectColor} from '../../src/script/deselect.mjs'
import {selectColor} from '../../src/script/select.mjs'
import { productType } from '../../src/utils/productType'
import Cookie from 'js-cookie'
import parseCookies from '../../src/script/cookieParser.mjs'
import ZoomIn from '../../src/components/zoomIn'
import zoomIn from '../../src/script/zoomIn.mjs'
import { NextApiRequest } from 'next'

const Page = ({cookieCart, img_src, item_details} : {cookieCart: 'NA', img_src: 'NA', item_details: string}) => {

    const router = useRouter()

    const product_details = JSON.parse(item_details ? item_details : '{}')

    const itemDetails = React.useRef<productType>(JSON.parse(Cookie.get('currentItem') || '{}'))
    const [warning, setWarning] = React.useState({
        flag: 0,
        message: ''
    })
    const selectedParams = {
        color: React.useRef<number>(product_details.color),
        size: React.useRef<number>(product_details.size)
    }

    const [cart, setCart] = React.useState<productType[]>(JSON.parse(Cookie.get('cart') ? Cookie.get('cart') : '[]'))

    const select = () => {
        let params = JSON.parse(Cookie.get('selectedParams') || '{}')
        let colorIndex = params.color
        let sizeIndex = params.size
        if(typeof colorIndex === 'undefined' || typeof colorIndex === 'string') colorIndex = 0
        const color:NodeListOf<HTMLSpanElement> = document.querySelectorAll('.colors')
        const halo:NodeListOf<HTMLSpanElement> = document.querySelectorAll('.colorHalo')
        color[colorIndex].style.transform = 'scale(1.1)'
        halo[colorIndex].style.width = `${color[colorIndex].offsetWidth*0.085}rem`
        halo[colorIndex].style.height = `${color[colorIndex].offsetHeight*0.085}rem`

        if(typeof sizeIndex !== 'undefined' && typeof sizeIndex === 'number') {
            const sizes:NodeListOf<HTMLElement> = document.querySelectorAll('.sizes')
            if(typeof itemDetails.current !== 'string') itemDetails.current.size = sizes[sizeIndex].textContent
            sizes[sizeIndex].style.transform = 'scale(1.1)'
            sizes[sizeIndex].style.backgroundColor = '#32de84'
            sizes[sizeIndex].style.color = '#e8e8e8'
        }
    }

    React.useEffect(() => {
        zoomIn()
        select()
        if(typeof itemDetails.current !== 'string') itemDetails.current.quantity = 1
    }, [])

    const updateCart = ( props:React.MutableRefObject<productType> ) => {
        const itemExist = cart.find(item => {
            return item.product_id === props.current.product_id && item.color === props.current.color && item.size === props.current.size
        })
        if(!itemExist) {
            let tempCart = JSON.parse(Cookie.get("cart") || '[]')
            tempCart.push(props.current)
            Cookie.set("cart", JSON.stringify(tempCart))
        } else {
            let tempCart = JSON.parse(Cookie.get("cart") || '[]')
            tempCart.map((el:productType, i:number) => {
                if(el.product_id === props.current.product_id && el.color === props.current.color && el.size === props.current.size) {
                    tempCart[i] = {
                        ...el,
                        color: props.current.color,
                        size: props.current.size,
                        quantity: (el.quantity+props.current.quantity > 2) ? el.quantity : el.quantity+props.current.quantity
                    }
                }
            })
            Cookie.set("cart", JSON.stringify(tempCart))
            router.reload()
        }
    }

    const HandleColorClick = (event: React.MouseEvent<HTMLDivElement>, key: number) => {
        let target = document.querySelectorAll('.colors')[key] as any as HTMLSpanElement 
        let spanColor = target.style.backgroundColor
        itemDetails.current = {
            ...itemDetails.current,
            color: spanColor
        }
        selectedParams.color.current = key
        Cookie.set('selectedParams', JSON.stringify({item_id: itemDetails.current.product_id, color: selectedParams.color.current, size: selectedParams.size.current}), {path: ''})
        deSelectColor()
        selectColor(key)
    }

    const HandleSizeClick = (event: React.MouseEvent<HTMLLIElement>, key: number) => {
        let target = event.currentTarget
        itemDetails.current = {
            ...itemDetails.current,
            size: target.innerHTML
        }
        selectedParams.size.current = key
        Cookie.set('selectedParams', JSON.stringify({item_id: itemDetails.current.product_id, color: selectedParams.color.current, size: selectedParams.size.current}), {path: ''})
        deSelectSize()
        if(target.style.backgroundColor === '') {
            target.style.transform = 'scale(1.1)'
            target.style.backgroundColor = '#32de84'
            target.style.color = '#e8e8e8'
        } else {
            target.style.transform = 'scale(1)'
            target.style.backgroundColor = ''
            target.style.color = ''
        }
    }

    const AddtoWishList = (event: React.MouseEvent<HTMLSpanElement>) => {
        let target = event.currentTarget
        if(target.style.color === 'rgb(55, 71, 79)') {
            target.style.color = '#FF69B4'
        } else {
            target.style.color = '#37474f'
        }
    }

    const SizeRen = (props: {size: string, index:number}) => {
        return (
            <li onClick={event => HandleSizeClick(event,props.index)} className='sizes'>
                {props.size}
            </li>
        )
    }
    
    const SizeGen = ({size} : {size:string}) => {
        let itemData = JSON.parse(Cookie.get('currentItem') || '{}')
        let sizes = [ 'S', 'M', 'L', 'XL', 'XXL' ]
        if(itemData.hasOwnProperty('size')) sizes = itemData.size.split(',')
        if(size.length > 0) sizes = size.split(',')
        return (
            <div className={`${styles.itemSizes}`}>
                <ul>
                    {sizes.map((el,i) => {
                        return <SizeRen key={i} size={el} index={i} />
                    })}
                </ul>
            </div>
        )
    }

    const QtyGen = ({qty} : {qty:number}) => {
        let options = new Array((Math.floor(qty/3))).fill(1)
        return (
            <div className={styles.itemQty}>
                <label htmlFor="qty">Quantity: </label>
                <select id="qty" name="qty" defaultValue={1} onClick={(event) => {
                    let target = event.currentTarget
                    itemDetails.current = {
                        ...itemDetails.current,
                        quantity: parseInt(target.value)
                    }
                }}>
                    {options.map((el,i) => {
                        return <option value={i+1} key={i}>{`${i+1}`}</option>
                    })}
                </select>
            </div>
        )
    }

    const Colorgen = (props: {color: string, index:number}) => {
        return (
            <div className={`${styles.colorCont} colorCont`} onClick={event => HandleColorClick(event,props.index)}>
                <span className={`${styles.Colors} colors`} style={{backgroundColor: `${(props.color === 'others') ? 'blue' : (props.color === 'white') ? '#e8e8e8' : props.color}`}} />
                <span className={`${styles.ColorHalo} colorHalo`} style={{border: `0.25rem solid ${(props.color === 'others') ? 'blue' : (props.color === 'white') ? '#e8e8e8' : props.color}`}} />
            </div>
        )
    }
    
    const ColorGen = () => {
        let colors = [ `${product_details.color ? product_details.color : '#4169e1'}`, '#ffd300', '#37474f', '#f8bbd0', '#32cd32' ]
        return (
            <div className={styles.itemSizes}>
                <ul>
                    {colors.map((el,i) => {
                        return <Colorgen key={i} index={i} color={el} />
                    })}
                </ul>
            </div>
        )
    }

    return(
        <div className={styles.itemWrapper}>
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
            <div className={styles.itemContent}>
                <ZoomIn img_src={`${img_src}`} />
                <section className={`${styles.itemDetails} itemDetails`}>
                    <div className={styles.itemName}>
                        {(product_details.description) ? product_details.description : 
                        `Lorem ipsum dolor sit amet\n
                        consectetur adipiscing elit.`}
                    </div>
                    <div className={styles.itemprice}>
                        Price : ₹ {(product_details.cost ? product_details.cost : (itemDetails.current.cost ? itemDetails.current.cost : 1200))} <br />
                        Inclusive of all taxes
                    </div>
                    <div className={styles.itemColors}>
                        <ColorGen />
                    </div>
                    <SizeGen size={(product_details.size) ? product_details.size : ''}/>
                    <QtyGen qty={(product_details.quantity) ? product_details.quantity : 5}/>

                    <button className={styles.addItem} id='addToCartBtn' onClick={(event) => {
                        let size = itemDetails.current.size
                        if(size !== 's' && size !== 'm' && size !== 'l' && size !== 'xl' && size !== 'xxl') {
                            setWarning({
                                flag: 1,
                                message: 'Select a Size'
                            })
                        } else {
                            setWarning({
                                flag: 0,
                                message: ''
                            })
                            event.currentTarget.textContent = "Added ✅"
                            setTimeout(() => {
                                const btn:HTMLButtonElement = document.querySelector('#addToCartBtn')
                                btn.textContent = "Add To Cart"
                                select()
                            }, 500)
                            updateCart(itemDetails)
                        }
                    }}>
                        <span />
                        Add To Cart
                    </button>
                    <div className={styles.addtoWish} onClick={AddtoWishList} style={{color: '#37474f'}}>
                        <span>&hearts;</span>
                        Add To Wishlist
                    </div>
                </section>
                <div className={styles.modal} style={{display: `${(warning.flag) ? 'flex' : 'none'}`}}>
                    <div>
                        <span className={styles.close} onClick={() => {
                            setWarning({
                                flag: 0,
                                message: ''
                            })
                        }}>&#10060;</span>
                        <span className={styles.error}/>
                        <h2 className={styles.text}>{warning.message}</h2>
                    </div>
                </div>  
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export async function getServerSideProps ({req} : {req:NextApiRequest}) {
    const cookies = parseCookies(req)
    
    return {
        props : {
            cookieCart: (cookies.cart) ? cookies.cart : `[]`,
            img_src: (cookies.currentItemSrc) ? cookies.currentItemSrc : '',
            item_details: (cookies.currentItem) ? cookies.currentItem : '{}'
        }
    }
}

export default Page