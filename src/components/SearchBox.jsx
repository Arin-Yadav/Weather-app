import React from "react";
import axios from "axios";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import mist from "../assets/mist2.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import { CiSearch } from "react-icons/ci";

const SearchBox = ({ inputSearch, setInputSearch, setWeatherData }) => {
  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  const search = async () => {
    if (!inputSearch) return window.alert("Please enter a city name"); // prevents empty search
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputSearch}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;
      const response = await axios.get(url);

      const icon = allIcons[response.data.weather[0].icon] || clear;
      const _condition = response.data.weather[0].main; // "Clear", "Clouds", "Rain"

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
      <button
        onClick={search}
        className="px-3 py-2 rounded-full bg-white hover:bg-gray-200 transition-colors cursor-pointer">
        <CiSearch className="h-5 w-5 text-black" />
      </button>
    </div>
  );
};

export default SearchBox;
