import UserObjProps from "src/interfaces/UserObjProps";
import { SwipeableViews } from "src/navigate/SwipeableViews";
import Add from "./Add";
import Layout from "./Layout";

function Adds({ userObj }: UserObjProps) {
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
