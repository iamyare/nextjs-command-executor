

'use server'

import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { streamObject } from 'ai'
import { z } from 'zod'

const schema = z.object({
  commands: z.array(
    z.object({
      title: z.string().describe('A brief description of the command'),
      command: z.string().describe('The actual terminal command')
    })
  )
})

export async function generateCommands(prompt: string, OS: string, apiKey: string) {
  const google = createGoogleGenerativeAI({
    apiKey: apiKey ?? ''
  })

  const systemPrompt = `
    You are an AI assistant specialized in generating terminal commands for ${OS}.
    Based on the user's input, generate 1 to 3 relevant terminal commands.
    If the prompt is not related to terminal commands or terminal behavior, respond with an error.
    Avoid duplicate responses and additional comments.
  `

  const { partialObjectStream } = await streamObject({
    model: google('models/gemini-1.5-flash-latest'),
    system: systemPrompt,
    prompt: prompt,
    schema: schema,
  })

  return partialObjectStream
}