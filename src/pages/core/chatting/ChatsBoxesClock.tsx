const ChatsBoxesClock = ({ clockValue }) => {
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
