import { config } from 'dotenv'
config()

export const env = {
    gptKey: process.env.GPT_KEY,
    port: process.env.PORT || 3001,
    mpPublic: process.env.MP_PUBLIC,
    mpSecret: process.env.MP_SECRET,
}
