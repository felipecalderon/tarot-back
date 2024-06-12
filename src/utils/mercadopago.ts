import { MercadoPagoConfig, Preference } from 'mercadopago'
import { env } from '../config/envs'

const mp = new MercadoPagoConfig({
    accessToken: env.mpSecret as string,
})

export const pref = new Preference(mp)
