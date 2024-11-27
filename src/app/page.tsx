"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const fetchChatSessions = async () => {
      try {
        const response = await fetch("/api/chat/all");
        const chatSessions = await response.json();

        if (chatSessions.chatSessions.length > 0) {
          const activeChatSessionId = chatSessions.chatSessions[0]._id;
          router.replace(`/chat/${activeChatSessionId}`);
        }
      } catch (error) {
        console.error("Failed to fetch chat sessions:", error);
      }
    };

    fetchChatSessions();
  }, [router]);

  return null;
}
