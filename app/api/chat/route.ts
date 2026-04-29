import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('gemini-1.5-flash'),
    system: `You are the Kahory Media Concierge. Tone: Sharp, cinematic, and professional. 
    NEVER use emojis. Keep responses under 3 sentences. 
    Goal: Qualify leads for high-end video production. Min budget: ₹50,000. 
    If they are a good fit, ask for their email to book a call.`,
    messages,
  });

  return result.toDataStreamResponse();
}