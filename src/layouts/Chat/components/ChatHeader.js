import React, { useEffect, useState, useRef } from "react";
import { Minus, X } from "lucide-react";
import { useChat } from "hook/ChatContext";
import SoftAvatar from "components/SoftAvatar";
import user1 from "../../../assets/images/user/user3.jpg";
import { jwtDecode } from "jwt-decode";

const getCurrentUserEmail = () => {
  const token = localStorage.getItem("token"); 
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.email; 
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  return null;
};

export default function ChatHeader({ peerName, roomId }) {
  const { closeChat, minimizeChat } = useChat();
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  useEffect(() => {
    const email = getCurrentUserEmail();
    setCurrentUserEmail(email);
  }, []); 

  return (
    <div className="p-2 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center gap-2">
        <SoftAvatar className="w-8 h-8">
          <img src={user1} alt="User" className="rounded-full clip-circle" />
        </SoftAvatar>
        <div>
          <h3 className="text-sm font-semibold">{peerName}</h3>
          <p className="text-xs text-gray-500">{currentUserEmail || "Loading..."}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => minimizeChat(roomId)}
          className="shrink-0 text-blue-500 rounded-full transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={() => closeChat(roomId)}
          className="shrink-0 text-blue-500 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function ActionIcon({ icon }) {
  return <span className="shrink-0 text-blue-500 rounded-full transition-colors">{icon}</span>;
}
