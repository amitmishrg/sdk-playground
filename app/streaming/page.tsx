'use client';

import { useState, useRef, useEffect } from 'react';
import { useActions, useUIState } from 'ai/rsc';
import { AI } from '../ai';
import { ChatLoader } from '@/components/ChatLoader';

export default function Page() {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setInput('');
    setLoading(true);

    setMessages((currentConversation) => [
      ...currentConversation,
      <div key={`user-message-${Date.now()}`} className="flex justify-end mb-4">
        <div className="bg-blue-500 text-white rounded-2xl py-2 px-4 max-w-[80%]">
          {input}
        </div>
      </div>,
    ]);

    try {
      const message = await submitUserMessage(input);

      setMessages((currentConversation) => [
        ...currentConversation,
        <div
          key={`ai-message-${Date.now()}`}
          className="flex justify-start mb-4"
        >
          <div className="bg-gray-100 dark:bg-zinc-800 rounded-2xl py-2 px-4 max-w-[80%]">
            {message}
          </div>
        </div>,
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-4 mb-24">
          {messages.map((message, i) => (
            <div key={i}>{message}</div>
          ))}

          {loading && <ChatLoader />}

          <div ref={messagesEndRef} />
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900/80 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 p-4">
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 dark:disabled:bg-blue-800 text-white px-6 py-2 rounded-xl font-medium transition-colors duration-200"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
