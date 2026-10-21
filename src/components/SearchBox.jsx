import axios from "axios";
import { images } from "../assets/images";
import { LoaderCircle, Search } from "lucide-react";
import { useState } from "react";

const SearchBox = ({ inputSearch, setInputSearch, setWeatherData }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const allIcons = {
    "01d": `${images.clear}`,
    "01n": `${images.clear}`,
    "02d": `${images.cloud}`,
    "02n": `${images.cloud}`,
    "03d": `${images.cloud}`,
    "03n": `${images.cloud}`,
    "04d": `${images.cloud}`,
    "04n": `${images.cloud}`,
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
    if (isLoading) return;

    const city = inputSearch.trim();
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;
      const response = await axios.get(url);

      const icon = allIcons[response.data.weather[0].icon] || `${images.clear}`;

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
    } catch (err) {
      const status = err?.response?.status;
      setWeatherData(null);

      switch (status) {
        case 404:
          setError("City not found.");
          break;

        case 401:
          setError("API authentication failed.");
          break;

        case 429:
          setError("Too many requests. Please try later.");
          break;

        default:
          setError(
            err?.response
              ? "Unable to retrieve weather. Please try again."
              : "Network error. Check your connection and try again.",
          );
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setInputSearch(e.target.value);
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      search();
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="mx-auto flex w-full max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-2 pl-4 shadow-lg shadow-slate-950/20 transition focus-within:border-sky-300/40 focus-within:ring-4 focus-within:ring-sky-300/10">
        <input
          type="text"
          placeholder="Search a city..."
          aria-label="City name"
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none sm:text-base"
          value={inputSearch}
          onChange={handleSearch}
        />
        <button
          type="button"
          onClick={search}
          disabled={isLoading}
          aria-label={isLoading ? "Searching weather" : "Search weather"}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-100 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer disabled:cursor-wait disabled:opacity-70">
          {isLoading ? (
            <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
          ) : (
            <Search aria-hidden="true" className="h-4 w-4" />
          )}
          <span>{isLoading ? "Searching" : "Search"}</span>
        </button>
      </div>

      {error ? (
        <div role="alert" className="mt-3 text-center text-sm text-rose-300">
          {error}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBox;
