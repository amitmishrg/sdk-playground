interface FlightDetailsProps {
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
}

export const FlightDetails = ({
  flightNumber,
  departureTime,
  arrivalTime,
}: FlightDetailsProps) => {
  return (
    <div className="backdrop-blur-lg bg-white/30 dark:bg-zinc-800/30 rounded-2xl p-6 border border-white/20 dark:border-zinc-700/30 shadow-lg max-w-sm">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-500"
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
          <div className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            Flight {flightNumber}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between bg-white/50 dark:bg-zinc-900/50 p-3 rounded-lg">
            <span className="text-zinc-500 dark:text-zinc-400">Departure</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-100">
              {departureTime}
            </span>
          </div>

          <div className="flex items-center justify-between bg-white/50 dark:bg-zinc-900/50 p-3 rounded-lg">
            <span className="text-zinc-500 dark:text-zinc-400">Arrival</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-100">
              {arrivalTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
