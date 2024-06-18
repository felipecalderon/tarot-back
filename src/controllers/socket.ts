import { chat } from '../utils/chat'
import { Consulta } from '../config/interfaces'
import { getIo } from '../config/initWebsocket'
import { createConsulta } from '../services/consultas'

export const ioChat = async (data: Omit<Consulta, 'id' | 'answer'>) => {
    const { io } = getIo()
    try {
        console.log({ usuario: data.name, consulta: data.question })

        if (data) {
            const { content: answer } = await chat(data)
            if (answer) {
                io.emit('response', { content: answer })
                await createConsulta({
                    answer,
                    name: data.name,
                    born: data.born,
                    cards: data.cards,
                    question: data.question,
                })
            }
        }
    } catch (error) {
        console.log({ error })
        io.emit('error', 'Ha ocurrido un error')
    }
}
