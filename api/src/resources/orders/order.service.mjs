import pool from '../../utils/db.mjs'

const getOrderByUserId = async (user_id) => pool.query(`SELECT * FROM past_order_details WHERE user_id = ${user_id};`)

const insertOrders = async (data) => {
  const {user_id, payment_id, product_id, product_desc, order_date, price, qty, product_size, product_color, productImg} = data
  const [res, ] = await pool.query(`
    INSERT INTO past_order_details (user_id, payment_id, product_id, product_desc, order_date, price, qty, product_size, product_color, productImg) VALUES
    (${user_id}, ${payment_id}, "${product_id}", "${product_desc}", ${order_date}, ${price}, ${qty}, "${product_size}", "${product_color}", "${productImg}");
  `)
  return res.insertId
}

const getProductImg = async (product_ids) => pool.query(`SELECT img_url FROM product WHERE product_id IN (${product_ids});`)

export {
  getOrderByUserId,
  insertOrders,
  getProductImg
}
