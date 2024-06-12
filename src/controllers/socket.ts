import { Socket } from 'socket.io'
import { chat } from '../utils/chat'
import { ReqProps } from '../config/interfaces'

const ioChat = async (data: ReqProps, socket: Socket) => {
    try {
        console.log({ usuario: data.name, consulta: data.question })

        if (data) {
            const response = await chat(data)
            socket.emit('response', response)
        }
    } catch (error) {
        console.log({ error })
        socket.emit('error', 'Ha ocurrido un error')
    }
}

export const ioController = (socket: Socket) => {
    console.log('usuario conectado')

    socket.on('data', async (data: ReqProps) => ioChat(data, socket))
    socket.on('test', () => socket.emit('response', 'conexión correcta'))
    socket.on('disconnect', () => console.log('usuario desconectado'))
}
