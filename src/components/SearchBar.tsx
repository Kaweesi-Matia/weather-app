import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { GeoLocation } from '../types/weather';
import { searchLocation } from '../services/weatherService';

interface SearchBarProps {
  onLocationSelect: (lat: number, lon: number) => void;
  onUseCurrentLocation: () => void;
}

export default function SearchBar({ onLocationSelect, onUseCurrentLocation }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);

    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const locations = await searchLocation(searchQuery);
      setResults(locations);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectLocation = (location: GeoLocation) => {
    onLocationSelect(location.lat, location.lon);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-4 py-3 pl-12 pr-12 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-lg transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <button
          onClick={onUseCurrentLocation}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          title="Use current location"
        >
          <MapPin className="w-5 h-5 text-blue-500" />
        </button>
      </div>

      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-10">
          {results.map((location, index) => (
            <button
              key={index}
              onClick={() => handleSelectLocation(location)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{location.name}</span>
              <span className="text-gray-500 text-sm">{location.country}</span>
            </button>
          ))}
        </div>
      )}

      {isSearching && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-4 text-center text-gray-500">
          Searching...
        </div>
      )}
    </div>
  );
}
