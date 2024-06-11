import { Router } from 'express'
import { mercadoPago, mpHooks } from '../controllers/payment'

const payRoute = Router()

payRoute.get('/', mercadoPago)
payRoute.post('/', mpHooks)

export { payRoute }
