import { Router } from 'express'
import { buscarConsultas, nuevaConsulta, verCartas } from '../controllers/consultas'

const dbRoute = Router()

dbRoute.get('/cartas', verCartas) //ver cartas
dbRoute.get('/', buscarConsultas)
dbRoute.post('/', nuevaConsulta)
export { dbRoute }
