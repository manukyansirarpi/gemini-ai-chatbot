"use client";

import { createContext, useState, ReactNode } from "react";

interface RefreshChatHistoryContextProviderProps {
  children: ReactNode;
}

interface RefreshChatHistoryContextType {
  triggerRefresh: (refresh: boolean) => void;
  setActiveChatSession: (chatSessionId: string) => void;
  refresh: boolean;
  activeChatSessionId: string;
}

export const RefreshChatHistoryContext =
  createContext<RefreshChatHistoryContextType>({
    triggerRefresh: () => {},
    setActiveChatSession: () => {},
    refresh: false,
    activeChatSessionId: "",
  });

export const RefreshChatHistoryProvider = ({
  children,
}: RefreshChatHistoryContextProviderProps) => {
  const [refresh, setRefresh] = useState(false);
  const [activeChatSessionId, setActiveChatSessionId] = useState("");

  const triggerRefresh = (refresh: boolean) => setRefresh(refresh);
  const setActiveChatSession = (chatSessionId: string) => {
    setActiveChatSessionId(chatSessionId);
  };

  return (
    <RefreshChatHistoryContext.Provider
      value={{
        triggerRefresh,
        refresh,
        activeChatSessionId,
        setActiveChatSession,
      }}
    >
      {children}
    </RefreshChatHistoryContext.Provider>
  );
};
