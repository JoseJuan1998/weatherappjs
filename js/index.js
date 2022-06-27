import currentWeather from './current-weather.js'
import { ViewportSize } from './utils/viewport.js'

const $app = document.querySelector('#app')
const $loader = document.querySelector('#loading')

ViewportSize($app)
ViewportSize($loader)

currentWeather()