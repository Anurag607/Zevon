import mysql from 'mysql2/promise'
import * as dotenv from 'dotenv'
import envPath from '../../env_path.mjs'

dotenv.config({path: envPath})

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

export default pool