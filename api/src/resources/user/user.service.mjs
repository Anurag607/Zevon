import pool from '../../utils/db.mjs'

const getUserByEmail = async (email) => pool.query(`SELECT * FROM user WHERE email = '${email}';`)

const getUserById = async (user_id) => pool.query(`SELECT * FROM user WHERE user_id = ${user_id};`)

const getCustomerById = async (cust_id) => pool.query(`SELECT * FROM customer WHERE cust_id = ${cust_id};`)

const getSellerById = async (seller_id) => pool.query(`SELECT * FROM seller WHERE seller_id = ${seller_id};`)

const getAddressById = async (user_id) => pool.query(`SELECT * FROM user_address WHERE user_id = ${user_id};`)

const createCustomer = async (user_id, addr_id) => {
  const [res, ] = await pool.query(`INSERT INTO customer (cust_id, addr_id) VALUES (${user_id}, ${addr_id});`)
  return res.insertId
}

const createUser = async (data) => {
  const {name, password, phone_number, email, user_type} = data;
  const [res, ] = await pool.query(`
    INSERT INTO user (name, email, password, phone_number, user_type)
    VALUES ("${name}", "${email}", "${password}", "${phone_number}", "${user_type}");
  `)
  return res.insertId
}

const insertAddress = async (newUserId, addr_1, addr_2, city, pincode, country) => {
  const [res, ] = await pool.query(`
    INSERT INTO user_address (user_id, address_line1, address_line2, city, pincode, country) VALUES
    (${newUserId}, ${addr_1 ? `"${addr_1}"` : null}, ${addr_2 ? `"${addr_2}"` : null}, ${city ? `"${city}"` : null}, ${pincode ? `"${pincode}"` : null}, ${country ? `"${country}"` : null});
  `)
  return res.insertId
}

const updateAddress = async (user_id, addr_1, addr_2, city, pincode, country) => {
  const [res, ] = await pool.query(`
    UPDATE user_address SET address_line1 = '${addr_1}', address_line2 = '${addr_2}', city = '${city}', pincode = ${pincode}, country = '${country}' WHERE user_id = ${user_id};
  `)
  return res.insertId
}

const insertPaymentDetails = async (customer_id, timestamp, payment_type, provider_name, total_amount, payment_status) => {
  const [res, ] = await pool.query(`
    INSERT INTO payment (customer_id, payment_date, payment_type, provider_name, total_amount, payment_status) VALUES
    (${customer_id}, ${timestamp}, "${payment_type}", "${provider_name}", ${total_amount}, "${payment_status}")
  `)
  return res.insertId
}

const updateToken = (userId, token) => pool.query(` UPDATE user SET token = "${token}" WHERE user_id = ${userId}`)

export {
  getUserByEmail,
  getUserById,
  createUser,
  updateToken,
  createCustomer,
  getCustomerById,
  getSellerById,
  insertAddress,
  getAddressById,
  insertPaymentDetails,
  updateAddress
}
