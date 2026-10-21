import { useState } from "react";
import { CloudSun } from "lucide-react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  return (
    // Add app-shell in the main tag to see some changes
    <main className="min-h-screen w-full px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-3xl animate-fadeIn">
        <section className="glass-panel overflow-hidden rounded-3xl">
          <div className="mt-7 flex items-center justify-center gap-3 mb-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-lg shadow-sky-950/20">
              <CloudSun aria-hidden="true" className="h-6 w-6 text-sky-200" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">Atmos</p>
              <p className="text-xs tracking-[0.18em] text-slate-400 uppercase">
                Weather, made clear
              </p>
            </div>
          </div>
          <div className="px-5 pt-7 sm:px-9 sm:pt-9">
            {/* <div className="mb-6 text-center">
              <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-sky-200/80 uppercase">
                Local forecast
              </p>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Weather, at a glance
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Search for a city to see current conditions.
              </p>
            </div> */}

            <SearchBox
              inputSearch={inputSearch}
              setInputSearch={setInputSearch}
              setWeatherData={setWeatherData}
            />
          </div>
          {weatherData ? (
            <WeatherCard weatherData={weatherData} />
          ) : (
            <div className="mx-5 mb-5 mt-7 flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2.5 px-5 py-8 text-center sm:mx-9 sm:mb-9 sm:mt-8">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-300/10 text-sky-200">
                <CloudSun aria-hidden="true" className="h-9 w-9" />
              </div>
              {/* <h2 className="text-base font-medium text-slate-200">
                Your weather starts here
              </h2> */}
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                Enter a city above to see its temperature, conditions, and
                essential details.
              </p>
            </div>
          )}
        </section>

        <footer className="mt-5 text-center text-xs text-white">
          Current conditions powered by OpenWeather
        </footer>
      </div>
    </main>
  );
};

export default App;
