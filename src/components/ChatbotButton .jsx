import React, { useEffect, useRef, useState } from "react";
import { FaComments } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuSendHorizontal } from "react-icons/lu";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [messages, setMessages] = useState([
    { sender: "bot", text: "💬 Xin chào! Tôi có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);

    // Fake bot phản hồi
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `🤖 Bot trả lời: "${input}"` },
      ]);
    }, 500);

    setInput("");
  };

  return (
    <div>
      {/* Nút floating */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition z-50"
        aria-label="Chatbot"
      >
        {isOpen ? <IoClose /> : <FaComments />}
      </button>

      {/* Hộp chat */}
      <div
        className={`
          fixed bottom-20 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border flex flex-col z-40
          transition-all duration-500 ease-in-out transform origin-bottom-right
          ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}
        `}
      >
        <div className="font-semibold text-lg border-b p-3">Chatbot</div>

        {/* Vùng hiển thị tin nhắn */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg max-w-[70%] ${
                msg.sender === "user"
                  ? "ml-auto bg-red-500 text-white"
                  : "mr-auto bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Ô nhập tin nhắn */}
        <div className="p-2 border-t flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <LuSendHorizontal/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotButton;
