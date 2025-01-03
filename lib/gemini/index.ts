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
  })

  const schema = z.object({
    commands: z.array(
      z.object({
        title: z
          .string()
          .describe('Título descriptivo del comando de automatización'),
        command: z
          .string()
          .describe('Comando completo para ejecutar remotamente'),
        description: z
          .string()
          .describe('Descripción detallada del propósito y funcionamiento del comando'),
      })
    )
  })

  const systemPrompt = `
Eres un experto en automatización de sistemas y administración remota para ${OS}. 
Tu objetivo es generar comandos de terminal optimizados para automatizaciones remotas.

Requisitos específicos:
1. Genera comandos que sean seguros para ejecutar remotamente
2. Los comandos deben ser idempotentes cuando sea posible
3. Utiliza herramientas nativas de ${OS} y evita dependencias externas
4. Implementa verificaciones de seguridad básicas en los comandos
5. Combina comandos relacionados usando operadores (&&, ||, ;) para optimizar la ejecución
6. Incluye validaciones de error y manejo de casos extremos
7. Prioriza comandos que:
   - Sean no interactivos
   - Tengan salidas consistentes
   - Sean seguros para sistemas remotos
   - Puedan ser monitoreados fácilmente

Formato de salida:
- Título: Breve pero descriptivo
- Comando: Sintaxis precisa y verificada
- Descripción: Explicación clara del propósito y funcionamiento
`

  const promptUser = `${prompt} para el sistema operativo ${OS}`

  try {
    const { object: commandIA } = await generateObject({
      model: google('models/gemini-1.5-flash-8b'),
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
