import React, { useEffect, useState, useRef, useCallback } from "react";
import SoftAvatar from "components/SoftAvatar";
import user1 from "../../../assets/images/user/user2.jpg";

export function MessageList({ messages, loadMoreMessages }) {
  const lastMessageRef = useRef(null);
  const topMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreMessages();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (topMessageRef.current) {
      observer.observe(topMessageRef.current);
    }

    return () => {
      if (topMessageRef.current) {
        observer.unobserve(topMessageRef.current);
      }
    };
  }, [loadMoreMessages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div ref={topMessageRef} />
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`flex items-start ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}
        >
          {!msg.isCurrentUser && (
            <SoftAvatar className="mr-2">
              <img src={user1} alt="Other User" className="rounded-full" />
            </SoftAvatar>
          )}
          <div
            style={{
              wordBreak: "break-word",
            }}
            className={`rounded-2xl p-3 max-w-[70%] ${
              msg.isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
            }`}
          >
            <p className="text-sm">{msg.message}</p>
          </div>
        </div>
      ))}
      <div ref={lastMessageRef} />
    </div>
  );
}

export default MessageList;
