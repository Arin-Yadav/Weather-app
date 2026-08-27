import visibility from "../assets/visibility_icon.png";
import wind from "../assets/wind_icon.png";
import pressure from "../assets/pressure.png";
import sunrise from "../assets/sunrise.png";
import sunset from "../assets/sunset.png";
import humidity from "../assets/humidity.png";

const WeatherCard = ({ weatherData }) => {
  return (
    weatherData && (
      <div className="w-full sm:max-w-2xl lg:max-w-3xl sm:px-6 py-2 rounded-xl">
        {/* Main Weather Display */}
        <div className="flex flex-col gap-2 items-center py-5 justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white drop-shadow-md">
            {weatherData.location}, {weatherData.country}
          </h2>
          <div className="flex items-center justify-center gap-3 sm:gap-5">
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
        </div>

        {/* Metrics Grid */}
        <div className="flex overflow-x-auto gap-4 mt-5 w-full snap-x snap-mandatory scroll-smooth metrics-scroll scrollbar-track-transparent pb-4 px-2 py-2">
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
              className="flex flex-col gap-2 items-center justify-center rounded-xl shadow-md bg-white shrink-0 snap-center w-32 h-full transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col justify-center h-24 w-20 items-center">
                <img
                  src={metric.icon}
                  alt={metric.label}
                  className="h-full w-full object-contain mb-2"
                />
              </div>
              <p className="text-sm sm:text-base font-semibold text-gray-900 text-center">
                {metric.label}
              </p>
              <h6 className="text-md sm:text-base text-gray-900 text-center">
                {metric.value}
              </h6>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default WeatherCard;
