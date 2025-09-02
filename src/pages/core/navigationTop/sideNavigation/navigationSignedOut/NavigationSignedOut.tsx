import Modes from 'src/pages/core/navigationTop/sideNavigation/Modes'
import NavigationUser from '../navigationUser/NavigationUser'
import { User } from 'firebase/auth'

const NavigationSignedOut = ({
  userObj,
  points,
}: {
  userObj: User | null
  points: number
}) => {
  return (
    <div className="flex justify-between border-b border-light-3 dark:border-dark-3 p-5 gap-5 w-[350px]">
      <NavigationUser points={points} />
      <Modes userObj={userObj} />
    </div>
  )
}

export default NavigationSignedOut
