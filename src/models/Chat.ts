import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

export interface ChatMessageI extends Document {
  _id: ObjectId;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const ChatMessageSchema: Schema<ChatMessageI> = new Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export interface ChatSessionI extends Document {
  _id: ObjectId;
  history: ChatMessageI[];
}

const ChatSessionSchema: Schema<ChatSessionI> = new Schema({
  history: [ChatMessageSchema],
});

const ChatSession: Model<ChatSessionI> =
  mongoose.models.ChatSession ||
  mongoose.model<ChatSessionI>("ChatSession", ChatSessionSchema);

export default ChatSession;
