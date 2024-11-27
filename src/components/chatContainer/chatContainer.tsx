"use client";
import React, { useEffect, useRef } from "react";
import { Message, useChat } from "ai/react";

import { Send, Loader2, CircleStop } from "lucide-react";
import MessageList from "./messageList";

interface ChatContainerProps {
  chatSessionId: string;
  history: Message[];
}

const ChatContainer = ({ chatSessionId, history }: ChatContainerProps) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    error,
    setMessages,
  } = useChat({
    api: "/api/chat",
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (history.length > 0) {
      setMessages(history);
    }
  }, [history]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const saveChatHistory = async () => {
    if (messages.length === 0) {
      return;
    }
    const res = await fetch(`/api/chat/${chatSessionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: messages }),
    });
    if (!res.ok) {
      console.error("Failed to update messages");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col container mx-auto ">
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none align-middle "
        type="button"
        onClick={() => saveChatHistory()}
      >
        Save your chat history
      </button>
      <MessageList messages={messages} />
      {isLoading && (
        <div className="text-blue-500 text-sm mt-2 flex">
          <Loader2 className="animate-spin h-5 w-5 " />
        </div>
      )}
      {error && (
        <div className="text-red-500 text-sm mt-2">
          <div>An error occurred.</div>
          <button className="underline " type="button" onClick={() => reload()}>
            reload
          </button>
        </div>
      )}
      <div ref={scrollRef}></div>
      <form onSubmit={handleSubmit} className="flex w-full max-w-8xl mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={handleInputChange}
        />
        {!isLoading && (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
            disabled={isLoading}
          >
            <Send />
          </button>
        )}

        {isLoading && (
          <div className="text-blue-500 text-sm  flex">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none "
              type="button"
              onClick={() => stop()}
            >
              <CircleStop className="h-5 w-5 inline-block" />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChatContainer;
