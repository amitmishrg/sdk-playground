'use client';

import { useActions, useUIState } from 'ai/rsc';
import { ReactNode } from 'react';

interface FlightsProps {
  flights: { id: string; flightNumber: string }[];
}

export const Flights = ({ flights }: FlightsProps) => {
  const { submitUserMessage } = useActions();
  const [message, setMessages] = useUIState();

  console.log(message);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {flights.map((result) => (
        <div
          key={result.id}
          className="group relative backdrop-blur-lg bg-white/30 dark:bg-zinc-800/30 rounded-2xl p-6 border border-white/20 dark:border-zinc-700/30 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

          <div
            onClick={async () => {
              const display = await submitUserMessage(
                `lookupFlight ${result.flightNumber}`
              );
              setMessages((messages: ReactNode[]) => [...messages, display]);
            }}
            className="relative cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Flight
              </div>
              <div className="h-6 w-6">
                <svg
                  className="text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <div className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
              {result.flightNumber}
            </div>

            <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
              Click to view details
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
