import { ForecastDay } from '../types/weather';
import { Droplets, Wind } from 'lucide-react';

interface ForecastProps {
  forecast: ForecastDay[];
}

export default function Forecast({ forecast }: ForecastProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">5-Day Forecast</h3>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <p className="font-semibold text-gray-700 mb-2">{day.date}</p>

              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.condition}
                className="w-16 h-16 mx-auto"
              />

              <p className="text-sm text-gray-600 capitalize mb-3">{day.condition}</p>

              <div className="flex justify-center items-center gap-2 mb-3">
                <span className="text-2xl font-bold text-gray-800">{day.tempMax}°</span>
                <span className="text-lg text-gray-500">{day.tempMin}°</span>
              </div>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center justify-center gap-2">
                  <Droplets className="w-3 h-3" />
                  <span>{day.humidity}%</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Wind className="w-3 h-3" />
                  <span>{day.windSpeed} km/h</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
