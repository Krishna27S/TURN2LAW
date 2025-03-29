'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { ChatWindow } from './ChatWindow';

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-24 z-50"> {/* Changed to right-24 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#4FD1C5] text-black p-3 rounded-full shadow-lg hover:bg-[#4FD1C5]/90 transition-colors"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0"> {/* Changed positioning to right */}
          <ChatWindow />
        </div>
      )}
    </div>
  );
}