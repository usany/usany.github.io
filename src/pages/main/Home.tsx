import { useEffect } from "react";
import Menu from "src/pages/Menu";
import Notice from "./Board";
import Layout from "src/pages/Layout";
import Auth from "src/pages/Auth";
import Add from "./Add";
import { SwipeableViews } from "src/navigate/SwipeableViews";
import { useDispatch } from "react-redux";
import { changeBottomNavigation } from "src/stateSlices/bottomNavigationSlice";
import UserObjProps from "src/interfaces/UserObjProps";
import { useSelectors } from "src/hooks/useSelectors";

function Home({ userObj }: UserObjProps) {
  const bottomNavigation = useSelectors(
    (state) => state.bottomNavigation.value
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (bottomNavigation === 5) {
      dispatch(changeBottomNavigation(1));
    }
  }, [userObj]);

  return (
    <>
      {userObj ? (
        <>
          {bottomNavigation === 0 && (
            <SwipeableViews>
              <Add userObj={userObj} borrow={true} />
              <Add userObj={userObj} borrow={false} />
            </SwipeableViews>
          )}
          {bottomNavigation === 1 && <Menu userObj={userObj} />}
          {bottomNavigation === 2 && (
            <Notice userObj={userObj} borrow={true} />
          )}
        </>
      ) : (
        <>
          {bottomNavigation === 0 && (
            <SwipeableViews>
              <Layout borrow={true} />
              <Layout borrow={false} />
            </SwipeableViews>
          )}
          {bottomNavigation === 1 && <Auth />}
          {bottomNavigation === 2 && (
            <SwipeableViews>
              <Notice userObj={userObj} borrow={true} />
              <Notice userObj={userObj} borrow={false} />
            </SwipeableViews>
          )}
        </>
      )}
    </>
  );
}

export default Home;
