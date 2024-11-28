"use client";

import { createContext, useState, ReactNode } from "react";

interface RefreshChatHistoryContextProviderProps {
  children: ReactNode;
}

interface RefreshChatHistoryContextType {
  triggerRefresh: (refresh: boolean) => void;
  refresh: boolean;
}

export const RefreshChatHistoryContext =
  createContext<RefreshChatHistoryContextType>({
    triggerRefresh: () => {},
    refresh: false,
  });

export const RefreshChatHistoryProvider = ({
  children,
}: RefreshChatHistoryContextProviderProps) => {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = (refresh: boolean) => setRefresh(refresh);

  return (
    <RefreshChatHistoryContext.Provider value={{ triggerRefresh, refresh }}>
      {children}
    </RefreshChatHistoryContext.Provider>
  );
};
