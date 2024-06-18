import { Request, Router } from 'express'
import { Consulta } from '../config/interfaces'
import { createConsulta } from '../services/consultas'

const dbRoute = Router()

dbRoute.post('/', async (req: Request<{}, {}, Partial<Consulta>, {}>, res) => {
    try {
        const { answer, born, cards, name, question } = req.body
        if (!answer || !born || !cards || !name || !question) throw new Error('Argumentos faltantes')
        const q = await createConsulta({ answer, born, cards, name, question })
        console.log({ q })
        res.json({ ok: true })
    } catch (error) {
        res.json({ ok: false })
    }
})

export { dbRoute }
