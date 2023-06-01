import mysql from 'mysql2/promise'
import pg from 'pg'
import * as dotenv from 'dotenv'
import envPath from '../../env_path.mjs'

dotenv.config({ path: envPath })

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   multipleStatements: true
// })

const pool = new pg.Pool({
  user: process.env.DB_pg_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  },
})

const client = new pg.Client({ connectionString: process.env.EXTERNAL_DATABASE_URL })

client.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL');
    // Perform any database operations here
  }
});

client.on('end', () => {
  console.log('Disconnected from PostgreSQL');
});
export default pool