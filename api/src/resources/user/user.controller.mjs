import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
import * as service from './user.service.mjs'
import envPath from '../../../env_path.mjs'

dotenv.config({path: envPath})

const registerUser = async (req, res) => {
  try {
    const {name, password, phone_number, email, user_type} = req.body

    if(!name || !password || !email || !user_type) {
      return res.status(400).send({message: "Some inputs are missing"})
    }

    if(user_type != "customer" && user_type != "seller" && user_type != "delivery man") {
      return res.status(409).send({message: "Invalid user type"})
    }

    const [oldUser, ] = await service.getUserByEmail(email)

    if(oldUser.length != 0) {
      return res.status(409).send({message: "User already exists"})
    }

    req.body["password"] = await bcrypt.hash(password, 10)

    const newUserId = await service.createUser(req.body)

    const userToken = jwt.sign(
      {user_id: newUserId, email},
      process.env.USERID_KEY,

      {
        expiresIn: "2h"
      }
    )

    await service.updateToken(newUserId, userToken);

    const [newUser, ] = await service.getUserById(newUserId);

    if(user_type == "customer") {
      const newAddrId = await service.insertAddress(newUserId, null, null, null, null, null);
      const newCustId = await service.createCustomer(newUserId, newAddrId);
      let [user_addr, ] = await service.getAddressById(newUserId);
      let address = {...user_addr[0]}
      newUser[0]["address"] = address
    }
    else if(user_type == "delivery man") {
      const newAddrId = await service.insertAddress(newUserId, null, null, null, null, null);
      let [user_addr, ] = await service.getAddressById(newUserId);
      let address = {...user_addr[0]}
      newUser[0]["address"] = address
    }
    else if(user_type == "seller") {
      const newAddrId = await service.insertAddress(newUserId, null, null, null, null, null);
      let [user_addr, ] = await service.getAddressById(newUserId);
      let address = {...user_addr[0]}
      newUser[0]["address"] = address
    }
    else {
      return res.status(409).send({message: "Invalid user type"});
    }

    res.status(201).json(JSON.parse(JSON.stringify(newUser)));
  } catch(err) {
    console.error(err);
  }
}

const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body; 

    if(!(email && password)) {
      return res.status(400).send({message: "Email and password are required"});
    }

    let [user, ] = await service.getUserByEmail(email)

    if(user.length==0 || !(await bcrypt.compare(password, user[0].password))) {
      return res.status(400).send({message: "Invalid credentials"});
    }

    const token = jwt.sign(
      {user_id: user[0].id, email},
      process.env.USERID_KEY,
      {
        expiresIn: "2h"
      }
    );

    await service.updateToken(user[0].user_id, token); 

    let [user_addr, ] = await service.getAddressById(user[0].user_id);
    let address = {...user_addr[0]}
    user[0]["address"] = address

    user[0].token = token; 

    res.status(200).json(JSON.parse(JSON.stringify(user)));

  } catch(err) {
    console.error(err);
  }
}

const updateAddress = async (req, res) => {
  try {
    let {user_id, addr_1, addr_2, city, pincode, country} = req.body
    pincode = parseInt(pincode)
    await service.updateAddress(user_id, addr_1, addr_2, city, pincode, country)
    res.status(201).end()
  } catch(err) {
    console.error(err);
  }
}

const registerPaymentDetails = async (req, res) => {
  try {
    const {cust_id, payment_type, provider_name, total_amount, payment_status} = req.body
    let customer_id = cust_id
    let timestamp = Math.floor(Date.now() / 1000)
    const newPaymentId = await service.insertPaymentDetails(customer_id, timestamp, payment_type, provider_name, total_amount, payment_status)
    res.status(201).json({payment_id: newPaymentId})
  } catch(err) {
    console.error(err);
  }
}

const updateProfile = async (req, res) => {
  try {
    const {user_id, name, phone_number, email} = req.body
    await service.updateProfile(user_id, name, phone_number, email)
    res.status(201).end()
  } catch (err) {
    console.error(err)
  }
}

export {
  registerUser,
  loginUser,
  updateAddress,
  registerPaymentDetails,
  updateProfile
}
