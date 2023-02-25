import express from 'express'
import morgan from 'morgan'
import * as controller from './user.controller.mjs'

const router = express.Router()
router.use(morgan('dev'))
router.use((req, res, next) => {
    console.log("User Router Wroking!")
    next()
})

router.post('/register', controller.registerUser)
router.post('/login', controller.loginUser)
router.post('/address', controller.updateAddress)
router.post('/payment', controller.registerPaymentDetails)
router.post('/updateProfile', controller.updateProfile)

export default router
