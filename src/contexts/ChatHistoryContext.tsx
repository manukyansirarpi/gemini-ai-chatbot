"use client";
import { createContext, useState } from "react";

export const RefreshChatHistoryContext = createContext({
  triggerRefresh: (refresh: boolean) => {},
  refresh: false,
});

interface RefreshChatHistoryContextProviderProps {
  children: React.ReactNode;
}

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
