import React, { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [openChats, setOpenChats] = useState(() => {
    const savedChats = localStorage.getItem("openChats");
    return savedChats ? JSON.parse(savedChats) : [];
  });

  useEffect(() => {
    localStorage.setItem("openChats", JSON.stringify(openChats));
  }, [openChats]);

  const openChat = (roomId, peerName) => {
    if (!openChats.some((chat) => chat.roomId === roomId)) {
      setOpenChats((prevChats) => [...prevChats, { roomId, peerName, isMinimized: false }]);
    }
  };

  const closeChat = (roomId) => {
    setOpenChats((prevChats) => prevChats.filter((chat) => chat.roomId !== roomId));
  };

  const minimizeChat = (roomId) => {
    setOpenChats((prevChats) =>
      prevChats.map((chat) => (chat.roomId === roomId ? { ...chat, isMinimized: true } : chat))
    );
  };

  const maximizeChat = (roomId) => {
    setOpenChats((prevChats) =>
      prevChats.map((chat) => (chat.roomId === roomId ? { ...chat, isMinimized: false } : chat))
    );
  };

  return (
    <ChatContext.Provider value={{ openChats, openChat, closeChat, minimizeChat, maximizeChat }}>
      {children}
    </ChatContext.Provider>
  );
};
