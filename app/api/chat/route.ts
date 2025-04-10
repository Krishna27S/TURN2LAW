import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI client after checking for API key
let openai: OpenAI;

export async function POST(req: Request) {
  try {
    // Check for API key and initialize OpenAI client
    if (!process.env.OPENAI_API_KEY_1) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Initialize OpenAI client only when needed
    if (!openai) {
      openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY_1
      });
    }

    const { messages } = await req.json();

    if (!messages) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    const systemMessage = {
      role: 'system',
      content: 'You are a legal assistant for TURN2LAW, providing accurate information about Indian law.'
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500
    });

    return NextResponse.json(completion.choices[0].message);
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: "API quota exceeded. Please try again later." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "An error occurred during chat completion" },
      { status: 500 }
    );
  }
}