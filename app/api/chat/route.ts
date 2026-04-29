import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// 1. THIS IS THE MAGIC LINE: It forces Next.js to leave the streaming pipe open
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 2. We also removed the word 'await' before streamText, which can confuse the newest SDK
  const result = streamText({
    model: google('gemini-1.5-flash'),
    system: `You are the Kahory Media Concierge, a highly professional, sleek, and authoritative AI representative for a premium content production agency.
    Tone: Sharp, cinematic, confident, and professional. NEVER use emojis. Keep responses concise (under 3 sentences).
    The minimum project budget is ₹50,000 INR. If a user seems like a qualified lead, ask for their email address to book a discovery call.`,
    messages,
  });

  return result.toDataStreamResponse();
}