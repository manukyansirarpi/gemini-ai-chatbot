import connectDB from "@/lib/db";
import ChatSession from "@/models/Chat";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const id = (await params).id;
  const chatSession = await ChatSession.findById(id);

  if (!chatSession) {
    return NextResponse.json(
      { error: "Chat session not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    chatSession,
  });
}
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const id = (await params).id;
  const chatSession = await ChatSession.findById(id);
  const { messages } = await request.json();

  const chatHistory = messages.map((message: any) => ({
    role: message.role,
    content: message.content,
    timestamp: new Date(),
  }));

  chatSession!.history.push(...chatHistory);

  const updatedSession = await ChatSession.findByIdAndUpdate(id, {
    history: chatSession!.history,
  });

  return NextResponse.json({
    success: true,
    updatedSession,
  });
}
