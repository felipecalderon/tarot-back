import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { payRoute } from './routes/pay'

const app = express()

// middlewares
app.use(
    cors({
        origin: '*',
    })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// routes
app.use('pay', payRoute)

export { app }
