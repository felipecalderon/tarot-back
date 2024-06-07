import { Server } from 'socket.io'
import { chat } from './chat'

export const ioServer = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('usuario conectado')

        socket.on('data', async (data) => {
            if (data) {
                const response = await chat(data)
                socket.emit('response', response)
            }
        })

        socket.on('disconnect', () => {
            console.log('usuario desconectado')
        })
    })
}
