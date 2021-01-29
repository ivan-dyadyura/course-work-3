export function useSetDate (separator = '-', period = 0) {
  separator.toString()

  let date = new Date()
  date.setDate(date.getDate() + period)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  date = year + separator + month + separator + day

  return date
}
