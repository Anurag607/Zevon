
import express from 'express'
import cors from 'cors'
import auth from './utils/auth.mjs'
import userRouter from './resources/user/user.router.mjs'
import productRouter from './resources/product/product.router.mjs'
import emailRouter from './resources/email/email.router.mjs'
import orderRouter from './resources/orders/order.router.mjs'
import * as dotenv from 'dotenv'
import envPath from '../env_path.mjs'

dotenv.config({path: envPath})

const app = express()
const HOST = process.env.HOST
const PORT = process.env.PORT

// app.disable('x-powered-by')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/hello', (_,res) => res.send("HELLO WORLD!"))
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/email', emailRouter)
app.use('/api/orders', orderRouter)

app.listen(PORT, () => {
    console.log(`Server running on ${HOST}:${PORT}`)
})