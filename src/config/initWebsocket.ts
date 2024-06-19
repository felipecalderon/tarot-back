import { Server } from 'socket.io'
import { Server as HttpServer } from 'http'
import { ioChat } from '../controllers/socket'
import { Consulta } from './interfaces'
import { chat } from '../utils/chat'
import { createConsulta } from '../services/consultas'

let io: Server | undefined

export const initSocket = (server: HttpServer) => {
    io = new Server(server, {
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

    io.on('connection', (socket) => {
        console.log('usuario conectado')
        socket.on('data', async (data: Omit<Consulta, 'id' | 'answer'>) => {
            if (data) {
                const { content: answer } = await chat(data)
                if (answer) {
                    socket.emit('response', { content: answer })
                    await createConsulta({
                        answer,
                        name: data.name,
                        born: data.born,
                        cards: data.cards,
                        question: data.question,
                    })
                } else {
                    socket.emit('error', 'No se pudo consultar al oráculo 😟 contacte al administrador')
                }
            }
        })
        socket.on('pay', async () => socket.emit('response', 'hola'))
        socket.on('test', () => socket.emit('response', 'conexión correcta'))
        socket.on('disconnect', () => console.log('usuario desconectado'))
    })

    console.log('Servidor WebSocket funcionando')

    return io
}

export const getIo = () => {
    if (!io) {
        throw new Error('Socket.io no ha sido inicializado.')
    }
    return { io }
}
