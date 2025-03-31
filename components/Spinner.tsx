export function Spinner() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="relative w-10 h-10">
        <div className="absolute w-full h-full border-4 border-zinc-200 dark:border-zinc-700 rounded-full"></div>
        <div className="absolute w-full h-full border-4 border-blue-500 rounded-full animate-[spin_1s_linear_infinite] border-t-transparent"></div>
      </div>
      <span className="text-sm text-zinc-500 dark:text-zinc-400 animate-pulse">
        Thinking...
      </span>
    </div>
  );
}