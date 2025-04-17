import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  useEffect,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import staticImage from "src/assets/blue.png";
import { dbservice } from "src/baseApi/serverbase";
import { useSelectors } from "src/hooks/useSelectors";
import Navigation from "src/pages/core/navigationTop/sideNavigation/Navigation";
import WeatherView from "src/pages/core/navigationTop/weatherView/WeatherView";
import ToggleTabs from "src/pages/core/ToggleTabs";
import { changeProfileColor } from "src/stateSlices/profileColorSlice";
import { changeProfileUrl } from "src/stateSlices/profileUrlSlice";
import NavigationTopCards from "./navigationTopCards/NavigationTopCards";
import NavigationTopLogOut from "./navigationTopLogOut/NavigationTopLogOut";
import NavigationTopMessages from "./navigationTopMessages/NavigationTopMessages";

interface Props {
  userObj: User | null;
}

const NavigationTop = ({ userObj }: Props) => {
  const bottomNavigation = useSelectors(
    (state) => state.bottomNavigation.value
  );
  const profileColor = useSelector((state) => state.profileColor.value);
  const profileUrl = useSelector((state) => state.profileUrl.value);
  const [sideNavigation, setSideNavigation] = useState(false);
  const handleSideNavigation = () => {
    setSideNavigation(!sideNavigation);
  };
  const storage = getStorage();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (userObj) {
  //     getDownloadURL(ref(storage, `${userObj?.uid}`))
  //       .then((url) => {
  //         dispatch(changeProfileUrl(url));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [userObj]);

  useEffect(() => {
    const setProfile = async () => {
      const docRef = doc(dbservice, `members/${userObj?.uid}`);
      const docSnap = await getDoc(docRef);
      const userColor = docSnap.data()?.profileColor || "#2196f3";
      const userImage = docSnap.data()?.profileImageUrl || "null";
      // dispatch(changeProfileColor(userColor));
      // dispatch(changeProfileUrl(userImage));
      const userProfileImage = docSnap.data()?.profileImage || false;
      const userDefaultProfile = docSnap.data()?.defaultProfile || '';
      dispatch(changeProfileColor(userColor));
      if (userProfileImage) {
        dispatch(changeProfileUrl(userImage));
      } else {
        dispatch(changeProfileUrl(userDefaultProfile));
      }
    };
    setProfile();
  }, [userObj]);

  return (
    <div className="shadow-md fixed z-50 bg-light-3 dark:bg-dark-3 truncate">
      <div className="flex justify-between w-screen">
        <Navigation
          userObj={userObj}
          handleSideNavigation={handleSideNavigation}
          sideNavigation={sideNavigation}
          uid={userObj ? userObj.uid : ''}
          profile={false}
          profileColor={userObj ? profileColor : 'profile-blue'}
          profileUrl={userObj ? profileUrl : staticImage}
          piazza={() => null}
        />
        {/* <div
          className="px-5 pt-1 cursor-pointer"
          onClick={() => {
            handleSideNavigation();
          }}
        >
          <Avatars
            uid={userObj ? userObj.uid : ''}
            profile={false}
            profileColor={userObj ? profileColor : 'profile-blue'}
            profileUrl={userObj ? profileUrl : staticImage}
            piazza={() => null}
          />
        </div> */}
        <div>
          {bottomNavigation % 2 === 0 && <ToggleTabs />}
          {bottomNavigation === 1 && (
            <>
              {userObj ?
                <div className='flex gap-5'>
                  <NavigationTopCards />
                  <NavigationTopMessages />
                </div>
                :
                <NavigationTopLogOut />
              }
            </>
          )}
        </div>
        <WeatherView />
      </div>
    </div >
  );
};

export default NavigationTop;
