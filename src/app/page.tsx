"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RefreshChatHistoryContext } from "@/contexts/ChatHistoryContext";

export default function Home() {
  const router = useRouter();
  const { setActiveChatSession } = useContext(RefreshChatHistoryContext);

  useEffect(() => {
    const fetchChatSessions = async () => {
      try {
        const response = await fetch("/api/chat/all");
        const chatSessions = await response.json();

        if (chatSessions.chatSessions.length > 0) {
          const activeChatSessionId = chatSessions.chatSessions[0]._id;
          setActiveChatSession(activeChatSessionId);
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
