import { Request, Response } from 'express'
import { pref } from '../utils/mercadopago'
import { Socket } from 'socket.io'

export const mercadoPago = async (req: Request, res: Response) => {
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
let payment = false
export const ioPayment = async (socket: Socket) => {
    if (payment) {
        socket.emit('payment', { payment: true })
    }
}
interface PayRequest {
    amount: number
    caller_id: number
    client_id: string
    created_at: string
    id: string
    payment: { id: string; state: string; type: string }
    state: string
}

export const mpHooks = async (req: Request, res: Response) => {
    console.log({
        data: req.body,
        headers: req.headers,
        params: req.params,
        queries: req.query,
    })
    const {} = req.body
    return res.json({ payment: 'recibido' })
}
