import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
  Suspense,
  lazy,
} from "react";
import WeatherView from "src/navigate/WeatherView";
import Navigation from "src/navigate/Navigation";
import Points from "src/pages/search/Points";
import Avatar from "@mui/material/Avatar";
import ToggleTabs from "src/pages/core/ToggleTabs";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { auth, dbservice } from "src/baseApi/serverbase";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { CreditCard } from "lucide-react";
import { MessageCircle, Minimize2, Maximize2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  cardAccordionReducer,
  change,
} from "src/stateSlices/cardAccordionSlice";
import { changeBottomNavigation } from "src/stateSlices/bottomNavigationSlice";
import { changeMessageAccordion } from "src/stateSlices/messageAccordionSlice";
import { changeProfileUrl } from "src/stateSlices/profileUrlSlice";
import { changeProfileColor } from "src/stateSlices/profileColorSlice";
import { changeProfileImage } from "src/stateSlices/profileImageSlice";
import { User } from "firebase/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Avatars from "src/pages/core/Avatars";
import staticImage from "src/assets/blue.png";
import { useSelectors } from "src/hooks/useSelectors";

// const Puller = styled('div')(({ theme }) => ({
//     width: 30,
//     height: 6,
//     backgroundColor: grey[300],
//     borderRadius: 3,
//     position: 'absolute',
//     top: 8,
//     left: 'calc(50% - 15px)',
//     ...theme.applyStyles('dark', {
//       backgroundColor: grey[900],
//     }),
//   }));

interface Props {
  userObj: User | null;
}

const HeaderViews = ({ userObj }: Props) => {
  const bottomNavigation = useSelectors(
    (state) => state.bottomNavigation.value
  );
  const profileColor = useSelector((state) => state.profileColor.value);
  const profileImage = useSelector((state) => state.profileImage.value);
  const [sideNavigation, setSideNavigation] = useState(false);
  const handleSideNavigation = () => {
    setSideNavigation(!sideNavigation);
  };
  const storage = getStorage();
  const cardAccordion = useSelector((state) => state.cardAccordion.value);
  const messageAccordion = useSelector((state) => state.messageAccordion.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userObj) {
      getDownloadURL(ref(storage, `${userObj?.uid}`))
        .then((url) => {
          dispatch(changeProfileUrl(url));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userObj]);

  useEffect(() => {
    const setProfile = async () => {
      const docRef = doc(dbservice, `members/${userObj?.uid}`);
      const docSnap = await getDoc(docRef);
      const userColor = docSnap.data()?.profileColor || "#2196f3";
      const userImage = docSnap.data()?.profileImageUrl || "null";
      dispatch(changeProfileColor(userColor));
      dispatch(changeProfileImage(userImage));
    };
    setProfile();
  }, [userObj]);
  // const profile = useMemo(() => {
  //   return (
  //     <div>
  //       {profileImage ? (
  //         <div
  //           onClick={() => {
  //             handleSideNavigation();
  //           }}
  //         >
  //           {userObj ? (
  //             <Avatars
  //               profile={false}
  //               profileColor={profileColor}
  //               profileImage={profileImage}
  //               fallback={userObj.displayName ? userObj.displayName[0] : ""}
  //             />
  //           ) : (
  //             <Avatars
  //               profile={false}
  //               profileColor={"profile-blue"}
  //               profileImage={staticImage}
  //               fallback={""}
  //             />
  //           )}
  //         </div>
  //       ) : (
  //         <div>loading</div>
  //       )}
  //     </div>
  //   );
  // }, []);
  return (
    <>
      <Navigation
        userObj={userObj}
        handleSideNavigation={handleSideNavigation}
        sideNavigation={sideNavigation}
      />
      <div className="flex justify-between w-screen">
        <div className="px-5 pt-1">
          <div>
            {profileImage ? (
              <div
                onClick={() => {
                  handleSideNavigation();
                }}
              >
                {userObj ? (
                  <Avatars
                    profile={false}
                    profileColor={profileColor}
                    profileUrl={profileImage}
                    fallback={userObj.displayName ? userObj.displayName[0] : ""}
                  />
                ) : (
                  <Avatars
                    profile={false}
                    profileColor={"profile-blue"}
                    profileUrl={staticImage}
                    fallback={""}
                  />
                )}
              </div>
            ) : (
              <div>loading</div>
            )}
          </div>
        </div>
        <div>
          {bottomNavigation === 0 && <ToggleTabs />}
          {userObj && bottomNavigation === 1 && (
            <>
              <div className="flex w-1/2 gap-3">
                <div className="flex flex-col">
                  {/* <FormControlLabel
                                        sx={{height: '45px'}}
                                        control={
                                            <Checkbox
                                                checked={cardAccordion}
                                                onClick={() => dispatch(change())}
                                            />
                                        }
                                        label={cardAccordion ? <CreditCard color='#2196f3' /> : <CreditCard />}
                                    /> */}
                  <div className="flex justify-center w-16 h-[45px] pt-3">
                    {cardAccordion ? (
                      <CreditCard
                        color="#2196f3"
                        onClick={() => dispatch(change())}
                      />
                    ) : (
                      <CreditCard onClick={() => dispatch(change())} />
                    )}
                  </div>
                  <Divider
                    sx={{
                      width: "100%",
                      height: "1px",
                      backgroundColor: cardAccordion && "#2196f3",
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  {/* <FormControlLabel
                                        sx={{height: '45px'}}
                                        control={
                                            <Checkbox
                                                checked={messageAccordion}
                                                onClick={() => dispatch(changeMessageAccordion())}
                                            />
                                        }
                                        label={messageAccordion ? <MessageCircle color='#2196f3' /> : <MessageCircle />}
                                    /> */}
                  <div className="flex justify-center w-16 h-[45px] pt-3">
                    {messageAccordion ? (
                      <MessageCircle
                        color="#2196f3"
                        onClick={() => dispatch(changeMessageAccordion())}
                      />
                    ) : (
                      <MessageCircle
                        onClick={() => dispatch(changeMessageAccordion())}
                      />
                    )}
                  </div>
                  <Divider
                    sx={{
                      width: "100%",
                      height: "1px",
                      backgroundColor: messageAccordion && "#2196f3",
                    }}
                  />
                </div>
              </div>
            </>
          )}
          {bottomNavigation === 2 && <ToggleTabs />}
          {!userObj && bottomNavigation === 1 && (
            <div>
              <Link to="/">
                <div className="pt-5 min-w-36">로그인을 해 주세요</div>
              </Link>
              <Divider sx={{ width: "100%" }} />
            </div>
          )}
        </div>
        <div>
          <WeatherView />
        </div>
      </div>
    </>
  );
};

export default HeaderViews;
