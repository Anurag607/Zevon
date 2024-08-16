import React from 'react'
import { cartType } from '../../src/utils/cartType'
import Cookie from 'js-cookie'

const UpdateCart = ( props:{itemDetails:React.MutableRefObject<cartType>, id: string|string[]} ) => {
    const [cart, setCart] = React.useState<cartType[]>(JSON.parse(Cookie.get('cart') || `[]`))
    
    const itemExist = cart.find(item => item.item_id === `${props.id}`)

    if(!itemExist) {
        setCart([props.itemDetails.current, ...cart])
    } else {
        setCart(currentCart => 
            currentCart.map((obj:cartType,i:number) => 
            (obj.item_id === `${props.id}`) ?
            { ...itemExist, item_id:`${props.id}`, color: props.itemDetails.current.color }
            : obj
            )
        )
    }
    Cookie.set('cart', JSON.stringify(cart))
}

export default UpdateCart