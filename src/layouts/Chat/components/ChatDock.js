import React from "react";
import { useChat } from "hook/ChatContext";
import Chat from "layouts/Chat";
import SoftAvatar from "components/SoftAvatar";
import user1 from "../../../assets/images/user/user3.jpg";

function ChatDock() {
  const { openChats, closeChat, maximizeChat } = useChat();
  const maxChatsDesktop = 3; // Giới hạn tối đa 3 cửa sổ chat trên desktop
  const maxChatsMobile = 2; // Giới hạn tối đa 1 cửa sổ chat trên mobile

  return (
    <div className="fixed bottom-2 left-0 right-20 flex flex-row items-end justify-end  p-2 sm:p-4 space-x-2">
      {openChats
        .slice(0, window.innerWidth < 640 ? maxChatsMobile : maxChatsDesktop)
        .map((chat, index) =>
          chat.isMinimized ? (  
            <div
              key={chat.roomId}
              className="cursor-pointer mb-2"
              onClick={() => maximizeChat(chat.roomId)}
            >
              <SoftAvatar className="w-10 h-10 sm:w-12 sm:h-12">
                <img src={user1} alt="User" className="rounded-full clip-circle" />
              </SoftAvatar>
            </div>
          ) : (
            <div
              key={chat.roomId}
              className="w-[90%] sm:w-[360px] bg-white shadow-lg rounded-lg mb-2"
              style={{
                bottom: `${index * 40}px`,
              }}
            >
              <Chat roomId={chat.roomId} peerName={chat.peerName} />
            </div>
          )
        )}
    </div>
  );
}

export default ChatDock;
