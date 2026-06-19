import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// FIXED: Removed "runtime = edge" to allow build to pass with cacheComponents enabled
export async function POST(req: Request) {
  const { messages } = await req.json();
  const systemPrompt = "You are Ajay's AI Marketing Lab assistant. Give professional SEO, Ads, and Digital Marketing advice. Be structured, futuristic, and actionable.";

  try {
    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      messages,
    });
    return result.toDataStreamResponse();
  } catch (e) {
    const result = streamText({
      model: google('gemini-1.5-flash'),
      system: systemPrompt,
      messages,
    });
    return result.toDataStreamResponse();
  }
}