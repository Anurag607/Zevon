import supabase from '../../utils/db.mjs';

const getOrderByUserId = async (user_id) => {
  console.log(`SELECT * FROM past_order_details WHERE user_id = ${user_id};`);
  const { data, error } = await supabase
    .from('past_order_details')
    .select('*')
    .eq('user_id', user_id);

  if (error) throw error;
  return { data, error };
};

const insertOrders = async (data) => {
  const { user_id, payment_id, product_id, product_desc, order_date, price, qty, product_size, product_color, productImg } = data;

  console.log(`INSERT INTO past_order_details (user_id, payment_id, product_id, product_desc, order_date, price, qty, product_size, product_color, productImg) VALUES (${user_id}, ${payment_id}, '${product_id}', '${product_desc}', ${order_date}, ${price}, ${qty}, '${product_size}', '${product_color}', '${productImg}') RETURNING user_id;`);

  const { data: response, error } = await supabase
    .from('past_order_details')
    .insert([{ user_id, payment_id, product_id, product_desc, order_date, price, qty, product_size, product_color, productImg }])
    .select('user_id');

  if (error) throw error;
  return { response: response[0].user_id, error };
};

const getProductImg = async (product_ids) => {
  console.log(`SELECT img_url FROM product WHERE product_id IN (${product_ids});`);

  const { data, error } = await supabase
    .from('product')
    .select('img_url')
    .in('product_id', product_ids);

  if (error) throw error;
  return { data, error };
};

// import pool from '../../utils/db.mjs'

// const getOrderByUserId = async (user_id) => pool.query(`SELECT * FROM past_order_details WHERE user_id = ${user_id};`)

// const insertOrders = async (data) => {
//   const { user_id, payment_id, product_id, product_desc, order_date, price, qty, product_size, product_color, productImg } = data
//   const response = await pool.query(`
//     INSERT INTO past_order_details (user_id, payment_id, product_id, product_desc, order_date, price, qty, product_size, product_color, productImg) VALUES
//     (${user_id}, ${payment_id}, '${product_id}', '${product_desc}', ${order_date}, ${price}, ${qty}, '${product_size}', '${product_color}', '${productImg}') RETURNING user_id;
//   `)
//   return response.rows[0].user_id
// }

// const getProductImg = async (product_ids) => pool.query(`SELECT img_url FROM product WHERE product_id IN (${product_ids});`)

export {
  getOrderByUserId,
  insertOrders,
  getProductImg
}
