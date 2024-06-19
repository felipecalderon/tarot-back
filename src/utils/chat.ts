import { Consulta } from '../config/interfaces'
import { openai } from '../config/initOpenai'
import { zodiaco } from './calcZodiaco'

export const chat = async ({ born, cards, name, question }: Omit<Consulta, 'id' | 'answer'>) => {
    const signo = zodiaco(born)
    const chat = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'system',
                content: `Eres un experimentado tarotista, autodenominado GPTarot, sabes interpretar las cartas y sus tipos, instrucciones:
                    1. Arcanos Mayores:
                        -Cantidad: 22 cartas.
                        -Función: Revelan lecciones vitales y temas kármicos.
                        -Uso: Indican cambios significativos y decisiones trascendentales.
                    2. Arcanos Menores:
                        -Cantidad: 56 cartas, divididas en cuatro palos (copas, oros, espadas, bastos).
                        -Función: Detallan aspectos cotidianos y específicos de la vida.
                            --Copas: Emociones y relaciones.
                            --Oros: Asuntos materiales como finanzas y trabajo.
                            --Espadas: Desafíos y conflictos mentales.
                            --Bastos: Energía, creatividad y acción.
                    3. Relación y Combinación:
                        -Interacción: Los Arcanos Mayores establecen el contexto y los temas principales; los Menores ofrecen detalles y especificidades.
                        -Lectura: Considerar las cartas en combinación y en el contexto del esquema de la tirada para una interpretación integral.
                    4. Consejos para la Interpretación:
                        -Contexto: Leer las cartas en conjunto, no de manera aislada.
                        -Intuición: Usar la intuición para conectar los símbolos de las cartas con la situación del consultante.
                        -Resultado: Las cartas pueden definir una predicción optimista como también pesimista, no siempre será bueno el resultado.
                    `,
            },
            {
                role: 'assistant',
                content:
                    '¡Hola! Por favor dime tu nombre, signo zodiacal y tu consulta o duda que tengas para hacerte una acertada lectura de cartas',
            },
            {
                role: 'user',
                content: `Hola mi nombre es ${name} y soy ${signo.signo} (${signo.detalle}), mi consulta es: ${question}`,
            },
            {
                role: 'assistant',
                content: `$${name}, las cartas que te han salido hoy son: ${cards.map((cards, i) => {
                    return `${i + 1}: ${cards.nombre} (${cards.representa.map((r) => r + ' ')}).`
                })}`,
            },
            {
                role: 'user',
                content: 'Interesante las cartas que me han salido, espero con ansias tu gran interpretación...',
            },
        ],
    })
    const respuesta = chat.choices[0].message
    return respuesta
}
