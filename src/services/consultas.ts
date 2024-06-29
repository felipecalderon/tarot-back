import { prisma } from '../config/initPrisma'
import { Consulta } from '../config/interfaces'
import { findOrCreateCard } from './cartas'

export const createConsulta = async ({ question, born, cards, name, answer }: Omit<Consulta, 'id'>) => {
    try {
        const cartas = await findOrCreateCard({ cards })
        const idCartas = cartas.map((c) => c.id)
        const consulta = await prisma.consultas.create({
            data: {
                question: question,
                name: name.trim(),
                born: born,
                answer: answer,
                cards: idCartas,
            },
        })
        return {
            ...consulta,
            cards: cartas,
        } as Consulta
    } catch (error) {
        console.log(error)
    }
}

export const getAllConsultas = async (name?: string) => {
    try {
        const consultas = await prisma.consultas.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
            orderBy: {
                name: 'asc',
            },
        })

        const cards = await prisma.carta.findMany()

        const cardMap = new Map(cards.map((card) => [card.id, card]))
        // Mapear las consultas con las cartas correspondientes
        const consultasWithCards = consultas.map((consulta) => ({
            ...consulta,
            cards: consulta.cards.map((cardId) => cardMap.get(cardId)),
        }))

        return consultasWithCards
    } catch (error) {
        console.log(error)
        return []
    }
}
