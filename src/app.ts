import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { ioServer } from './io'
import { env } from './config'
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: (origin, callback) => {
            const allowedOrigins = ['http://localhost:3000', 'https://tarot-back-production.up.railway.app']
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

server.listen(env.port, () => {
    console.log('Server running on port ' + env.port)
})
