'use client';

import { useChat } from '@ai-sdk/react';
import { Spinner } from '@/components/Spinner';

export default function Basic() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    error,
    reload,
    addToolResult,
  } = useChat({
    maxSteps: 5,
    experimental_throttle: 50,
    // run client-side tools that are automatically executed:
    async onToolCall({ toolCall }) {
      console.log('toolCall', { toolCall });

      if (toolCall.toolName === 'getLocation') {
        const cities = ['New York', 'Los Angeles', 'Chicago', 'San Francisco'];
        return cities[Math.floor(Math.random() * cities.length)];
      }
    },
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch gap-4">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === 'user' ? 'User: ' : 'AI: '}

          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'step-start':
                // show step boundaries as horizontal lines:
                return i > 0 ? (
                  <div key={i} className="text-gray-500">
                    <hr className="my-2 border-gray-300" />
                  </div>
                ) : null;

              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>;

              case 'tool-invocation': {
                const callId = part.toolInvocation.toolCallId;

                switch (part.toolInvocation.toolName) {
                  case 'askForConfirmation': {
                    switch (part.toolInvocation.state) {
                      case 'call':
                        return (
                          <div key={callId}>
                            {part.toolInvocation.args.message}
                            <div>
                              <button
                                className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                                onClick={() =>
                                  addToolResult({
                                    toolCallId: callId,
                                    result: 'Yes, confirmed.',
                                  })
                                }
                              >
                                Yes
                              </button>
                              <button
                                className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                                onClick={() =>
                                  addToolResult({
                                    toolCallId: callId,
                                    result: 'No, denied',
                                  })
                                }
                              >
                                No
                              </button>
                            </div>
                          </div>
                        );
                      case 'result':
                        return (
                          <div key={callId}>
                            Location access allowed:{' '}
                            {part.toolInvocation.result}
                          </div>
                        );
                    }
                    break;
                  }

                  case 'getLocation': {
                    switch (part.toolInvocation.state) {
                      case 'call':
                        return <div key={callId}>Getting location...</div>;
                      case 'result':
                        return (
                          <div key={callId}>
                            Location: {part.toolInvocation.result}
                          </div>
                        );
                    }
                    break;
                  }

                  case 'getWeatherInformation': {
                    switch (part.toolInvocation.state) {
                      // example of pre-rendering streaming tool calls:
                      case 'partial-call':
                        return (
                          <pre key={callId}>
                            {JSON.stringify(part.toolInvocation, null, 2)}
                          </pre>
                        );
                      case 'call':
                        return (
                          <div key={callId}>
                            Getting weather information for{' '}
                            {part.toolInvocation.args.city}...
                          </div>
                        );
                      case 'result':
                        return (
                          <div key={callId}>
                            Weather in {part.toolInvocation.args.city}:{' '}
                            {part.toolInvocation.result}
                          </div>
                        );
                    }
                    break;
                  }
                  default:
                    return (
                      <div
                        key={`${message.id}-${i}`}
                        className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 rounded-xl p-6 my-3 shadow-md border border-zinc-200 dark:border-zinc-700"
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                          <div className="font-semibold text-sm text-blue-500 dark:text-blue-400">
                            Tool Invocation
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 p-3 rounded-lg">
                            <span className="font-medium text-zinc-700 dark:text-zinc-300">
                              Tool:
                            </span>
                            <span className="text-blue-600 dark:text-blue-400 font-mono">
                              {part.toolInvocation.toolName}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <span className="font-medium text-zinc-700 dark:text-zinc-300">
                              Parameters:
                            </span>
                            <pre className="bg-white dark:bg-zinc-800 p-4 rounded-lg text-sm overflow-x-auto font-mono border border-zinc-100 dark:border-zinc-700">
                              {JSON.stringify(
                                part.toolInvocation.args,
                                null,
                                2
                              )}
                            </pre>
                          </div>
                        </div>
                      </div>
                    );
                }
              }
            }
          })}
        </div>
      ))}

      {error && (
        <>
          <div>An error occurred.</div>
          <button type="button" onClick={() => reload()}>
            Retry
          </button>
        </>
      )}

      {(status === 'submitted' || status === 'streaming') && (
        <div className="flex items-center justify-center gap-4">
          {status === 'submitted' && <Spinner />}
          <button
            type="button"
            onClick={() => stop()}
            className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
          >
            Stop
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          disabled={status !== 'ready'}
        />
      </form>
    </div>
  );
}
