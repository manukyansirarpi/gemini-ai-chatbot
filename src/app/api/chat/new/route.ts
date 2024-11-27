import connectDB from "@/lib/db";
import ChatSession from "@/models/Chat";
import { NextResponse } from "next/server";

// POST: api/chat/new
export async function POST() {
  await connectDB();

  const chatSession = new ChatSession({
    history: [],
  });

  const newSession = await chatSession!.save();

  return NextResponse.json({
    success: true,
    chatSession: newSession,
  });
}
