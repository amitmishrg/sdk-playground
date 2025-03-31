type WeatherProps = {
  temperature: number;
  weather: string;
  location: string;
};

export const Weather = ({ temperature, weather, location }: WeatherProps) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return '☀️';
      case 'cloudy':
        return '☁️';
      case 'rainy':
        return '🌧️';
      case 'snowy':
        return '❄️';
      case 'windy':
        return '💨';
      default:
        return '🌤️';
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-zinc-900 rounded-xl shadow-lg p-6 border border-blue-200 dark:border-blue-800/30 hover:shadow-xl transition-all duration-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100">
            {location}
          </h2>
          <span className="text-3xl" role="img" aria-label={weather}>
            {getWeatherIcon(weather)}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white/50 dark:bg-zinc-800/50 p-3 rounded-lg backdrop-blur-sm">
            <span className="text-blue-700 dark:text-blue-300">Condition</span>
            <span className="font-medium text-blue-900 dark:text-blue-100 capitalize">
              {weather}
            </span>
          </div>

          <div className="flex items-center justify-between bg-white/50 dark:bg-zinc-800/50 p-3 rounded-lg backdrop-blur-sm">
            <span className="text-blue-700 dark:text-blue-300">
              Temperature
            </span>
            <span className="font-mono font-medium text-blue-900 dark:text-blue-100">
              {temperature}°C
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
