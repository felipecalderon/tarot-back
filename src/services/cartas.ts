import { prisma } from '../config/initPrisma'
import { Carta } from '../config/interfaces'

export const findOrCreateCard = async ({ cards }: { cards: Carta[] }) => {
    const frontURL = 'https://lecturatarot.vercel.app/img/cartas'
    const cartas: Carta[] = []
    try {
        // Primero crea las cartas si no existen
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
        console.log(cartas)
        return cartas
    } catch (error) {
        console.log(error)
        return []
    }
}
