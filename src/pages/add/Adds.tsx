import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelectors } from "src/hooks/useSelectors";
import UserObjProps from "src/interfaces/UserObjProps";
import { SwipeableViews } from "src/navigate/SwipeableViews";
import { changeBottomNavigation } from "src/stateSlices/bottomNavigationSlice";
import Add from "./Add";
import Layout from "./Layout";

function Adds({ userObj }: UserObjProps) {
  const bottomNavigation = useSelectors(
    (state) => state.bottomNavigation.value
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (bottomNavigation === 5) {
      dispatch(changeBottomNavigation(0));
    }
  }, [userObj]);
  return (
    <>
      {userObj ?
        <SwipeableViews>
          <Add userObj={userObj} borrow={true} />
          <Add userObj={userObj} borrow={false} />
        </SwipeableViews>
        :
        <SwipeableViews>
          <Layout borrow={true} />
          <Layout borrow={false} />
        </SwipeableViews>
      }
    </>
  );
}

export default Adds;
