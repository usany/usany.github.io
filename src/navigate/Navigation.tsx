import { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { auth, dbservice } from "src/baseApi/serverbase";
import Modes from "src/Modes";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { doc, onSnapshot, query } from "firebase/firestore";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import Public from "@mui/icons-material/Public";
import { User } from "firebase/auth";
import { changeProfileUrl } from "src/stateSlices/profileUrlSlice";
import { changeProfileColor } from "src/stateSlices/profileColorSlice";
import { changeProfileImage } from "src/stateSlices/profileImageSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  MessageCircle,
  Minimize2,
  Maximize2,
  Captions,
  Bike,
  PersonStanding,
  Speech,
  Group,
  MessageSquare,
  MessagesSquare,
  SearchCheck,
} from "lucide-react";
import { changeBottomNavigation } from "src/stateSlices/bottomNavigationSlice";
import { AlarmCheck, AlertCircle, DoorOpen, Presentation, Siren, UserCheck, UserRound } from "lucide-react";

// const StyledBox = styled('div')(({ theme }) => ({
//   backgroundColor: '#fff',
//   ...theme.applyStyles('dark', {
//   }),
// }));

// const Puller = styled('div')(({ theme }) => ({
//   width: 30,
//   left: 500,
//   height: '90%',
//   borderRadius: 3,
//   position: 'absolute',
//   top: 8,
// }));

interface Props {
  userObj: User | null;
  sideNavigation: boolean;
  handleSideNavigation: () => void;
}

const onLogOutClick = () => auth.signOut();
function Navigation({ userObj, sideNavigation, handleSideNavigation }: Props) {
  const [backgroundColor, setBackgroundColor] = useState<string>("#e2e8f0");
  const [points, setPoints] = useState<number>(0);
  const theme = useSelector((state) => state.theme);
  const [profileColor, setProfileColor] = useState<string>("");
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  // const {avatarImage, handleAvatarImage} = useAvatarImageStore()
  // const {avatarColor, handleAvatarColor} = useAvatarColorStore()
  // const {profileUrl, handleProfileUrl} = useProfileUrlStore()

  useEffect(() => {
    if (userObj) {
      onSnapshot(doc(dbservice, `members/${userObj.uid}`), (snapshot) => {
        const number = snapshot.data()?.points;
        setPoints(number);
        const color = snapshot.data()?.profileColor;
        setProfileColor(color);
        const element = snapshot.data();
        setUserData(element);
      });
    }
  }, []);
  const checkbox = () => {
    handleSideNavigation();
  };

  const logOut = () => {
    onLogOutClick();
    // handleAvatarImage(null)
    // handleAvatarColor('')
    // handleProfileUrl('')
    dispatch(changeProfileUrl(""));
    dispatch(changeProfileImage("null"));
    dispatch(changeProfileColor(""));
    checkbox();
  };

  useEffect(() => {
    if (theme === "dark") {
      setBackgroundColor("#2d3848");
    } else {
      setBackgroundColor("#e2e8f0");
    }
  }, [theme]);
  const element = {
    uid: userObj?.uid,
    displayName: userObj?.displayName,
    profileColor: profileColor,
    userData: userData,
  };

  return (
    <SwipeableDrawer
      PaperProps={{
        sx: {
          backgroundColor: { backgroundColor },
          opacity: 0.9,
          // color: {textColor},
          // height: '100%'
        },
      }}
      anchor={"left"}
      open={sideNavigation}
      onClose={handleSideNavigation}
      onOpen={handleSideNavigation}
      aria-hidden="false"
      swipeAreaWidth={20}
    >
      <nav className="flex flex-col justify-between w-full">
        {userObj ? (
          <div className="">
            <div className="flex border-b border-light-3 dark:border-dark-3">
              <div className="p-5">
                <div className="max-w-[200px] max-h-[200px] overflow-hidden">
                  좋은 날씨네요 {userObj.displayName} 님
                </div>
                {userObj && <div>내 포인트: {points}</div>}
              </div>
              <div className="flex border-b border-light-3 dark:border-dark-3"></div>
              <Modes />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-2xl	px-5 pt-5">
                  <div className="flex">
                    <Link
                      to="/profile"
                      state={{ element: element }}
                      onClick={() => checkbox()}
                    >
                      <div className="flex px-3">
                        <UserRound />
                        <div className="px-3">내 프로필</div>
                      </div>
                    </Link>
                  </div>
                </h1>
                <h1 className="text-2xl	px-5 pt-3">
                  <div className="flex">
                    <Link to="/ranking" onClick={() => checkbox()}>
                      {/* 유저 랭킹 */}
                      <div className="flex px-3">
                        <>
                          <SearchCheck />
                        </>
                        <div className="px-3">유저 랭킹</div>
                      </div>
                    </Link>
                  </div>
                </h1>
                <h1 className="text-2xl px-5 pt-3">
                  <div className='flex'>
                    <span className="pt-1 px-3">
                      <MessagesSquare />
                    </span>
                    <Link
                      to="/piazza"
                      state={{ multiple: true }}
                      onClick={() => checkbox()}
                    >
                      단체 대화방
                    </Link>
                  </div>
                </h1>
                <h1 className="text-2xl	px-5 pt-3">
                  <span className="px-3">
                    <Siren />
                  </span>
                  <Link to="/contact" onClick={() => checkbox()}>
                    신고하기
                  </Link>
                </h1>
                {/* <h1 className='text-2xl px-5'>
                <span className='px-3'><WorkIcon /></span>
                <Link to='/chats' onClick={() => checkbox()}>실험실</Link>
              </h1> */}
                <h1 className="text-2xl px-5 pt-3">
                  <span className="px-3">
                    <DoorOpen />
                  </span>
                  <Link
                    to="/"
                    onClick={() => {
                      logOut();
                    }}
                  >
                    로그아웃
                  </Link>
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex border-b border-light-3 dark:border-dark-3">
            <div className="p-5">
              <div className="flex justify-center">좋은 날씨네요</div>
              <div
                className="flex justify-center"
                onClick={() => {
                  dispatch(changeBottomNavigation(1));
                  checkbox();
                }}
              >
                로그인을 해 주세요
              </div>
            </div>
            <Modes />
          </div>
        )}
        {userObj && (
          <div className="absolute flex justify-center bottom-0">
            {theme === "light" ? (
              <iframe
                src="https://open.spotify.com/embed/playlist/41clCj2piQBL3BSEFQN9J3?utm_source=generator"
                width="90%"
                height="200"
                allow="autoplay; clipboard-write; fullscreen; picture-in-picture"
                loading="lazy"
              />
            ) : (
              <iframe
                src="https://open.spotify.com/embed/playlist/41clCj2piQBL3BSEFQN9J3?utm_source=generator&theme=0"
                width="90%"
                height="200"
                allow="autoplay; clipboard-write; fullscreen; picture-in-picture"
                loading="lazy"
              />
            )}
          </div>
        )}

      <AlarmCheck />
      <AlertCircle />
      <Siren />
      <Presentation />
      <DoorOpen />
      <UserRound />
      <UserCheck />
      </nav>
    </SwipeableDrawer>
  );
}

export default Navigation;
