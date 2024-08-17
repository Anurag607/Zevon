import supabase from '../../utils/db.mjs';

const getUserByEmail = async (email) => {
  console.log(`SELECT * FROM "user" WHERE email = '${email}';`);
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('email', email);

  if (error) throw error;
  return data;
};

const getUserById = async (user_id) => {
  console.log(`SELECT * FROM "user" WHERE user_id = ${user_id};`);
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('user_id', user_id);

  if (error) throw error;
  return data;
};

const getCustomerById = async (cust_id) => {
  console.log(`SELECT * FROM customer WHERE cust_id = ${cust_id};`);
  const { data, error } = await supabase
    .from('customer')
    .select('*')
    .eq('cust_id', cust_id);

  if (error) throw error;
  return data;
};

const getSellerById = async (seller_id) => {
  console.log(`SELECT * FROM seller WHERE seller_id = ${seller_id};`);
  const { data, error } = await supabase
    .from('seller')
    .select('*')
    .eq('seller_id', seller_id);

  if (error) throw error;
  return data;
};

const getAddressById = async (user_id) => {
  console.log(`SELECT * FROM user_address WHERE user_id = ${user_id};`);
  const { data, error } = await supabase
    .from('user_address')
    .select('*')
    .eq('user_id', user_id);

  if (error) throw error;
  return data;
};

const createCustomer = async (user_id, addr_id) => {
  const { data, error } = await supabase
    .from('customer')
    .insert([{ cust_id: user_id, addr_id }])
    .select('cust_id');

  if (error) throw error;
  return data[0].cust_id;
};

const createUser = async (data) => {
  const { name, password, phone_number, email, user_type } = data;
  const { data: response, error } = await supabase
    .from('user')
    .insert([{ name, email, password, phone_number, user_type }])
    .select('user_id');

  if (error) throw error;
  return response[0].user_id;
};

const insertAddress = async (newUserId, addr_1, addr_2, city, pincode, country) => {
  const { data, error } = await supabase
    .from('user_address')
    .insert([{ user_id: newUserId, address_line1: addr_1, address_line2: addr_2, city, pincode, country }])
    .select('user_id');

  if (error) throw error;
  return data[0].user_id;
};

const updateAddress = async (user_id, addr_1, addr_2, city, pincode, country) => {
  const { data, error } = await supabase
    .from('user_address')
    .update({ address_line1: addr_1, address_line2: addr_2, city, pincode, country })
    .eq('user_id', user_id)
    .select('user_id');

  if (error) throw error;
  return data[0].user_id;
};

const insertPaymentDetails = async (customer_id, timestamp, payment_type, provider_name, total_amount, payment_status) => {
  const { data, error } = await supabase
    .from('payment')
    .insert([{ customer_id, payment_date: timestamp, payment_type, provider_name, total_amount, payment_status }])
    .select('payment_id');

  if (error) throw error;
  return data[0].payment_id;
};

const updateProfile = async (user_id, name, phone_number, email) => {
  const { data, error } = await supabase
    .from('user')
    .update({ name, phone_number, email })
    .eq('user_id', user_id)
    .select('user_id');

  if (error) throw error;
  return data[0].user_id;
};

const updateToken = async (user_id, token) => {
  const { error } = await supabase
    .from('user')
    .update({ token })
    .eq('user_id', user_id);

  if (error) throw error;
};

// import pool from '../../utils/db.mjs'

// const getUserByEmail = async (email) => pool.query(`SELECT * FROM "user" WHERE email = '${email}';`)

// const getUserById = async (user_id) => pool.query(`SELECT * FROM "user" WHERE user_id = ${user_id};`)

// const getCustomerById = async (cust_id) => pool.query(`SELECT * FROM customer WHERE cust_id = ${cust_id};`)

// const getSellerById = async (seller_id) => pool.query(`SELECT * FROM seller WHERE seller_id = ${seller_id};`)

// const getAddressById = async (user_id) => {
//   console.log(`SELECT * FROM user_address WHERE user_id = ${user_id};`)
//   return pool.query(`SELECT * FROM user_address WHERE user_id = ${user_id};`)
// }

// const createCustomer = async (user_id, addr_id) => {
//   const response = await pool.query(`INSERT INTO customer (cust_id, addr_id) VALUES (${user_id}, ${addr_id}) RETURNING cust_id;`)
//   return response.rows[0].cust_id
// }

// const createUser = async (data) => {
//   const { name, password, phone_number, email, user_type } = data;
//   const response = await pool.query(`
//     INSERT INTO "user" (name, email, password, phone_number, user_type)
//     VALUES ('${name}', '${email}', '${password}', '${phone_number}', '${user_type}') RETURNING user_id;
//   `)
//   return response.rows[0].user_id
// }

// const insertAddress = async (newUserId, addr_1, addr_2, city, pincode, country) => {
//   const response = await pool.query(`
//     INSERT INTO user_address (user_id, address_line1, address_line2, city, pincode, country) VALUES
//     (${newUserId}, ${addr_1 ? `'${addr_1}'` : null}, ${addr_2 ? `'${addr_2}'` : null}, ${city ? `'${city}'` : null}, ${pincode ? `'${pincode}'` : null}, ${country ? `'${country}'` : null}) RETURNING user_id;
//   `)
//   return response.rows[0].user_id
// }

// const updateAddress = async (user_id, addr_1, addr_2, city, pincode, country) => {
//   const response = await pool.query(`
//     UPDATE user_address SET address_line1 = '${addr_1}', address_line2 = '${addr_2}', city = '${city}', pincode = ${pincode}, country = '${country}' WHERE user_id = ${user_id} RETURNING user_id;
//   `)
//   return response.rows[0].user_id
// }

// const insertPaymentDetails = async (customer_id, timestamp, payment_type, provider_name, total_amount, payment_status) => {
//   const response = await pool.query(`
//     INSERT INTO payment (customer_id, payment_date, payment_type, provider_name, total_amount, payment_status) VALUES
//     (${customer_id}, ${timestamp}, '${payment_type}', '${provider_name}', ${total_amount}, '${payment_status}') RETURNING payment_id;
//   `)
//   return response.rows[0].payment_id
// }

// const updateProfile = async (user_id, name, phone_number, email) => {
//   const response = await pool.query(`UPDATE "user" SET name = '${name}', phone_number = '${phone_number}', email = '${email}' WHERE user_id = ${user_id} RETURNING user_id;`)
//   return response.rows[0].user_id
// }

// const updateToken = (userId, token) => pool.query(`UPDATE "user" SET token = '${token}' WHERE user_id = ${userId}`)

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
  updateAddress,
  updateProfile
}
