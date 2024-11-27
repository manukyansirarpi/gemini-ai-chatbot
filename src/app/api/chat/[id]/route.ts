import connectDB from "@/lib/db";
import ChatSession from "@/models/Chat";
import ErrorHandler from "@/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;
  const chatSession = await ChatSession.findById(id);

  if (!chatSession) {
    throw new ErrorHandler("ChatSessions not found", 404);
  }

  return NextResponse.json({
    success: true,
    chatSession,
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = await params;
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
