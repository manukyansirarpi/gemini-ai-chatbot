import { useContext, useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChatSessionI } from "@/models/Chat";
import { RefreshChatHistoryContext } from "@/contexts/ChatHistoryContext";

const ChatSessionList = () => {
  const router = useRouter();
  const [chatSessions, setChatSessions] = useState<ChatSessionI[]>([]);
  const { triggerRefresh, refresh } = useContext(RefreshChatHistoryContext);

  const fetchChatSessions = async () => {
    try {
      const response = await fetch("/api/chat/all");
      const chatSessions = await response.json();
      setChatSessions(chatSessions.chatSessions);
    } catch (error) {
      console.error("Failed to fetch chat sessions:", error);
    }
  };

  useEffect(() => {
    fetchChatSessions();
  }, []);

  useEffect(() => {
    if (refresh) {
      fetchChatSessions();
      triggerRefresh(false);
    }
  }, [refresh]);

  const handleNewChatSession = async () => {
    try {
      const response = await fetch("/api/chat/new", {
        method: "POST",
      });
      const chatSession = await response.json();
      setChatSessions([...chatSessions, chatSession.chatSession]);
      router.push(`/chat/${chatSession.chatSession._id}`);
    } catch (error) {
      console.error("Failed to create new chat session:", error);
    }
  };

  return (
    <div className="p-4 h-full">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold mb-4">Chat History</h2>
        <button
          onClick={handleNewChatSession}
          className="p-2 rounded hover:bg-gray-200 focus:outline-none"
        >
          <Pencil />
        </button>
      </div>

      <ul className="space-y-4 overflow-scroll h-[95%]">
        {chatSessions.length > 0 ? (
          chatSessions.map((chatSession: ChatSessionI) => (
            <li
              key={chatSession._id.toString()}
              className="p-3 bg-white shadow-md rounded-md cursor-pointer hover:bg-gray-200"
            >
              <Link href={`/chat/${chatSession._id}`}>
                <div className="text-sm text-gray-600 truncate">
                  {chatSession.history.length > 0
                    ? chatSession.history[0].content
                    : "No messages"}
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No chat sessions available.</li>
        )}
      </ul>
    </div>
  );
};

export default ChatSessionList;
