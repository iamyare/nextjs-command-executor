'use server';

import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createStreamableValue } from 'ai/rsc';
import { z } from 'zod';
import { streamObject } from 'ai';

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
  Eres un experto en automatización de tareas y scripting para el sistema operativo: ${OS}, especializado en generar comandos eficientes para procesos automatizados.

  Tarea:
  - Analiza la solicitud del usuario desde la perspectiva de la automatización.
  - Genera entre 2 y 4 comandos de terminal altamente relevantes y optimizados para automatizaciones.
  - Cada comando debe ser ejecutable directamente sin interacción del usuario.

  Requisitos:
  1. Prioriza comandos que puedan ser utilizados en scripts o tareas programadas.
  2. Utiliza herramientas y utilidades nativas del sistema operativo: ${OS} siempre que sea posible.

  Formato de respuesta:
  - Título: Breve descripción de la acción de automatización.
  - Comando: El comando completo y ejecutable, incluyendo todas las opciones necesarias.
  - Descripción: Explicación concisa de lo que hace el comando y cómo contribuye a la automatización.

  Si la solicitud no es aplicable para automatizaciones en ${OS}, responde con un mensaje de error apropiado.`;

  const promptUser = `${prompt} para automatizar en ${OS}`;

  try {
    const { partialObjectStream } = await streamObject({
      model: google('models/gemini-1.5-flash-latest'),
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
    stream.done();
  }

  return { object: stream.value };
}
