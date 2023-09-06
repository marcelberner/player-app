const fillDate = (value: number) => {
  return value < 10 ? "0" + value : value
}

export const getDate = (date: Date) => {
  const newDate = new Date(date)

  const day = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()

  return `${fillDate(day)}.${fillDate(month)}.${year}`
}
