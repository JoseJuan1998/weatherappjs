// import weather from "../data/current-weather.js";
import { formatDate, formatTemp } from "./utils/format-data.js";
import { weatherConditionsCodes } from "./constants.js";
import { getCurrentPosition } from "./geolocation.js";
import { getWeather } from "./services/weather.js";

function showCurrentWeather($app, $loader) {
  $app.hidden = false;
  $loader.hidden = true;
}

function setCurrentCity($el, city) {
  $el.textContent = city;
}

function setCurrentDate($el) {
  const date = new Date();
  const dateFormat = formatDate(date);
  $el.textContent = dateFormat;
}

function setCurrentTemp($el, temp) {
  $el.textContent = formatTemp(temp);
}

function solarStatus(rise, set) {
  const currentTime = new Date().getHours();
  if (currentTime >= rise && currentTime < set) return "morning";

  return "night";
}

function setBackgound($el, conditionCode, solarStatus) {
  const weatherConditions = weatherConditionsCodes[conditionCode] ?? "drizzle";
  const match = window.matchMedia(
    "(-webkit-min-device-pixel-ratio: 2)"
  ).matches;
  const resolution = match ? "@2x" : "";
  $el.style.backgroundImage = `url(images/${solarStatus}-${weatherConditions}${resolution}.jpg)`;
}

function configCurrentWeather(weather) {
  const city = weather.name;
  const temp = weather.main.temp;
  const conditions = weather.weather[0].main;
  const sunriseTime = new Date(weather.sys.sunrise * 1000);
  const sunsetTime = new Date(weather.sys.sunset * 1000);
  const $currentWeatherCity = document.querySelector("#current-weather-city");
  const $currentWeatherDate = document.querySelector("#current-weather-date");
  const $currentWeatherTemp = document.querySelector("#current-weather-temp");
  const $app = document.querySelector("#app");
  const $loader = document.querySelector("#loading");
  // loader
  showCurrentWeather($app, $loader);
  // date
  setCurrentCity($currentWeatherCity, city);
  setCurrentDate($currentWeatherDate);
  // temp
  setCurrentTemp($currentWeatherTemp, temp);
  // background
  setBackgound(
    $app,
    conditions,
    solarStatus(sunriseTime.getHours(), sunsetTime.getHours())
  );
}

async function currentWeather() {
  try {
    const { latitude, longitude } = await getCurrentPosition();
    const data = await getWeather(latitude, longitude, "weather");
    configCurrentWeather(data);
  } catch (error) {
    console.log(error);
  }
}

export default currentWeather;
