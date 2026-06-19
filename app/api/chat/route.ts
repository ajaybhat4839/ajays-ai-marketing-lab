import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: "You are a Neural Marketing assistant. Provide high-tech strategies.",
      messages,
    });
    
    // Casting to 'any' is essential for Vercel's current strict environment
    return (result as any).toDataStreamResponse();

  } catch (error) {
    const backup = streamText({
      model: google('gemini-1.5-flash'),
      messages: [{ role: 'user', content: 'Fallback initialized. Strategy offline.' }],
    });
    return (backup as any).toDataStreamResponse();
  }
}