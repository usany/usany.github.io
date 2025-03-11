import Modes from "src/Modes";
import NavigationUser from "../navigationUser/NavigationUser";

const NavigationSignedIn = ({ userObj, points }) => {
  return (
    <div className="flex border-b border-light-3 dark:border-dark-3 p-5 gap-5">
      <NavigationUser userObj={userObj} points={points} />
      <Modes />
    </div>
  )
}

export default NavigationSignedIn;
