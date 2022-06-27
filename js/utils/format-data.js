const defaultConfig = {
  day: 'numeric',
  weekday: 'long',
  month: 'long'
}

export function formatDate(date, language = 'es',  config = defaultConfig) {
  return new Intl.DateTimeFormat(language, config).format(date)
}

export function formatTemp(temp) {
  return `${Math.round(temp)}°`
}