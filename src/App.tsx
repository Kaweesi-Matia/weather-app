import { useState, useEffect } from 'react';
import { WeatherData, ForecastDay } from './types/weather';
import { getCurrentWeather, getForecast, getUserLocation } from './services/weatherService';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(lat, lon),
        getForecast(lat, lon),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    try {
      const { lat, lon } = await getUserLocation();
      fetchWeatherData(lat, lon);
    } catch (err) {
      setError('Unable to get your location. Please search for a city.');
    }
  };

  const handleLocationSelect = (lat: number, lon: number) => {
    fetchWeatherData(lat, lon);
  };

  useEffect(() => {
    handleUseCurrentLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Weather App
            </h1>
            <p className="text-gray-600 text-lg">Real-time weather updates for any location</p>
          </div>

          <div className="flex justify-center mb-8">
            <SearchBar
              onLocationSelect={handleLocationSelect}
              onUseCurrentLocation={handleUseCurrentLocation}
            />
          </div>

          {loading && <LoadingSpinner />}

          {error && (
            <ErrorMessage
              message={error}
              onRetry={handleUseCurrentLocation}
            />
          )}

          {!loading && !error && weather && (
            <div className="space-y-6">
              <WeatherCard weather={weather} />

              {forecast.length > 0 && (
                <Forecast forecast={forecast} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
