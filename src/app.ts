import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import { ioServer } from './io'
import { env } from './config'
import { payRoute } from './routes/pay'
const app = express()

app.use(
    cors({
        origin: '*',
    })
)

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: (origin, callback) => {
            const allowedOrigins = [
                'http://localhost:3000',
                'https://tarot-back-production.up.railway.app',
                'https://lecturatarot.vercel.app',
            ]
            if (!origin) return callback(null, true) // Permitir clientes sin origen
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Origen no permitido por CORS'))
            }
        },
        methods: ['GET', 'POST'],
    },
})

ioServer(io)

app.use('/pay', payRoute)

server.listen(env.port, () => {
    console.log('Server running on port ' + env.port)
})
