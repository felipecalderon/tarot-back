import { Socket } from 'socket.io'
import { chat } from '../utils/chat'

export const ioController = (socket: Socket) => {
    console.log('usuario conectado')

    socket.on('data', async (data) => {
        console.log({ usuario: data.name, consulta: data.question })

        if (data) {
            const response = await chat(data)
            socket.emit('response', response)
        }
    })

    socket.on('test', () => {
        socket.emit('response', 'conexión correcta')
    })

    socket.on('disconnect', () => {
        console.log('usuario desconectado')
    })
}
