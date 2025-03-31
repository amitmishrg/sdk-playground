'use client';
import { useChat } from '@ai-sdk/react';
import { Stock } from '@/components/Stock';
import { Weather } from '@/components/Weather';
import { useEffect, useRef } from 'react';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/generative',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-6 mb-24 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-zinc-800 shadow-sm'
                }`}
              >
                <div className="font-medium mb-1">
                  {message.role === 'user' ? 'You' : 'AI Assistant'}
                </div>
                <div className="text-sm">{message.content}</div>
              </div>

              {message.toolInvocations?.map((toolInvocation) => {
                const { toolName, toolCallId, state } = toolInvocation;

                if (state === 'result') {
                  return (
                    <div key={toolCallId} className="mt-4 w-full max-w-md">
                      {toolName === 'displayWeather' ? (
                        <Weather {...toolInvocation.result} />
                      ) : toolName === 'getStockPrice' ? (
                        <Stock {...toolInvocation.result} />
                      ) : null}
                    </div>
                  );
                }

                return (
                  <div
                    key={toolCallId}
                    className="mt-4 bg-white dark:bg-zinc-800 rounded-lg p-4 shadow-sm animate-pulse"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-blue-200 dark:bg-blue-900 animate-spin" />
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        {toolName === 'displayWeather'
                          ? 'Fetching weather data...'
                          : toolName === 'getStockPrice'
                          ? 'Loading stock information...'
                          : 'Processing...'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900/80 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 p-4"
        >
          <div className="max-w-4xl mx-auto flex gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about weather or stocks..."
              className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-medium transition-colors duration-200"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
