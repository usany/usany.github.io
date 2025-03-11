const NavigationUser = ({ userObj, points }) => {
  return (
    <div>
      <div className="max-w-[200px] max-h-[200px] overflow-hidden">
        좋은 날씨네요 {userObj.displayName} 님
      </div>
      {userObj && <div>내 포인트: {points}</div>}
    </div>
  )
}

export default NavigationUser;
