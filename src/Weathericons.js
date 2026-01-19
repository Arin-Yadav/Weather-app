// WeatherIcons.js
import clear from "./assets/clear.png";
import cloud from "./assets/cloud.png";
import drizzle from "./assets/drizzle.png";
import mist from "./assets/mist2.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import wind from './assets/wind.png'

const weatherIconMap = {
  Clear: clear,
  Clouds: cloud,
  Drizzle: drizzle,
  Rain: rain,
  Snow: snow,
  Mist: mist,       // you can use humidity.png for mist/fog
  Thunderstorm: wind    // or add a thunderstorm.png if you have one
};

export default weatherIconMap;
