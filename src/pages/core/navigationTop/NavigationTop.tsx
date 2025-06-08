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
import useLargeMedia from "src/hooks/useLargeMedia";
import { useSelectors } from "src/hooks/useSelectors";
import Navigation from "src/pages/core/navigationTop/sideNavigation/Navigation";
import WeatherView from "src/pages/core/navigationTop/weatherView/WeatherView";
import ToggleTabs from "src/pages/core/ToggleTabs";
import { changeProfileColor } from "src/stateSlices/profileColorSlice";
import { changeProfile } from "src/stateSlices/profileSlice";
import { changeProfileUrl } from "src/stateSlices/profileUrlSlice";
import useScroll from "../useScroll";
import NavigationScroll from "./NavigationScroll";
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
  const [renderDelayed, setRenderDelayed] = useState(false)
  setTimeout(() => setRenderDelayed(true), 250)
  // const [user, setUser] = useState<DocumentData | undefined>(undefined)
  const profile = useSelectors(state => state.profile.value)
  const handleSideNavigation = () => {
    setSideNavigation(!sideNavigation);
  };
  const scrollNavigation = useSelectors(state => state.scrollNavigation.value)
  const storage = getStorage();
  const dispatch = useDispatch();
  const largeMedia = useLargeMedia()
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
  // }, [userObj])
  useEffect(() => {
    const setProfile = async () => {
      const docRef = doc(dbservice, `members/${userObj?.uid}`);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data()
      dispatch(changeProfile(userData))
      // setUser(userData)
      const userColor = docSnap.data()?.profileColor || "#2196f3";
      const userImage = docSnap.data()?.profileImageUrl || "null";
      // dispatch(changeProfileColor(userColor));
      // dispatch(changeProfileUrl(userImage));
      const userProfileImage = docSnap.data()?.profileImage || false;
      const userDefaultProfile = docSnap.data()?.defaultProfile || 'null';
      dispatch(changeProfileColor(userColor));
      // console.log(userProfileImage)
      if (userProfileImage) {
        dispatch(changeProfileUrl(userImage));
      } else {
        dispatch(changeProfileUrl(userDefaultProfile));
      }
    };
    setProfile();
  }, [userObj]);
  useScroll()
  console.log(profile)
  const scrollLocation = ['/', '/add', '/board'].indexOf(location.pathname) === -1
  return (
    <div className="shadow-md fixed z-50 bg-light-2 dark:bg-dark-2 rounded truncate">
      {renderDelayed &&
        <div className="flex justify-between w-screen items-center">
          <Navigation
            user={profile}
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
          <div className={`flex ${!largeMedia && 'flex-col'} items-center`}>
            {largeMedia && scrollNavigation && scrollLocation &&
              <NavigationScroll />
            }
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
            {!largeMedia && scrollNavigation && scrollLocation &&
              <NavigationScroll />
            }
          </div>
          <WeatherView />
        </div>
      }
    </div>
  );
};

export default NavigationTop;
