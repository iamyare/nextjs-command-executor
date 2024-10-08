'use server'

import { generateObject } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { z } from 'zod'

const fallbackCommands = {
  commands: [
    {
      title: 'Fallback Command 1',
      command: "echo 'This is a fallback command'",
      description: 'This is a fallback command due to an API error.'
    },
    {
      title: 'Fallback Command 2',
      command: "printf 'Another fallback command'",
      description: 'This is another fallback command due to an API error.'
    }
  ]
}
export async function generateCommands({
  prompt,
  OS = 'MacOs',
  apiKey
}: {
  prompt: string
  OS?: string
  apiKey: string
}) {
  const google = createGoogleGenerativeAI({
    apiKey: apiKey ?? '',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const schema = z.object({
    commands: z.array(
      z.object({
        title: z
          .string()
          .describe('Título conciso que describe la acción de automatización'),
        command: z
          .string()
          .describe('Comando completo para ejecutar la automatización'),
        description: z
          .string()
          .describe(
            'Explicación breve de lo que hace el comando y su utilidad en automatizaciones'
          )
      })
    )
  })

  const systemPrompt = `
    Eres un experto en automatización para ${OS}. Tu tarea es generar entre 2 y 4 comandos de terminal optimizados para automatizaciones. 
    Requisitos:
    1. Los comandos deben ser ejecutables sin necesidad de interacción del usuario.
    2. Utiliza únicamente herramientas nativas de ${OS}.
    3. Algunos comandos deben combinarse en una sola línea utilizando operadores como && o ;. Por ejemplo: open https://www.netflix.com/ && osascript -e "set volume output volume 50".
    4. Asegúrate de que los comandos sean eficientes y claros.
    `

  const promptUser = `${prompt} para automatizar en ${OS}`

  try {
    const { object: commandIA } = await generateObject({
      model: google('models/gemini-1.5-flash'),
      system: systemPrompt,
      prompt: promptUser,
      schema: schema,
    })

    return { commandIA }
  } catch (error) {
    console.log('Error generating commands:', error)
    // En caso de error, usamos los comandos de fallback
    return { commandIA: fallbackCommands }
  }
}
