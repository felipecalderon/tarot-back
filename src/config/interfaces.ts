export type Carta = {
    id: string
    nombre: string
    name: string
    categoria: string
    category: string
    representa: string[]
    img: string
}

export type Consulta = {
    id: string
    question: string
    answer: string
    name: string
    born: string
    cards: Carta[]
}
