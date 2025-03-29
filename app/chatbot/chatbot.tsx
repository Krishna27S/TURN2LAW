'use client';
import { useState } from 'react';

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        const response = await fetch('/api/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        setMessages([...messages, { user: input, bot: data.reply }]);
        setInput('');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Chatbot</h1>
            <div className="border p-4 h-64 overflow-y-auto">
                {messages.map((msg, index) => (
                    <p key={index}><strong>User:</strong> {msg.user} <br/><strong>Bot:</strong> {msg.bot}</p>
                ))}
            </div>
            <input 
                className="border p-2 mt-4"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button className="bg-green-500 text-white p-2 ml-2" onClick={sendMessage}>Send</button>
        </div>
    );
}
