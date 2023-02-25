import pg from 'pg'
import * as dotenv from 'dotenv'
import envPath from '../../env_path.mjs'

dotenv.config({ path: envPath })

const pool = new pg.Pool({
  user: process.env.DB_pg_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
})

export default pool