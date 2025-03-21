import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import {
  useEffect,
  useMemo,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import staticImage from "src/assets/blue.png";
import { dbservice } from "src/baseApi/serverbase";
import { useSelectors } from "src/hooks/useSelectors";
import HeaderViews from "src/navigate/HeaderViews";
import Avatars from "src/pages/core/Avatars";
import { changeProfileColor } from "src/stateSlices/profileColorSlice";
import { changeProfileImage } from "src/stateSlices/profileImageSlice";
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

interface Props {
  userObj: User | null;
}

const Header = ({ userObj }: Props) => {
  const bottomNavigation = useSelectors(
    (state) => state.bottomNavigation.value
  );
  // const profileUrl = useSelector(state => state.profileUrl.value)
  const profileColor = useSelector((state) => state.profileColor.value);
  const profileImage = useSelector((state) => state.profileImage.value);
  const [sideNavigation, setSideNavigation] = useState(false);
  const handleSideNavigation = () => {
    setSideNavigation(!sideNavigation);
  };
  const storage = getStorage();
  const [scroll, setScroll] = useState("");
  const cardAccordion = useSelector((state) => state.cardAccordion.value);
  const messageAccordion = useSelector((state) => state.messageAccordion.value);
  const dispatch = useDispatch();
  let prevScrollPos = window.scrollY;
  // console.log(cardAccordion)
  window.addEventListener("scroll", function () {
    // current scroll position
    const currentScrollPos = window.scrollY;
    if (prevScrollPos >= currentScrollPos) {
      // setScroll('fixed z-20 bg-light-3/50 dark:bg-dark-3/50')
      // setScroll("scroll");
      // user has scrolled up
      // document.querySelector('#navigationSelectorOne')?.classList.add('overflow-hidden fixed top-0 z-20 bg-light-3 dark:bg-dark-3')
      // document.querySelector('#navigationSelectorTwo')?.classList.add('fixed', 'top-0', 'z-10', 'bg-light-3', 'dark:bg-dark-3')
      // document.querySelector('#contentSelector')?.classList.add('pt-16')
    } else {
      // setScroll("");
      // user has scrolled down
      // document.querySelector('#navigationSelectorOne')?.classList.remove('overflow-hidden', 'fixed', 'top-0', 'z-20', 'bg-light-3', 'dark:bg-dark-3')
      // document.querySelector('#navigationSelectorTwo')?.classList.remove('fixed', 'top-0', 'z-10', 'bg-light-3', 'dark:bg-dark-3')
      // document.querySelector('#contentSelector')?.classList.remove('pt-16')
    }
    // if (currentScrollPos === 0) {
    //     setScroll('')
    // }
    // update previous scroll position
    prevScrollPos = currentScrollPos;
  });
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
  const profile = useMemo(() => {
    return (
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
                profileImage={profileImage}
                fallback={userObj.displayName ? userObj.displayName[0] : ""}
              />
            ) : (
              <Avatars
                profile={false}
                profileColor={"profile-blue"}
                profileImage={staticImage}
                fallback={""}
              />
            )}
          </div>
        ) : (
          <div>loading</div>
        )}
      </div>
    );
  }, []);
  return (
    <>
      {/* <div className="fixed z-20 bg-light-3/50 dark:bg-dark-3/50 truncate"> */}
      <div className="fixed z-50 bg-light-3 dark:bg-dark-3 truncate">
        <HeaderViews userObj={userObj} />
        {/* <div className={`${!scroll && "hidden"}`}>
          <HeaderViews userObj={userObj} />
        </div> */}
      </div>
      <div className="h-16 truncate">
      </div>
    </>
  );
};

export default Header;
