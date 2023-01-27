import express from 'express'
import morgan from 'morgan'
import * as controller from './email.controller.mjs'

const router = express.Router()
router.use(morgan('dev'))
router.use((req, res, next) => {
    console.log("Email Router Wroking!")
    next()
})

router.post('/confirmation', controller.confirmation)
router.post('/subscription', controller.subscription)

export default router