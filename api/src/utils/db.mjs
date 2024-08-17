// import mysql from 'mysql2/promise'
// import pg from 'pg'
import * as dotenv from 'dotenv'
import envPath from '../../env_path.mjs'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: envPath })
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);


// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   multipleStatements: true
// })

// const pool = new pg.Pool({
//   user: process.env.DB_pg_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// })

// const client = new pg.Client({ connectionString: process.env.EXTERNAL_DATABASE_URL })

// client.connect((err) => {
//   if (err) {
//     console.error('Error connecting to PostgreSQL:', err);
//   } else {
//     console.log('Connected to PostgreSQL');
//   }
// });

// client.on('end', () => {
//   console.log('Disconnected from PostgreSQL');
// });

// export default pool
export default supabase