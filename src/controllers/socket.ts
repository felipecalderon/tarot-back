import { chat } from '../utils/chat'
import { ReqProps } from '../config/interfaces'
import { getIo } from '../config/initWebsocket'

export const ioChat = async (data: ReqProps) => {
    const { io } = getIo()
    try {
        console.log({ usuario: data.name, consulta: data.question })

        if (data) {
            const response = await chat(data)
            io.emit('response', response)
        }
    } catch (error) {
        console.log({ error })
        io.emit('error', 'Ha ocurrido un error')
    }
}
