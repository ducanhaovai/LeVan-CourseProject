import React, { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import io from "socket.io-client";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import { getRoomMessage } from "api/apiChat";
import { fetchUsersByID } from "api/apiAdmin";

const getCurrentUserId = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  return null;
};

const socket = io("http://localhost:3001");

function Chat({ roomId, peerName }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const currentUser = useRef(getCurrentUserId());
  const chatAreaRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    socket.emit("joinRoom", { roomId });

    socket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...newMessage,
          isCurrentUser: String(newMessage.senderId) === String(currentUser.current),
        },
      ]);
    });

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("newMessage");
    };
  }, [roomId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getRoomMessage(roomId)
      .then((response) => {
        setMessages(
          response.data.map((msg) => ({
            ...msg,
            isCurrentUser: String(msg.senderId) === String(currentUser.current),
          }))
        );
      })
      .catch((error) => console.error("Error fetching room messages:", error));
  }, [roomId]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
      });
    }
  }, [messages]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const messageData = {
      senderId: currentUser.current,
      roomId,
      message: messageText,
      createdAt: new Date().toISOString(),
    };

    socket.emit("sendMessage", messageData);

    setMessageText("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleInputChange = (e) => {
    const textarea = e.target;
    setMessageText(textarea.value);
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textarea.scrollHeight}px`;
    }
  }, [messageText]);

  return (
    <div className="h-[480px] sm:w-[360px]  bg-white text-black rounded-lg shadow-lg flex flex-col max-h-[480px] animate-fade-up">
      <ChatHeader peerName={peerName} roomId={roomId} />
      <div className="flex-1 overflow-y-auto" ref={chatAreaRef}>
        <MessageList messages={messages} />
      </div>
      <MessageInput
        onMessageSubmit={handleMessageSubmit}
        messageText={messageText}
        onMessageChange={handleInputChange}
        textareaRef={textareaRef}
      />
    </div>
  );
}

export default Chat;
