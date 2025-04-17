import { useDispatch } from 'react-redux'
import Modes from 'src/pages/core/navigationTop/sideNavigation/Modes'
import NavigationUser from '../navigationUser/NavigationUser'

const NavigationSignedOut = ({ userObj, points, checkbox }) => {
  const dispatch = useDispatch()

  return (
    <div className="flex justify-between border-b border-light-3 dark:border-dark-3 p-5 gap-5 w-[350px]">
      {/* <div className="flex border-b border-light-3 dark:border-dark-3 p-5">
        <div className="max-w-[200px] max-h-[200px] overflow-hidden">
          좋은 날씨네요
        </div>
        <div
          className="flex justify-center"
          onClick={() => {
            dispatch(changeBottomNavigation(1));
            checkbox();
          }}
        >
          로그인을 해 주세요
        </div>
      </div> */}
      <NavigationUser userObj={userObj} points={points} />
      <Modes />
      {/* <div className='flex items-center'>
      </div> */}
    </div>
  )
}

export default NavigationSignedOut
