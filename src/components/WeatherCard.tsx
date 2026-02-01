import { Cloud, Droplets, Wind, Gauge } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const getWeatherIcon = () => {
    return `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500 rounded-3xl p-8 text-white shadow-2xl">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-3xl font-bold">{weather.location}</h2>
          <span className="text-xl text-white/80">{weather.country}</span>
        </div>

        <p className="text-white/90 text-lg capitalize mb-6">{weather.description}</p>

        <div className="flex items-center gap-4 mb-8">
          <img
            src={getWeatherIcon()}
            alt={weather.condition}
            className="w-32 h-32 drop-shadow-lg"
          />
          <div>
            <div className="text-7xl font-bold">{weather.temperature}°</div>
            <div className="text-white/80 text-lg">Feels like {weather.feelsLike}°</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="bg-white/30 p-3 rounded-xl">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white/80 text-sm">Humidity</div>
              <div className="text-2xl font-semibold">{weather.humidity}%</div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="bg-white/30 p-3 rounded-xl">
              <Wind className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white/80 text-sm">Wind</div>
              <div className="text-2xl font-semibold">{weather.windSpeed} km/h</div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="bg-white/30 p-3 rounded-xl">
              <Gauge className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white/80 text-sm">Pressure</div>
              <div className="text-2xl font-semibold">{weather.pressure} hPa</div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="bg-white/30 p-3 rounded-xl">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white/80 text-sm">Condition</div>
              <div className="text-xl font-semibold">{weather.condition}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
