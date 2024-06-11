import { Request, Response } from 'express'
import { pref } from '../mercadopago'

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
        },
    })
    return res.json(pago)
}

export const mpHooks = async (req: Request, res: Response) => {
    return res.json({ data: req.body })
}
