import {
  useEffect,
  useState
} from "react";
import {
  dbservice
} from "src/baseApi/serverbase";
import PageTitle from "src/pages/core/pageTitle/PageTitle";
import ProfileActions from "src/pages/profile/ProfileActions";
import ProfileAvatar from "src/pages/profile/profileAvatar/ProfileAvatar";
import ProfileCards from "src/pages/profile/ProfileCards";
import ProfileCompleted from "src/pages/profile/ProfileCompleted";
import ProfileMembers from "src/pages/profile/ProfileMembers";
// import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { User } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  useLocation,
  useParams
} from "react-router-dom";
import { changeBottomNavigation } from "src/stateSlices/bottomNavigationSlice";
import { useImmer } from "use-immer";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import Skeleton from '@mui/material/Skeleton';
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { useSelectors } from "src/hooks/useSelectors";
import { changeProfileColor } from "src/stateSlices/profileColorSlice";
import { changeProfileUrl } from "src/stateSlices/profileUrlSlice";
import ProfileLocations from "./ProfileLocations";

const area = [
  {
    westSouth: { lat: 37.5927551, lng: 127.047462 },
    westNorth: { lat: 37.6010743, lng: 127.047462 },
    eastSouth: { lat: 37.5927551, lng: 127.0571999 },
    eastNorth: { lat: 37.6010743, lng: 127.0571999 },
  }
]
interface Props {
  userObj: User;
}
function Profile({ userObj }: Props) {
  const params = useParams()
  console.log(params)
  const languages = useSelectors((state) => state.languages.value)
  const [attachment, setAttachment] = useState("");
  const { state } = useLocation();
  const [profileDialog, setProfileDialog] = useState(false);
  const [alliesCollection, setAlliesCollection] = useImmer([
    {
      id: "followers",
      list: [],
    },
    {
      id: "followings",
      list: [],
    },
  ]);
  const [cards, setCards] = useState({
    point: null,
    done: [],
    borrowDone: [],
    lendDone: [],
  });
  // const [weather, setWeather] = useState(null)
  // const [drawerClosed, setDrawerClosed] = useState(false);
  // const [locationConfirmed, setLocationConfirmed] = useState(false)
  const userUid = state?.element.uid || userObj.uid;
  const userDisplayName = state?.element.displayName || userObj.displayName;
  const myCardsQuery = async ({ uid }) => {
    const docRef = doc(dbservice, `members/${uid}`);
    const myDocSnap = await getDoc(docRef);

    return myDocSnap;
  };
  const myCards = useQuery({
    queryKey: ["myCards"],
    queryFn: () => myCardsQuery(userObj.uid),
    suspense: true,
  });

  useEffect(() => {
    const cards = async () => {
      const docRef = doc(dbservice, `members/${userUid}`);
      const myDocSnap = await getDoc(docRef);
      const { points, done, borrowDoneCount, lendDoneCount } = myDocSnap.data();
      setCards({
        point: points,
        done: done,
        borrowDone: borrowDoneCount || [],
        lendDone: lendDoneCount || [],
      });
    };
    cards();
  }, [state]);

  const handleFollowers = ({ number, list }) => {
    setAlliesCollection((draft) => {
      const followers = draft.find((todo) => todo.id === "followers");
      followers.list = list;
    });
  };
  const handleFollowings = ({ number, list }) => {
    setAlliesCollection((draft) => {
      const followings = draft.find((todo) => todo.id === "followings");
      followings.list = list;
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const setProfile = async () => {
      const docRef = doc(dbservice, `members/${userObj?.uid}`);
      const docSnap = await getDoc(docRef);
      const userColor = docSnap.data()?.profileColor || "#2196f3";
      const userImage = docSnap.data()?.profileImageUrl || "null";
      // dispatch(changeProfileColor(userColor));
      // dispatch(changeProfileUrl(userImage));
      const userProfileImage = docSnap.data()?.profileImage || false;
      const userDefaultProfile = docSnap.data()?.defaultProfile || 'null';
      dispatch(changeProfileColor(userColor));
      console.log(userProfileImage)
      console.log(userImage)
      console.log(userDefaultProfile)
      if (userProfileImage) {
        dispatch(changeProfileUrl(userImage));
      } else {
        dispatch(changeProfileUrl(userDefaultProfile));
      }
    };
    setProfile();
  }, [userObj]);
  useEffect(() => {
    const bringAllies = async () => {
      let docRef;
      if (userObj.uid === userUid) {
        docRef = doc(dbservice, `members/${userObj.uid}`);
      } else {
        docRef = doc(dbservice, `members/${state.element.uid}`);
      }
      const myDocSnap = await getDoc(docRef);
      const { followers, followings } = myDocSnap.data();
      const alliesObj = [
        { id: "followers", list: followers || [] },
        { id: "followings", list: followings || [] },
      ];
      setAlliesCollection(alliesObj);
    };
    bringAllies();
  }, [state]);
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [state]);
  useEffect(() => {
    dispatch(changeBottomNavigation(5));
  }, [state]);
  const handleClose = () => {
    setProfileDialog(false);
  };
  const changeProfileDialog = (newValue) => {
    setProfileDialog(newValue)
  }
  // const actions = [
  //   { action: 'borrow', number: borrowMessage.length+borrowRegisteredMessage.length,
  //     fill: 'red'},
  //   { action: 'lend', number: lendMessage.length+lendRegisteredMessage.length,
  //     fill: 'blue'},
  // ]
  // const labels = {
  //   number: {
  //     label: 'total',
  //   },
  //   borrow: {
  //     label: 'borrow',
  //     color: '#2563eb',
  //   },
  //   lend: {
  //     label: 'lend',
  //     color: '#60a5fa',
  //   },
  // } satisfies ChartConfig
  // const totalNumber = actions.reduce((acc, curr) => acc + curr.number, 0)
  // const ProfileAvatar = lazy(() => import("src/components/ProfileAvatar"))
  let shortenName;
  if (userDisplayName.length > 10) {
    shortenName = userDisplayName.slice(0, 10) + "......";
  } else {
    shortenName = userDisplayName;
  }
  function getCoords() {
    return new Promise((resolve, reject) =>
      navigator.permissions ?

        // Permission API is implemented
        navigator.permissions.query({
          name: 'geolocation'
        }).then(permission =>
          // is geolocation granted?
          permission.state === "granted"
            ? navigator.geolocation.getCurrentPosition(pos => {
              // setWeather(pos)
              resolve(pos.coords)
            })
            : resolve(null)
        ) :

        // Permission API was not implemented
        reject(new Error("Permission API is not supported"))
    )
  }
  // getCoords().then(coords => console.log(coords))
  // console.log(weather)
  // console.log(profileDialog)
  // console.log(state)
  return (
    <div>
      <PageTitle
        title={`${userUid === userObj.uid ? (languages === 'ko' ? "내" : 'My') : shortenName} ${languages === 'ko' ? '프로필' : 'Profile'}`}
      />
      {/* <div onClick={() => {
        const navigators = navigator.geolocation.getCurrentPosition(position => console.log(position.coords))
        console.log(navigators)
      }
      }>위치 latitude:37.5682 longitude:126.9977</div> */}
      <ProfileAvatar
        userObj={userObj}
        user={state?.element || userObj}
        handleProfileDialog={() => setProfileDialog(true)}
        profileDialog={profileDialog}
        attachment={attachment}
        changeAttachment={(newState: string) => setAttachment(newState)}
        handleClose={handleClose}
      />
      {/* <ProfileDialogs
        userObj={userObj}
        profileDialog={profileDialog}
        attachment={attachment}
        changeAttachment={(newState: string) => setAttachment(newState)}
        handleClose={handleClose}
      /> */}
      <ProfileLocations user={state?.element.uid} userObj={userObj} />
      {/* <Suspense fallback={<Skeleton />}>
        <ProfileAvatar userObj={userObj} user={state.element} handleProfileDialog={() => setProfileDialog(true)} />
      </Suspense> */}
      <ProfileActions
        userObj={userObj}
        user={state?.element || userObj}
        alliesCollection={alliesCollection}
        handleFollowers={handleFollowers}
        handleFollowings={handleFollowings}
      />
      <ProfileCards
        user={state?.element || userObj}
        alliesCollection={alliesCollection}
        cards={cards}
        changeProfileDialog={changeProfileDialog}
      />
      <ProfileCompleted user={state?.element || userObj} cards={cards} />
      {/* {state.element.uid === userObj.uid ?
        <div className='flex justify-center' onClick={delist}>
          회원 탈퇴
        </div>
        :
        <Link to='/contact' state={{user: state.element}}>
          <div className='flex justify-center'>
            신고하기
          </div>
        </Link>
      } */}
      {/* {profileImage ?
        :
        <div className='w-screen px-5'>
          <Skeleton />
        </div>
      } */}
      <ProfileMembers userObj={userObj} user={state?.element || userObj} />
    </div>
  );
}

export default Profile;
