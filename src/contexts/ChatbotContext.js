// src/contexts/ChatbotContext.js
import React, { createContext, useState, useContext } from 'react';

export const ChatbotContext = createContext({});

export function ChatbotProvider({ children }) {
  // This state holds the latest context doc from MainPage
  const [chatbotContext, setChatbotContext] = useState(null);

  return (
    <ChatbotContext.Provider value={{ chatbotContext, setChatbotContext }}>
      {children}
    </ChatbotContext.Provider>
  );
}

// Custom hook for using the context in any component
export function useChatbotContext() {
  return useContext(ChatbotContext);
}