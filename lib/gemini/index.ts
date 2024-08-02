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
        title: z.string().describe('A brief description of the command'),
        command: z.string().describe('The actual terminal command')
      })
    )
  });

  const systemPrompt = `
  You are an AI assistant specialized in generating terminal commands for ${OS}.
  Based on the user's input, generate 2 to 4 relevant terminal commands.
  If the prompt is not related to terminal commands or terminal behavior, respond with an error.
  Avoid duplicate responses and additional comments.`;

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