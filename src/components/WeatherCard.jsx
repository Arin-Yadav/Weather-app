import React from "react";
import visibility from "../assets/visibility_icon.png";
import wind from "../assets/wind_icon.png";
import pressure from "../assets/pressure.png";
import sunrise from "../assets/sunrise.png";
import sunset from "../assets/sunset.png";
import humidity from "../assets/humidity.png";

const WeatherCard = ({ weatherData }) => {
  return (
    weatherData && (
      <div className="mt-6 w-full max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 py-6 rounded-3xl bg-white/20 backdrop-blur-lg shadow-xl space-y-6">
        {/* Location Heading */}
        <h2 className="text-xl sm:text-3xl font-bold text-center mb-2 text-white drop-shadow-md">
          {weatherData.location}, {weatherData.country}
        </h2>

        {/* Main Weather Display */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <img
            src={weatherData.icon}
            alt="weather_icon"
            className="h-24 w-24 sm:h-32 sm:w-32 drop-shadow-lg"
          />
          <div className="text-center sm:text-left text-white">
            <p className="text-base sm:text-lg capitalize">
              {weatherData.description}
            </p>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              {weatherData.temp}°C
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="flex overflow-x-auto px-2 gap-4 mt-8 snap-x snap-mandatory pb-4 scroll-smooth metrics-scroll scrollbar-track-transparent">
          {[
            {
              label: "Humidity",
              value: `${weatherData.humidity}%`,
              icon: humidity,
            },
            {
              label: "Pressure",
              value: `${weatherData.pressure} hPa`,
              icon: pressure,
            },
            { label: "Wind", value: `${weatherData.wind} km/h`, icon: wind },
            {
              label: "Visibility",
              value: `${weatherData.visibility} km`,
              icon: visibility,
            },
            {
              label: "Sunrise",
              value: `${weatherData.sunrise}`,
              icon: sunrise,
            },
            { label: "Sunset", value: `${weatherData.sunset}`, icon: sunset },
          ].map((metric, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 items-center justify-center bg-white/30 rounded-xl shadow-md text-white p-4 shrink-0 snap-center 
                 min-w-20 sm:min-w-28
                 h-32 sm:h-36 md:h-40 transition-transform duration-300 hover:scale-105 mb-2">
              <div className="flex flex-col justify-center items-center">
                <img
                  src={metric.icon}
                  alt={metric.label}
                  className="h-8 w-8 md:h-12 md:w-12 mb-2"
                />
                <p className="text-sm sm:text-base text-gray-900 text-center">
                  {metric.label}
                </p>
              </div>
              <h6 className="text-md sm:text-xl text-white text-center">
                {metric.value}
              </h6>
            </div>
          ))}
        </div>

        {/* Sunrise & Sunset */}
        {/* <div className="flex flex-col sm:flex-row justify-around items-center mt-8 gap-6 bg-white/30 rounded-xl p-6 shadow-md text-white">
          <div className="flex flex-col items-center">
            <img src={sunrise} alt="sunrise" className="h-10 w-10 mb-2" />
            <h3 className="text-lg font-semibold">{weatherData.sunrise}</h3>
            <p className="text-sm">Sunrise</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={sunset} alt="sunset" className="h-10 w-10 mb-2" />
            <h3 className="text-lg font-semibold">{weatherData.sunset}</h3>
            <p className="text-sm">Sunset</p>
          </div>
        </div> */}
      </div>
    )
  );
};

export default WeatherCard;
