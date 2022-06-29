const defaultConfig = {
  day: "numeric",
  weekday: "long",
  month: "long",
};

export function formatDate(date, language = "es", config = defaultConfig) {
  return new Intl.DateTimeFormat(language, config).format(date);
}

export function formatTemp(temp) {
  return `${Math.round(temp)}°`;
}

export function formatWeekList(rawData) {
  const weekList = [];
  let dayList = [];
  rawData.forEach((item, index) => {
    dayList.push(item);

    if ((index + 1) % 8 === 0) {
      weekList.push(dayList);
      dayList = [];
    }
  });
  return weekList;
}

export function formatHumidity(humidity) {
  return `${humidity}%`
}

export function formatWind(wind) {
  const windKm = Math.round(wind * 3.6)
  return `${windKm} Km-h`
}
