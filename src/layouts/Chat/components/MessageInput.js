import React, { useEffect, useState, useRef } from "react";
import { ActionIcon } from "./ChatHeader"; // Assuming ActionIcon is exported from here
import { Send, ThumbsUp, Smile, ImageIcon } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export function MessageInput({ onMessageSubmit, messageText, onMessageChange }) {
  const textareaRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      adjustTextareaHeight();
    }
  }, [messageText]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.target.closest("form");
      if (form) {
        form.requestSubmit();
      }
    }
  };

  const handleEmojiSelect = (event, emojiObject) => {
    onMessageChange({
      target: {
        value: messageText + emojiObject.emoji,
      },
    });

    setShowEmojiPicker(false);
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 180);
      textareaRef.current.style.height = `${newHeight}px`;
      setIsExpanded(newHeight > 40);
    }
  };

  const handleInputChange = (e) => {
    onMessageChange(e);
    adjustTextareaHeight();
  };

  return (
    <form onSubmit={onMessageSubmit} className="p-3 border-t border-gray-200 bg-white relative">
      <div className="flex items-center gap-2 max-w-[800px] mx-auto">
        <ActionIcon icon={<ImageIcon className="w-6 h-6" />} />

        <div
          className={`flex-1 flex items-center bg-gray-100 min-h-[40px] max-h-[200px] overflow-hidden transition-all duration-75 ease-out ${
            isExpanded ? "rounded-2xl" : "rounded-full"
          }`}
        >
          <textarea
            ref={textareaRef}
            className="flex-1 overflow-y-auto text-sm pl-4 py-2 focus:outline-none whitespace-pre-wrap break-words max-h-[100px] resize-none"
            placeholder="Aa"
            value={messageText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
            style={{
              lineHeight: "1.35",
              overflowWrap: "break-word",
              wordWrap: "break-word",
              wordBreak: "break-word",
            }}
          />
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-blue-500"
          >
            <Smile className="w-6 h-6 m-2" />
          </button>
        </div>

        {messageText.trim() ? (
          <button type="submit" className="text-blue-500 rounded-full p-2 transition-colors">
            <Send className="w-6 h-6" />
          </button>
        ) : (
          <button type="button" className="text-blue-500 rounded-full p-2 transition-colors">
            <ThumbsUp className="w-6 h-6" />
          </button>
        )}
      </div>

      {showEmojiPicker && (
        <div className="absolute bottom-14 left-0 z-10">
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
    </form>
  );
}

export default MessageInput;
