const NavigationUser = ({ userObj, points }) => {
  let displayName = userObj.displayName
  if (displayName.length > 10) {
    displayName = displayName.slice(0, 10) + '......'
  }
  return (
    <div>
      <div className="max-w-[300px] max-h-[200px] overflow-hidden">
        좋은 날씨네요 {displayName} 님
      </div>
      {userObj && <div>내 포인트: {points}</div>}
    </div>
  )
}

export default NavigationUser;
