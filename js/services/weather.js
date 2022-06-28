import { API_KEY, BASE_API } from "../constants.js";

export async function getWeather(lat, lon, weather) {
  const response = await fetch(
    `${BASE_API}${weather}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();

  return data;
}
