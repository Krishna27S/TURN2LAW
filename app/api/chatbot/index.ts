import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { message } = await req.json();

    let responseText = "I'm not sure how to respond.";
    if (message.includes("hello")) responseText = "Hello! How can I assist you?";

    return NextResponse.json({ reply: responseText });
}
