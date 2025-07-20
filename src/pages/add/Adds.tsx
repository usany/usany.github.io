import { useSelectors } from "src/hooks/useSelectors";
import UserObjProps from "src/interfaces/UserObjProps";
import { SwipeableViews } from "src/pages/core/SwipeableViews";
import Add from "./Add";
import Layout from "./Layout";

function Adds({ userObj }: UserObjProps) {
  const userCertificated = useSelectors(state => state.userCertificated.value)
  return (
    <>
      {userObj && userCertificated ?
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
