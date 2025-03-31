export const SearchLoader = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center gap-3 bg-white/30 dark:bg-zinc-800/30 backdrop-blur-sm rounded-xl p-4 shadow-sm animate-pulse">
      <div className="h-4 w-4 rounded-full bg-blue-200 dark:bg-blue-900 animate-spin" />
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        {message}
      </div>
    </div>
  );
};