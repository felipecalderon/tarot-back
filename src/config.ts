import { config } from 'dotenv'
config()

export const env = {
    gptKey: process.env.GPT_KEY,
    port: process.env.PORT || 3001,
}
