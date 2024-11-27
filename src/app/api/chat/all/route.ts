import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ChatSession from "@/models/Chat";

export async function GET() {
  await connectDB();
  const chatSessions = await ChatSession.find();

  return NextResponse.json({
    success: true,
    chatSessions,
  });
}
