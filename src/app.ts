import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { ioServer } from './io'
import { env } from './config'
const app = express()
const server = http.createServer(app)
const io = new Server(server)

ioServer(io)

server.listen(env.port, () => {
    console.log('Server running on port ' + env.port)
})
