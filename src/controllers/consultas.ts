import { Request, Response } from 'express'
import { Consulta } from '../config/interfaces'
import { createConsulta, getAllConsultas } from '../services/consultas'
import { findManyCards } from '../services/cartas'

export const nuevaConsulta = async (req: Request<{}, {}, Partial<Consulta>, {}>, res: Response) => {
    const { answer, born, cards, name, question } = req.body
    if (!answer || !born || !cards || !name || !question) throw new Error('Argumentos faltantes')
    const q = await createConsulta({ answer, born, cards, name, question })
    console.log({ q })
    res.json({ ok: true })
}

export const buscarConsultas = async (
    req: Request<{}, {}, {}, { q?: string; page?: string; pageSize?: string }>,
    res: Response
) => {
    const { q, page, pageSize } = req.query
    const consultas = await getAllConsultas(q, Number(page ? page : 1), Number(pageSize ? pageSize : 10))
    res.json(consultas)
}

export const verCartas = async (req: Request, res: Response) => {
    const cartas = await findManyCards()
    res.json(cartas)
}
