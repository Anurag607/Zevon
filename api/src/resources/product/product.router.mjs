import express from 'express'
import morgan from 'morgan'
import * as controller from './product.controller.mjs'

const router = express.Router()

router.use(morgan('dev'))
router.use((req,res,next) => {
    console.log('Product Router Working!')
    next()
})

router.post('/filtered', controller.getFilteredProduct)
router.get('/getAll', controller.getAllProducts)

export default router