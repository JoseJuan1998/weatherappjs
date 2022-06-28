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
  const weekList = []
  let dayList = []
  rawData.forEach((item, index) => {
    dayList.push(item)

    if((index + 1) % 8 === 0) {
      weekList.push(dayList.slice(0,6))
      dayList = []
    }
  })
  return weekList
}