import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { payRoute } from './routes/pay'
import { dbRoute } from './routes/consultas'

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
app.use('/pay', payRoute)
app.use('/consultas', dbRoute)

export { app }
