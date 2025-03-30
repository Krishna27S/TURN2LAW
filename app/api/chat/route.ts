import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Add error checking for API key
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API Key');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a legal assistant for TURN2LAW, an Indian legal services platform. 
                   Provide accurate and clear information about Indian law and legal procedures.
                   Always include appropriate disclaimers and recommend consulting with a qualified 
                   attorney for specific legal advice. Focus on Indian legal context and regulations.`,
        },
        ...messages,
      ],
    });

    return NextResponse.json(completion.choices[0].message);
  } catch (error: any) {
    console.error('OpenAI API error:', error);

    // Better error handling with specific messages
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'API quota exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred during chat completion' },
      { status: 500 }
    );
  }
}