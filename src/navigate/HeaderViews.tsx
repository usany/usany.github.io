import Divider from "@mui/material/Divider";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { CreditCard, MessageCircle } from "lucide-react";
import {
  useEffect,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import staticImage from "src/assets/blue.png";
import static01 from "src/assets/blue01.png";
import static02 from "src/assets/blue02.png";
import { dbservice } from "src/baseApi/serverbase";
import { useSelectors } from "src/hooks/useSelectors";
import Navigation from "src/navigate/Navigation";
import WeatherView from "src/navigate/WeatherView";
import Avatars from "src/pages/core/Avatars";
import ToggleTabs from "src/pages/core/ToggleTabs";
import {
  cardOff,
  cardOn
} from "src/stateSlices/cardAccordionSlice";
import { messageOff, messageOn } from "src/stateSlices/messageAccordionSlice";
import { changeProfileColor } from "src/stateSlices/profileColorSlice";
import { changeProfileUrl } from "src/stateSlices/profileUrlSlice";

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

const profileImageArray = [static01, static02]

interface Props {
  userObj: User | null;
}

const HeaderViews = ({ userObj }: Props) => {
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
  const cardAccordion = useSelector((state) => state.cardAccordion.value);
  const messageAccordion = useSelector((state) => state.messageAccordion.value);
  const dispatch = useDispatch();
  let designatedProfile;
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const letters = alpha.map((x) => String.fromCharCode(x));
  if (userObj) {
    designatedProfile = profileImageArray[letters.indexOf(String(userObj?.uid[0]).toUpperCase()) % 2];
  }
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
      dispatch(changeProfileUrl(userImage));
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
            {profileUrl ? (
              <div
                onClick={() => {
                  handleSideNavigation();
                }}
              >
                {userObj ? (
                  <Avatars
                    profile={false}
                    profileColor={profileColor}
                    profileUrl={profileUrl}
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
                        onClick={() =>
                          dispatch(cardOff())
                        }
                      />
                    ) : (
                      <CreditCard onClick={() => dispatch(cardOn())} />
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
                        onClick={() => dispatch(messageOff())}
                      />
                    ) : (
                      <MessageCircle
                        onClick={() => dispatch(messageOn())}
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
