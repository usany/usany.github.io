import Modes from "src/navigate/Modes";
import { useDispatch, useSelector } from "react-redux";
import { changeBottomNavigation } from "src/stateSlices/bottomNavigationSlice";

const NavigationSignedOut = ({ checkbox }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex border-b border-light-3 dark:border-dark-3">
      <div className="p-5">
        <div className="max-w-[200px] max-h-[200px] overflow-hidden">
          좋은 날씨네요
        </div>
        {/* <div className="flex justify-center">좋은 날씨네요</div> */}
        <div
          className="flex justify-center"
          onClick={() => {
            dispatch(changeBottomNavigation(1));
            checkbox();
          }}
        >
          로그인을 해 주세요
        </div>
      </div>
      <Modes />
    </div>
  )
}

export default NavigationSignedOut;
