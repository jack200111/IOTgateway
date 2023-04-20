export default function getCurrentDate () {
  const date = new Date()
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const options = {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }
  return new Intl.DateTimeFormat([], options).format(date).replaceAll('/', '-')
}
setInterval(() => {
//   const currentTime = getCurrentTime()
//   console.log(currentTime)
}, 1000)
