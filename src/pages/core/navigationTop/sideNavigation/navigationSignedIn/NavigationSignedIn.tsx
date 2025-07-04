import Modes from 'src/pages/core/navigationTop/sideNavigation/Modes'
import NavigationUser from '../navigationUser/NavigationUser'

const NavigationSignedIn = ({ userObj, points }) => {
  return (
    <div className="flex justify-between border-b border-light-3 dark:border-dark-3 p-5 gap-5">
      <NavigationUser userObj={userObj} points={points} />
      <Modes userObj={userObj} />
    </div>
  )
}

export default NavigationSignedIn
