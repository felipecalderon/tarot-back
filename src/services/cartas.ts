import { prisma } from '../config/initPrisma'
import { Carta } from '../config/interfaces'
export const findManyCards = async () => {
    try {
        const cartas = await prisma.carta.findMany({
            orderBy: {
                img: 'asc',
            },
        })
        return cartas
    } catch (error) {
        console.log(error)
        return []
    }
}

export const findOrCreateCard = async ({ cards }: { cards: Carta[] }) => {
    const frontURL = 'https://lecturatarot.vercel.app/img/cartas'
    const cartas: Carta[] = []
    try {
        for (const card of cards) {
            const cardDB = await prisma.carta.upsert({
                where: { nombre: card.nombre },
                update: {},
                create: {
                    nombre: card.nombre,
                    name: card.name,
                    categoria: card.categoria,
                    category: card.category,
                    representa: card.representa,
                    img: `${frontURL}/${card.img}`,
                },
            })
            cartas.push(cardDB)
        }
        return cartas
    } catch (error) {
        console.log(error)
        return []
    }
}
