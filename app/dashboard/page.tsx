"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, Mail, User, SendHorizontal } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, slideIn, staggerContainer } from "@/lib/animations";

type Message = {
  role: 'user' | 'assistant';
  content: string;
};



export default function Dashboard() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your TURN2LAW legal assistant. How can I help you today?",
    },
  ]);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotificationDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);

      // Add user message
      const userMessage = { role: 'user', content: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');

      // Send request to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      // Add assistant's response
      setMessages((prev) => [...prev, data]);

    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-900 text-white flex flex-col"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-teal-400">Dashboard</div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* Notification Icon */}
          <div className="relative" ref={notificationRef}>
            <Bell
              className="w-6 h-6 cursor-pointer hover:text-gray-400"
              onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
            />
            {showNotificationDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-800 shadow-lg rounded-lg p-3 z-50">
                <p className="text-sm font-medium text-gray-300">No new notifications</p>
              </div>
            )}
          </div>

          {/* Messages Icon */}
          <Mail
            className="w-6 h-6 cursor-pointer hover:text-gray-400"
            onClick={() => router.push("/messages")}
          />

          {/* Profile Icon */}
          <div className="relative" ref={profileRef}>
            <User
              className="w-6 h-6 cursor-pointer hover:text-gray-400"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            />
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg p-3 z-50">
                <ul className="text-sm space-y-2">
                  <li
                    className="hover:bg-gray-700 p-2 rounded cursor-pointer"
                    onClick={() => router.push("/profile")}
                  >
                    Profile
                  </li>
                  <li
                    className="hover:bg-gray-700 p-2 rounded cursor-pointer"
                    onClick={() => router.push("/settings")}
                  >
                    Settings
                  </li>
                  <li
                    className="hover:bg-red-600 p-2 rounded cursor-pointer text-red-300"
                    onClick={() => router.push("/")}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <motion.div 
        className="container mx-auto px-4 py-8 flex-1"
        variants={slideIn}
      >
        <div className="grid md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <motion.div 
            className="col-span-3 bg-gray-800 p-6 rounded-lg"
            variants={fadeInUp}
          >
            {/* Sidebar content */}
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="col-span-9 space-y-6"
            variants={staggerContainer}
          >
            {/* Dashboard cards */}
            <AnimatePresence>
              {dashboardItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-800 p-6 rounded-lg"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                >
                  <h2 className="text-xl font-bold text-teal-400">{item.title}</h2>
                  <p className="text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Chat Box */}
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl overflow-hidden mx-auto">
        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          className="h-[400px] overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-700 text-white'
                }`}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-white rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your legal question..."
              className="flex-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50"
            >
              <SendHorizontal className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}