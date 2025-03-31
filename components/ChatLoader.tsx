export const ChatLoader = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-gray-100 dark:bg-zinc-800 rounded-2xl py-3 px-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
          </div>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            AI is thinking
          </span>
        </div>
      </div>
    </div>
  );
};
