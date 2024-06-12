import OpenAI from 'openai'
import { env } from './envs'

export const openai = new OpenAI({
    apiKey: env.gptKey,
})
