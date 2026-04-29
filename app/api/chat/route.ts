import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // The 'await' is mandatory here so the server waits for the stream to open!
    const result = await streamText({
      model: google('gemini-1.5-flash'),
      system: `You are the Kahory Media Concierge, a highly professional, sleek, and authoritative AI representative for a premium content production agency.
      Tone: Sharp, cinematic, confident, and professional. NEVER use emojis. Keep responses concise (under 3 sentences).
      The minimum project budget is ₹50,000 INR. If a user seems like a qualified lead, ask for their email address to book a discovery call.`,
      messages,
    });

    return result.toDataStreamResponse();
    
  } catch (error) {
    // If it fails, log the exact error to Vercel so we can see it
    console.error("AI STREAM ERROR:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}