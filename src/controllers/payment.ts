import { Request, Response } from 'express'
import { pref } from '../utils/mercadopago'

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

export const mpHooks = async (req: Request, res: Response) => {
    console.log({
        data: req.body,
        headers: req.headers,
        params: req.params,
        queries: req.query,
    })
    return res.json({ data: req.body })
}
