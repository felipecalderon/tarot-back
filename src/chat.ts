import { ReqProps } from './interfaces'
import { openai } from './openai'

export const chat = async ({ born, cards, name, question }: ReqProps) => {
    const chat = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [
            {
                role: 'system',
                content:
                    'Eres un experimentado tarotista, autodenominado GPTarot, sabes interpretar a la perfección las cartas y sus significados según la pregunta que haga el usuario, no siempre la lectura tendrá un análisis positivo, recuerdalo.',
            },
            {
                role: 'system',
                content:
                    'Vas a guiar al usuario e interpretar las cartas que le salgan, todo en base a la pregunta que tenga.',
            },
            {
                role: 'user',
                content: `Hola mi nombre es ${name} nacido el ${born} (dd/mm/yyyy), mi consulta es: ${question}`,
            },
            {
                role: 'system',
                content: `$${name}, las cartas que te han salido son: ${cards.map((cards, i) => {
                    return `${i + 1}: ${cards.nombre} (${cards.representa.map((r) => r + ' ')}).`
                })}`,
            },
            {
                role: 'system',
                content:
                    'Ahora te explicaré lo que significa cada carta en base a tu consulta y te daré un análisis final',
            },
        ],
    })
    const respuesta = chat.choices[0].message
    return respuesta
}
