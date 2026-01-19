import { FaMapMarkerAlt } from "react-icons/fa";
import search_icon from "./assets/search.png";
import axios from "axios";
import { useState } from "react";

import clear from "./assets/clear.png";
import cloud from "./assets/cloud.png";
import drizzle from "./assets/drizzle.png";
import mist from "./assets/mist2.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";

import visibility from "./assets/visibility_icon.png";
import wind from "./assets/wind_icon.png";
import pressure from "./assets/pressure.png";

import sunrise from "./assets/sunrise.png";
import sunset from "./assets/sunset.png";

// import sunnyBg from "./assets/sunny.jpg";
// import rainyBg from "./assets/rainy.webp";
// import cloudyBg from "./assets/cloudy.webp";
// import smoky from "./assets/smoky.jpg";
// import backgroundImage from "./assets/landscape-scenery.jpg";

const App = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  // const [weather, setWeather] = useState("clear"); // dynamic state by me

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

  // Map weather to background image
  // const weatherBackgrounds = {
  //   Sunny: sunnyBg,
  //   Rain: rainyBg,
  //   Cloud: cloudyBg,
  //   Smoke: smoky,
  //   Mist: mist,
  //   default: backgroundImage,
  // };

  // const normalizeWeather = (condition) => {
  //   if (!condition) return "default";
  //   const key = condition.toLowerCase();
  //   if (key.includes("cloud")) return "Cloud";
  //   if (key.includes("rain")) return "Rain";
  //   if (key.includes("clear")) return "Sunny";
  //   if (key.includes("smoke")) return "Smoke";
  //   if (key.includes("mist")) return "Mist";
  //   return "default";
  // };

  // useEffect(() => {
  //   async function fetchWeather() {
  //     try {
  //       const _res = await axios.get(
  //         `https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&units=metric&appid=${
  //           import.meta.env.VITE_API_KEY
  //         }`,
  //       );
  //     } catch (err) {
  //       console.error("Error fetching weather:", err);
  //     }
  //   }
  //   fetchWeather();
  // }, []);

  const search = async () => {
    if (!inputSearch) return window.alert("Please enter a city name"); // prevent empty search
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputSearch}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;

      const response = await axios.get(url);
      const icon = allIcons[response.data.weather[0].icon] || clear;

      const _condition = response.data.weather[0].main; // "Clear", "Clouds", "Rain"
      // setWeatherData({
      //   temp: Math.floor(response.data.main.temp),
      //   location: response.data.name,
      //   icon: icon,
      //   description: response.data.weather[0].description,
      //   humidity: response.data.main.humidity,

      //   wind: response.data.wind.speed,
      //   pressure: response.data.main.pressure,
      //   visibility: response.data.visibility,

      //   sunrise: response.data.sys.sunrise,
      //   sunset: response.data.sys.sunset,
      // });

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
      });

      // console.log(response.data);
      // setWeather(normalizeWeather(condition)); // <-- update background state here
      setInputSearch("");
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handleSearch = (e) => {
    setInputSearch(e.target.value);
  };

  // const bgUrl = weatherBackgrounds[weather];
  // console.log(weatherBackgrounds[weather]);

  return (
    <div
      className=" min-h-screen bg-cover bg-center flex items-center justify-center rounded-2xl shadow-md"
      // style={{
      //   backgroundImage: `url(${bgUrl})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   minHeight: "100vh",
      // }}
    >
      {/* card container */}
      {/* <div className="bg-linear-to-r from-green-400 via-blue-300 to-yellow-200 animate-gradient shadow-xl rounded-2xl p-6"> */}
      <div className="bg-linear-to-r shadow-xl rounded-2xl p-6 bg-blue-200 ">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-600 tracking-wide">
          Weather App
        </h2>

        {/* search bar */}
        <div className="flex items-center border border-gray-300 gap-2 rounded-full px-3 py-2 w-full shadow-sm focus-within:ring-2 focus-within:ring-green-400">
          <input
            type="text"
            placeholder="Enter city name"
            className="pl-2 flex-1 border-none focus:outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
            value={inputSearch}
            onChange={handleSearch}
          />
          <button
            onClick={search}
            className="p-2 rounded-full hover:bg-green-100 transition-colors">
            <img
              src={search_icon}
              alt="search"
              className="h-5 w-5 text-gray-500"
            />
          </button>
          {/* current location button */}
          <button className="ml-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
            <FaMapMarkerAlt className="w-5 h-5" />
          </button>
        </div>

        {/* weather data display */}
        {weatherData && (
          <div className="mt-6 w-full max-w-3xl mx-auto px-4">
            {/* Location Heading */}
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              {weatherData.location}
            </h2>

            {/* Main Weather Display */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-blue-300 rounded-xl shadow-md">
              <img
                src={weatherData.icon}
                alt="weather_icon"
                className="h-28 w-28 sm:h-32 sm:w-32 drop-shadow-md"
              />
              <div className="text-center sm:text-left">
                <p className="text-lg font-medium capitalize text-white">
                  {weatherData.description}
                </p>
                <p className="text-5xl font-bold text-white">
                  {weatherData.temp}°C
                </p>
                <p className="text-sm font-medium text-white">
                  Humidity: {weatherData.humidity}%
                </p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="flex flex-col items-center bg-white/70 rounded-xl p-4 shadow-md">
                <img src={pressure} alt="pressure" className="h-6 w-6 mb-2" />
                <h6 className="text-base font-semibold">
                  {weatherData.pressure} hPa
                </h6>
                <p className="text-sm text-gray-600">Pressure</p>
              </div>

              <div className="flex flex-col items-center bg-white/70 rounded-xl p-4 shadow-md">
                <img src={wind} alt="wind" className="h-6 w-6 mb-2" />
                <h6 className="text-base font-semibold">
                  {weatherData.wind} km/h
                </h6>
                <p className="text-sm text-gray-600">Wind</p>
              </div>

              <div className="flex flex-col items-center bg-white/70 rounded-xl p-4 shadow-md">
                <img
                  src={visibility}
                  alt="visibility"
                  className="h-6 w-6 mb-2"
                />
                <h6 className="text-base font-semibold">
                  {weatherData.visibility} km
                </h6>
                <p className="text-sm text-gray-600">Visibility</p>
              </div>
            </div>

            {/* Sunrise & Sunset */}
            <div className="flex flex-col sm:flex-row justify-around items-center mt-8 gap-6 bg-white/70 rounded-xl p-6 shadow-md">
              <div className="flex flex-col items-center">
                <img src={sunrise} alt="sunrise" className="h-12 w-12 mb-2" />
                <h3 className="text-lg font-semibold">{weatherData.sunrise}</h3>
                <p className="text-sm text-gray-600">Sunrise</p>
              </div>

              <div className="flex flex-col items-center">
                <img src={sunset} alt="sunset" className="h-12 w-12 mb-2" />
                <h3 className="text-lg font-semibold">{weatherData.sunset}</h3>
                <p className="text-sm text-gray-600">Sunset</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
