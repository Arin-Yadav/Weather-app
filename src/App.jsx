import { useState } from "react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  return (
    <div className="flex items-center justify-center h-screen w-full py-2 px-2">
      <div className="w-full animate-fadeIn md:max-w-xl lg:max-w-2xl rounded-xl py-4 px-4 overflow-hidden bg-linear-to-br from-blue-400 via-blue-500 to-indigo-600 text-white">
        <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-center mb-6 sm:mb-8 tracking-wide drop-shadow-lg">
          Weather App
        </h2>

        {/* search bar */}
        <SearchBox
          inputSearch={inputSearch}
          setInputSearch={setInputSearch}
          setWeatherData={setWeatherData}
        />

        {/* weather data display */}
        {weatherData ? (
          // <div className="animate-fadeIn">
          // </div>
          <WeatherCard weatherData={weatherData} />
        ) : (
          <div className="mt-6 flex flex-col items-center text-white/80">
            <p className="text-base sm:text-lg md:text-xl text-white text-center px-4">
              Search for a city to see the weather
            </p>
            <img
              src="/default_image.webp"
              fetchPriority="high"
              height={128}
              width={128}
              alt="default-image"
              className="mb-4 opacity-100 h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
