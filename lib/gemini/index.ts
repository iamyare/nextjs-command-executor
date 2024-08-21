'use server';

import { streamObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createStreamableValue } from 'ai/rsc';
import { z } from 'zod';

const fallbackCommands = [
  {
    title: "Fallback Command 1",
    command: "echo 'This is a fallback command'",
    description: "This is a fallback command due to an API error."
  },
  {
    title: "Fallback Command 2",
    command: "printf 'Another fallback command'",
    description: "This is another fallback command due to an API error."
  }
];

export async function generateCommands({
  prompt,
  OS = 'MacOs',
  apiKey,
}: {
  prompt: string;
  OS?: string;
  apiKey: string;
}) {
  const google = createGoogleGenerativeAI({
    apiKey: apiKey ?? ''
  });
  const stream = createStreamableValue();

  const schema = z.object({
    commands: z.array(
      z.object({
        title: z.string().describe('Título conciso que describe la acción de automatización'),
        command: z.string().describe('Comando completo para ejecutar la automatización'),
        description: z.string().describe('Explicación breve de lo que hace el comando y su utilidad en automatizaciones')
      })
    )
  });
  
  const systemPrompt = `
Experto en automatización para ${OS}. Genera 2-4 comandos de terminal optimizados para automatizaciones.
Requisitos:
1. Comandos ejecutables sin interacción del usuario.
2. Usa herramientas nativas de ${OS}.
`;

  const promptUser = `${prompt} para automatizar en ${OS}`;

  (async () => {
    try {
      const { partialObjectStream } = await streamObject({
        model: google('models/gemini-1.5-pro-latest'),
        system: systemPrompt,
        prompt: promptUser,
        schema: schema,
      });

      for await (const partialObject of partialObjectStream) {
        stream.update(partialObject);
      }

      stream.done();
    } catch (error) {
      console.error('Error generating commands:', error);
      // En caso de error, usamos los comandos de fallback
      stream.update({ commands: fallbackCommands });
      stream.done();
    }
  })();

  return { object: stream.value };
}