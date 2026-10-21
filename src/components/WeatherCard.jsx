import {
  Eye,
  Gauge,
  MapPin,
  Sunrise,
  Sunset,
  Wind,
  Droplets,
} from "lucide-react";

const WeatherCard = ({ weatherData }) => {
  const metrics = [
    {
      label: "Humidity",
      value: `${weatherData.humidity}%`,
      icon: Droplets,
    },
    {
      label: "Wind",
      value: `${weatherData.wind} km/h`,
      icon: Wind,
    },
    {
      label: "Pressure",
      value: `${weatherData.pressure} hPa`,
      icon: Gauge,
    },
    {
      label: "Visibility",
      value: `${weatherData.visibility} km`,
      icon: Eye,
    },
    {
      label: "Sunrise",
      value: weatherData.sunrise,
      icon: Sunrise,
    },
    {
      label: "Sunset",
      value: weatherData.sunset,
      icon: Sunset,
    },
  ];

  return (
    <div className="px-5 pb-6 pt-6 sm:px-9 sm:pb-9 sm:pt-8">
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-sky-300/10 via-white/4 to-indigo-300/10 p-5 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-sky-300/10 blur-3xl"
        />
        <div className="relative flex flex-col items-center justify-around gap-5 text-center sm:flex-row sm:text-left">
          <div className="order-2 sm:order-1">
            <p className="mb-2 flex items-center justify-center gap-2 text-sm font-medium text-slate-300 sm:justify-start">
              <MapPin aria-hidden="true" className="h-4 w-4 text-sky-200" />
              {weatherData.location}, {weatherData.country}
            </p>
            {/* <p className="text-sm capitalize text-slate-400">
              {weatherData.description}
            </p> */}
            <p className="mt-1 text-6xl font-light tracking-[-0.07em] text-white sm:text-7xl">
              {weatherData.temp}
              <span className="ml-1 align-top text-3xl font-normal text-slate-300">
                ° C
              </span>
            </p>
            <p className="mt-5 text-xs font-medium tracking-[0.16em] text-slate-500 uppercase">
              {weatherData.description}
            </p>
          </div>

          <img
            src={weatherData.icon}
            alt={weatherData.description}
            className="order-1 h-32 w-32 object-contain drop-shadow-[0_12px_30px_rgba(125,211,252,0.2)] sm:order-2 sm:h-40 sm:w-40"
          />
        </div>
      </section>

      <section className="mt-6" aria-label="Weather details">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-200">
            Today's details
          </h2>
          <span className="text-xs text-slate-500">Live conditions</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.label}
                className="rounded-2xl border cursor-pointer flex flex-col items-center border-white/8 bg-white/[0.035] p-4 transition duration-200 hover:border-sky-200/20 hover:bg-white/6 sm:p-5">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-300/10 text-sky-200">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </div>
                <p className="text-xs text-slate-400">{metric.label}</p>
                <p className="mt-1 text-base font-semibold tracking-tight text-slate-100 sm:text-lg">
                  {metric.value}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default WeatherCard;
