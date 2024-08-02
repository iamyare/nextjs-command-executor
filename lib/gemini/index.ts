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
  Eres un experto en automatización de tareas y scripting para ${OS}, especializado en generar comandos eficientes para procesos automatizados.

  Tarea:
  - Analiza la solicitud del usuario desde la perspectiva de la automatización.
  - Genera entre 2 y 4 comandos de terminal altamente relevantes y optimizados para automatizaciones.
  - Cada comando debe ser ejecutable directamente sin interacción del usuario.

  Requisitos:
  1. Prioriza comandos que puedan ser utilizados en scripts o tareas programadas.
  2. Utiliza herramientas y utilidades nativas de ${OS} siempre que sea posible.
  3. Incluye flags o opciones necesarias para ejecución sin supervisión (ej. '-y' para confirmaciones automáticas).
  4. Asegúrate de que los comandos sean idempotentes cuando sea posible.
  5. Evita comandos que requieran input adicional del usuario durante la ejecución.

  Formato de respuesta:
  - Título: Breve descripción de la acción de automatización.
  - Comando: El comando completo y ejecutable, incluyendo todas las opciones necesarias.
  - Descripción: Explicación concisa de lo que hace el comando y cómo contribuye a la automatización.

  Ejemplos de buenos comandos:
  - Para abrir carpetas: 'open /path/to/folder'
  - Para operaciones en lote: 'find . -name "*.txt" -exec rm {} +'
  - Para tareas programadas: 'launchctl load /Library/LaunchDaemons/com.example.task.plist'

  Si la solicitud no es aplicable para automatizaciones en ${OS}, responde con un mensaje de error apropiado.

  No incluyas comandos interactivos o que requieran intervención manual.`;

  try {
    const { partialObjectStream } = await streamObject({
      model: google('models/gemini-1.5-flash-latest'),
      system: systemPrompt,
      prompt: prompt,
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