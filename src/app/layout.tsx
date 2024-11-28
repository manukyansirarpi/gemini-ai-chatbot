import type { Metadata } from "next";
import "./globals.css";
import MainNav from "@/components/nav/mainNav";
import { RefreshChatHistoryProvider } from "@/contexts/ChatHistoryContext";

export const metadata: Metadata = {
  title: "Gemini AI Chatbot",
  description: "Gemini AI Chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen flex">
          <RefreshChatHistoryProvider>
            <MainNav />
            {children}
          </RefreshChatHistoryProvider>
        </div>
      </body>
    </html>
  );
}
