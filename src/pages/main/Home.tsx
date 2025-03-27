import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelectors } from "src/hooks/useSelectors";
import UserObjProps from "src/interfaces/UserObjProps";
import { SwipeableViews } from "src/navigate/SwipeableViews";
import Layout from "src/pages/add/Layout";
import Board from "src/pages/board/Board";
import Auth from "src/pages/main/auth/Auth";
import Menu from "src/pages/main/menu/Menu";
import { changeBottomNavigation } from "src/stateSlices/bottomNavigationSlice";
import Add from "../add/Add";
import LayoutBoard from "../board/LayoutBoard";

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
            <Board userObj={userObj} borrow={true} />
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
            <LayoutBoard userObj={userObj} borrow={true} />
            // <SwipeableViews>
            //   <Notice userObj={userObj} borrow={true} />
            //   <Notice userObj={userObj} borrow={false} />
            // </SwipeableViews>
          )}
        </>
      )}
    </>
  );
}

export default Home;
