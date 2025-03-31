type StockProps = {
  price: number;
  symbol: string;
};

export const Stock = ({ price, symbol }: StockProps) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-all duration-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-white">
            Stock Information
          </h2>
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg">
            <span className="text-zinc-600 dark:text-zinc-400">Symbol</span>
            <span className="font-mono font-medium text-zinc-900 dark:text-zinc-100">
              {symbol}
            </span>
          </div>

          <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg">
            <span className="text-zinc-600 dark:text-zinc-400">Price</span>
            <span className="font-mono font-medium text-green-600 dark:text-green-400">
              ${price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
