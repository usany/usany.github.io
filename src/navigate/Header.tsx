import {
  useState,
  useEffect,
} from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { dbservice } from "src/baseApi/serverbase";
import { useDispatch } from "react-redux";
import { changeProfileUrl } from "src/stateSlices/profileUrlSlice";
import { changeProfileColor } from "src/stateSlices/profileColorSlice";
import { changeProfileImage } from "src/stateSlices/profileImageSlice";
import { User } from "firebase/auth";
import HeaderViews from "src/navigate/HeaderViews";

interface Props {
  userObj: User | null;
}

const Header = ({ userObj }: Props) => {
  const storage = getStorage();
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
  return (
    <>
      <div className="fixed z-20 bg-light-3 dark:bg-dark-3 truncate">
        <HeaderViews userObj={userObj} />
      </div>
    </>
  );
};

export default Header;
