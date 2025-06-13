import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { UserRound } from "lucide-react";
import {
  useEffect,
  useState
} from "react";
import { useDispatch } from "react-redux";
import {
  useLocation
} from "react-router-dom";
import {
  dbservice
} from "src/baseApi/serverbase";
import { useSelectors } from "src/hooks/useSelectors";
import PageTitle from "src/pages/core/pageTitle/PageTitle";
import ProfileActions from "src/pages/profile/ProfileActions";
import ProfileAvatar from "src/pages/profile/profileAvatar/ProfileAvatar";
import ProfileCards from "src/pages/profile/ProfileCards";
import ProfileCompleted from "src/pages/profile/ProfileCompleted";
import ProfileMembers from "src/pages/profile/ProfileMembers";
import { changeBottomNavigation } from "src/stateSlices/bottomNavigationSlice";
import { changeProfileColor } from "src/stateSlices/profileColorSlice";
import { changeProfileUrl } from "src/stateSlices/profileUrlSlice";
import { useImmer } from "use-immer";
import ProfileLocations from "./ProfileLocations";

const area = [
  {
    westSouth: { lat: 37.5927551, lng: 127.047462 },
    westNorth: { lat: 37.6010743, lng: 127.047462 },
    eastSouth: { lat: 37.5927551, lng: 127.0571999 },
    eastNorth: { lat: 37.6010743, lng: 127.0571999 },
  }
]
interface changedImage {
  attachment: string
  character: string
  color: string
}
interface Props {
  userObj: User;
}
function Profile({ userObj }: Props) {
  const languages = useSelectors((state) => state.languages.value)
  const [changedImage, setChangedImage] = useState({
    attachment: '',
    character: '',
    color: '',
    changed: true
  });
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
  const [scrolledToCompleted, setScrolledToCompleted] = useState(false)
  const [open, setOpen] = useState(false)
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const userUid = state?.element.uid || userObj.uid;
  const userDisplayName = state?.element.displayName || userObj.displayName;
  // const myCards = useQuery({
  //   queryKey: ["myCards"],
  //   queryFn: () => myCardsQuery(userObj.uid),
  //   suspense: true,
  // });

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
      const userProfileImage = docSnap.data()?.profileImage || false;
      const userDefaultProfile = docSnap.data()?.defaultProfile || 'null';
      dispatch(changeProfileColor(userColor));
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
  // console.log(document.scrollingElement?.scrollTop)
  // if (document.scrollingElement?.scrollTop > 100) {
  //   setScrolledToCompleted(true)
  // }
  const scrollEffect = () => {
    const scrollNumber = 50
    if (document.scrollingElement?.scrollTop && document.scrollingElement?.scrollTop > scrollNumber) {
      setScrolledToCompleted(true)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', scrollEffect)
    return () => window.removeEventListener('scroll', scrollEffect)
  }, [])
  return (
    <div>
      <PageTitle
        icon={<UserRound />}
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
        changedImage={changedImage}
        handleChangedImage={(newState: changedImage) => setChangedImage(newState)}
        handleClose={handleClose}
      />
      {/* <ProfileDialogs
        userObj={userObj}
        profileDialog={profileDialog}
        attachment={attachment}
        changeAttachment={(newState: string) => setAttachment(newState)}
        handleClose={handleClose}
      /> */}
      <div className='flex justify-center gap-5 p-5'>
        <ProfileLocations user={state?.element.uid} userObj={userObj} />
        {/* <ClickAwayListener onClickAway={handleTooltipClose}>
          <div className='flex justify-center items-center'>
            <Tooltip
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={<div className='text-xl'>
                <div>캠퍼스에 계세요?</div>
                <div>위치 확인으로 캠퍼스에 있음을 알리세요.</div>
                <div>위치 확인은 다음날까지 지속됩니다.</div>
              </div>}
              slotProps={{
                popper: {
                  disablePortal: true,
                },
              }}
            >
              <div className='rounded-xl border border-solid px-1 bg-light-2 dark:bg-dark-2' onClick={handleTooltipOpen}>?</div>
            </Tooltip>
          </div>
        </ClickAwayListener> */}
      </div>
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
      {
        scrolledToCompleted ?
          <>
            <ProfileCompleted user={state?.element || userObj} cards={cards} />
            <ProfileMembers userObj={userObj} user={state?.element || userObj} />
          </>
          :
          <div className='h-[250px]'></div>
      }
      {/* <ProfileVerification userObj={userObj} /> */}
    </div >
  );
}

export default Profile;
