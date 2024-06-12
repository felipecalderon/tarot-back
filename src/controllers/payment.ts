import type { Request, Response } from 'express'
import { pref } from '../utils/mercadopago'
import { getIo } from '../config/initWebsocket'

export const mercadoPago = async (req: Request, res: Response) => {
    const { io } = getIo()
    io.emit('response', 'holaaa')
    const pago = await pref.create({
        body: {
            items: [
                {
                    id: 'demo123',
                    title: 'PagoDemo',
                    quantity: 1,
                    unit_price: 1000,
                },
            ],
            redirect_urls: {
                success: 'https://localhost:3001/pay?payment="12312312"',
                failure: 'https://localhost:3001/pay?fail=true',
                pending: 'https://localhost:3001/pay?pending=true',
            },
        },
    })
    return res.json(pago)
}

interface PayRequest {
    action: string
    api_version: string
    data: { id: string }
    date_created: Date
    id: string
    live_mode: boolean
    type: string
    user_id: number
}

export const mpHooks = async (req: Request<{}, {}, PayRequest, {}>, res: Response) => {
    console.log({
        data: req.body,
        headers: req.headers,
        params: req.params,
        queries: req.query,
    })
    const {} = req.body
    return res.json({ payment: 'recibido' })
}
