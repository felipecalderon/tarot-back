import { Server } from 'socket.io'
import { Server as HttpServer } from 'http'
import { ioController } from '../controllers/socket'

export const initSocket = (server: HttpServer) => {
    const ioServer = new Server(server, {
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

    ioServer.on('connection', ioController)
    console.log('Servidor WebSocket funcionando')
}
