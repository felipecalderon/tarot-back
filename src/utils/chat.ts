import { ReqProps } from '../config/interfaces'
import { openai } from '../config/initOpenai'
import { zodiaco } from './calcZodiaco'

export const chat = async ({ born, cards, name, question }: ReqProps) => {
    const signo = zodiaco(born)
    const chat = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'system',
                content:
                    'Eres un experimentado tarotista, autodenominado GPTarot, sabes interpretar a la perfección las cartas y sus significados según la pregunta que haga el usuario, no siempre la lectura tendrá un análisis positivo, recuerdalo.',
            },
            {
                role: 'system',
                content:
                    'Vas a guiar al usuario e interpretar las cartas que le salgan, relacionado a la pregunta que tenga y su personalidad según el horóscopo.',
            },
            {
                role: 'user',
                content: `Hola mi nombre es ${name} y soy ${signo.signo} (${signo.detalle}), mi consulta es: ${question}`,
            },
            {
                role: 'system',
                content: `$${name}, las cartas que te han salido hoy son: ${cards.map((cards, i) => {
                    return `${i + 1}: ${cards.nombre} (${cards.representa.map((r) => r + ' ')}).`
                })}`,
            },
            {
                role: 'system',
                content:
                    'Ahora te explicaré lo que representa cada carta basado en tu consulta y te daré un análisis final en español',
            },
        ],
    })
    const respuesta = chat.choices[0].message
    return respuesta
}
