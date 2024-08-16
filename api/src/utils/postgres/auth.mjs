import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import envPath from '../../env_path.mjs'

dotenv.config({path: envPath})

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"]

  if(!token) {
    return res.status(403).send({message: "You are not authorized"})
  }

  try {
    const decoded = jwt.verify(token, process.env.USERID_KEY)
    req.user = decoded
  } catch(err) {
    return res.status(403).send({message: "You are not authorized"})
  }

  return next()
}

export default verifyToken
