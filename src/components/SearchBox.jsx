import axios from "axios";
import {images} from '../assets/images'
import { Search } from "lucide-react";

const SearchBox = ({ inputSearch, setInputSearch, setWeatherData }) => {
  const allIcons = {
    "01d": `${images.clear}`,
    "01n": `${images.clear}`,
    "02d": `${images.cloud}`,
    "02n": `${images.cloud}`,
    "03d": `${images.cloud}`,
    "03n": `${images.cloud}`,
    "04d": `${images.drizzle}`,
    "04n": `${images.drizzle}`,
    "09d": `${images.rain}`,
    "09n": `${images.rain}`,
    "10d": `${images.rain}`,
    "10n": `${images.rain}`,
    "13d": `${images.snow}`,
    "13n": `${images.snow}`,
    "50d": `${images.mist}`,
    "50n": `${images.mist}`,
  };

  const search = async () => {
    if (!inputSearch) return window.alert("Please enter a city name"); // prevents empty search
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputSearch}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;
      const response = await axios.get(url);

      const icon = allIcons[response.data.weather[0].icon] || `${images.clear}`;
      // const _condition = response.data.weather[0].main; // "Clear", "Clouds", "Rain"

      setWeatherData({
        humidity: response.data.main.humidity,
        temp: Math.floor(response.data.main.temp),
        location: response.data.name,
        icon: icon,
        description: response.data.weather[0].description,
        wind: (response.data.wind.speed * 3.6).toFixed(1), // km/h
        pressure: response.data.main.pressure,
        visibility: (response.data.visibility / 1000).toFixed(1), // km
        sunrise: new Date(response.data.sys.sunrise * 1000).toLocaleTimeString(
          [],
          { hour: "2-digit", minute: "2-digit" },
        ),
        sunset: new Date(response.data.sys.sunset * 1000).toLocaleTimeString(
          [],
          { hour: "2-digit", minute: "2-digit" },
        ),
        country: response.data.sys.country,
      });

      setInputSearch("");
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handleSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftkey) {
      e.preventDefault();
      search();
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-full px-4 py-2 w-full max-w-md mx-auto bg-white/20 backdrop-blur-md shadow-lg">
      <input
        type="text"
        placeholder="Enter city name"
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-white placeholder-white focus:outline-none text-sm sm:text-base"
        value={inputSearch}
        onChange={handleSearch}
      />
      <button onClick={search} className="px-3 py-2 cursor-pointer">
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchBox;
