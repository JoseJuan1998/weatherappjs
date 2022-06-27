import { API_KEY, BASE_API } from "../constants.js";

export function getCurrentWeather(lat, lon) {
  return fetch(`${BASE_API}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => data);
}
 