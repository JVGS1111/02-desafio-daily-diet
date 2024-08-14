import dayjs from 'dayjs'

export function checkValidDate(date: string) {
  const parsedDate = dayjs(date)

  const hasTime = parsedDate.format('HH:mm:ss') !== '00:00:00'

  return parsedDate.isValid() && hasTime
}
