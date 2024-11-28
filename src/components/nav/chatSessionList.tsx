import { useContext, useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatSessionI } from "@/models/Chat";
import { RefreshChatHistoryContext } from "@/contexts/ChatHistoryContext";

const ChatSessionList = () => {
  const router = useRouter();
  const { triggerRefresh, refresh, activeChatSessionId, setActiveChatSession } =
    useContext(RefreshChatHistoryContext);
  const [chatSessions, setChatSessions] = useState<ChatSessionI[]>([]);

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

  const handleSetActiveChatSession = (chatSessionId: string) => {
    setActiveChatSession(chatSessionId);
    router.push(`/chat/${chatSessionId}`);
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
              onClick={() =>
                handleSetActiveChatSession(chatSession._id.toString())
              }
              className={`p-3  shadow-md rounded-md cursor-pointer hover:bg-gray-200 ${
                chatSession._id.toString() === activeChatSessionId
                  ? "bg-gray-400  hover:bg-gray-400"
                  : "bg-white"
              }`}
            >
              <button>
                <div
                  className={`text-sm  truncate ${
                    chatSession._id.toString() === activeChatSessionId
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
                  {chatSession.history.length > 0
                    ? chatSession.history[0].content
                    : "No messages"}
                </div>
              </button>
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
