import { useSelector } from "react-redux"

const NavigationUser = ({ userObj, points }) => {
  const languages = useSelector((state) => state.languages.value)

  return (
    <div>
      <div className="max-w-[200px] max-h-[200px] overflow-hidden">
        {languages === 'ko' ?
          `좋은 날씨네요 `
          :
          `Nice Weather `
        }
        {userObj && `${userObj.displayName.length > 10 ? userObj.displayName.slice(0, 9) + '......' : userObj.displayName} ${languages === 'ko' ? '님' : ''}`}
      </div>
      {userObj ? <div>{languages === 'ko' ? '내 포인트: ' : 'My Points: '}{points}</div> : <div>{languages === 'ko' ? '로그인을 해 주세요' : 'Please Sign in'}</div>}
    </div>
  )
}

export default NavigationUser
