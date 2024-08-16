import express from 'express'
import morgan from 'morgan'
import * as controller from './order.controller.mjs'

const router = express.Router()
router.use(morgan('dev'))
router.use((req, res, next) => {
    console.log("Order Router Working!")
    next()
})

router.post('/getOrders', controller.getAllOrders)
router.post('/placeOrder', controller.placeOrder)
router.get('/getProductImgs', controller.getProductImages)

export default router
