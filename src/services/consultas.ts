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

export const getAllConsultas = async (name: string) => {
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

        const cardIds = consultas.flatMap((consulta) => consulta.cards)

        const cards = await prisma.carta.findMany({
            where: {
                id: {
                    in: cardIds,
                },
            },
        })

        const consultasWithCards = consultas.map((consulta) => ({
            ...consulta,
            cards: consulta.cards.map((cardId) => cards.find((card) => card.id === cardId)),
        }))
        return consultasWithCards
    } catch (error) {
        console.log(error)
        return []
    }
}
