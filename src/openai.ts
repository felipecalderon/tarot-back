import OpenAI from 'openai'
import { env } from './config/envs'

export const openai = new OpenAI({
    apiKey: env.gptKey,
})
