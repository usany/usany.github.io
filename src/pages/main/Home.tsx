import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelectors } from "src/hooks/useSelectors";
import UserObjProps from "src/interfaces/UserObjProps";
import { SwipeableViews } from "src/navigate/SwipeableViews";
import Layout from "src/pages/add/Layout";
import Notice from "src/pages/board/Board";
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
  // const tabs = useSelector((state: TabsRootState) => state.tabs)
  // const [profileUrl, setProfileUrl] = useState(null)

  // useEffect(() => {
  //     const userSetting = async () => {
  //         const userRef = doc(dbservice, `members/${userObj?.uid}`)
  //         const userSnap = await getDoc(userRef)
  //         const user = userSnap.data()
  //         getDownloadURL(ref(storage, userObj.uid))
  //         .then((url) => {
  //             setProfileUrl(url)
  //         })
  //         .catch((error) => {
  //         console.log(error)
  //         });
  //         if (!user && userObj) {
  //             console.log(profileUrl)
  //             await setDoc(userRef, {
  //                 uid: userObj.uid,
  //                 displayName: userObj.displayName,
  //                 points: 0,
  //                 profileColor: 'profile-lime',
  //                 profileImage: null,
  //                 profileImageUrl: profileUrl,
  //                 followerNum: 0,
  //                 followingNum: 0,
  //                 followers: [],
  //                 followings: [],
  //                 messagingToken: null
  //             })
  //             const storageRef = ref(storage, userObj.uid);
  //             uploadString(storageRef, 'null', 'raw').then(() => {
  //                 console.log('Uploaded a blob or file!');
  //             });
  //         }
  //     }
  //     userSetting()
  // }, [userObj])
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
            // <SwipeableViews>
            //   <Notice userObj={userObj} borrow={true} />
            //   <Notice userObj={userObj} borrow={false} />
            // </SwipeableViews>
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
