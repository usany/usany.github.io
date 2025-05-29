const ChatsBoxesClock = ({ message }) => {
  const clock = new Date(message?.messageClock)
  let clockValue
  if (typeof clock.getFullYear() === 'number') {
    clockValue =
      clock.getFullYear().toString() +
      '-' +
      messageMonth +
      '-' +
      messageDate +
      ' ' +
      (languages === 'ko' ? messageAmpm : '') +
      ' ' +
      messageHours +
      ':' +
      (clock.getMinutes() < 10 ? '0' : '') +
      clock.getMinutes() +
      (languages === 'en' ? (messageAmpm === '오전' ? 'am' : 'pm') : '')
  }
  return (
    <>
      {clockValue.length > 10 && (
        <div className="flex flex-col px-3">
          <div className="truncate flex justify-end">{clockValue}</div>
        </div>
      )}
    </>
  )
}

export default ChatsBoxesClock
