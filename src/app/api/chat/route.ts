import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Message, streamText } from "ai";

import { initialMessages } from "@/lib/data";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

const generateId = () => Math.random().toString(36).slice(2, 15);

const buildGoogleGenAIPrompt = (messages: Message[]): Message[] => [
  {
    id: generateId(),
    content: initialMessages.content,
    role: "user",
  },
  ...messages.map((message) => ({
    id: message.id || generateId(),
    content: message.content,
    role: message.role,
  })),
];

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const stream = await streamText({
      model: google("gemini-1.5-flash"),
      messages: buildGoogleGenAIPrompt(messages),
      temperature: 0.7,
    });

    return stream.toDataStreamResponse();
  } catch (error) {
    console.error("Error saving chat session:", error);
    return NextResponse.json(
      { error: "Failed to save chat session" },
      { status: 500 }
    );
  }
}
