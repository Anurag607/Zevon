import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
import * as service from './order.service.mjs'
import envPath from '../../../env_path.mjs'

dotenv.config({ path: envPath })

const getProductImages = async (req, res) => {
  try {
    let products = ''
    let productIds = JSON.parse(req.body.products)
    let productLen = productIds.length
    for (let i = 0; i < productLen; ++i) {
      if (i !== productLen - 1) products += `'${productIds[i]}',`
      else products += `'${productIds[i]}'`
    }

    let response = await service.getProducts(products)
    const productImgs = response.rows

    res.status(201).json(JSON.parse(JSON.stringify(productImgs)))
  } catch (err) {
    console.error(err);
  }
}

const getAllOrders = async (req, res) => {
  try {
    let response = await service.getOrderByUserId(parseInt(req.body.userId))
    const orders = response.rows

    res.status(201).json(JSON.parse(JSON.stringify(orders)))
  } catch (err) {
    console.error(err)
    res.status(400).json([{}])
  }
}

const placeOrder = async (req, res) => {
  try {
    let orderDate = Math.floor(Date.now() / 1000)
    let orders = req.body
    orders.product_ids.map((el, i) => {
      let data = {
        user_id: orders.user_id,
        payment_id: orders.payment_id,
        product_id: `${el}`,
        product_desc: orders.product_descs[i],
        order_date: orderDate,
        price: orders.prices[i],
        qty: orders.qtys[i],
        product_size: orders.product_sizes[i],
        product_color: orders.product_colors[i],
        productImg: orders.productImgs[i]
      }
      const orderId = service.insertOrders(data)
    })
    res.status(201).json({ message: "Success" })

  } catch (err) {
    console.error(err)
    res.status(400).json([{}])
  }
}

export {
  getProductImages,
  getAllOrders,
  placeOrder
}
