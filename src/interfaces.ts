export type Carta = {
    nombre: string
    name: string
    categoria: string
    category: string
    representa: string[]
    img: string
}

export type ReqProps = {
    question: string
    name: string
    born: string
    cards: Carta[]
}
