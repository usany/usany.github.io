import { useState, useEffect, useReducer } from "react";
import { createPortal } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import {
  collection,
  query,
  where,
  orderBy,
  addDoc,
  getDoc,
  deleteDoc,
  getDocs,
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import {
  auth,
  onSocialClick,
  dbservice,
  storage,
} from "src/baseApi/serverbase";
import { getAuth, deleteUser } from "firebase/auth";
import Button from "@mui/material/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import TextField from "@mui/material/TextField";
import { Card, Chip } from "@mui/material";
import { useSelector } from "react-redux";
import colors from "src/pages/core/cardsBackground";
import useCardsBackground from "../core/useCardsBackground";

const ProfileMembersDrawers = ({ userObj, user }) => {
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [process, setProcess] = useState(false);
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme)

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    if (value === userObj.email) {
      setConfirmEmail(true);
    } else {
      setConfirmEmail(false);
    }
  };
  const delist = async () => {
    await deleteDoc(doc(dbservice, `members/${userObj.uid}`));
    deleteUser(user)
      .then(() => {
        console.log(user);
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
    navigate("/");
  };
  console.log(user)
  useEffect(() => {
    const createdCards = user.userData?.createdCards
    const connectedCards = user.userData?.connectedCards
    const createdNumber = createdCards?.length || 0
    const connectedNumber = connectedCards?.length || 0
    if (
      createdNumber === 0 &&
      connectedNumber === 0
    ) {
      setProcess(true);
    } else {
      setProcess(false)
    }
  }, [user]);
  const { color } = useCardsBackground()

  return (
    <Drawer>
      <DrawerTrigger>
        {/* <div id="member" /> */}
        <Card sx={{ width: "100%", bgcolor: color }}>
          <div
            className="flex justify-center p-5"
          // onClick={() => {
          //   document.getElementById("member")?.click();
          // }}
          >
            회원 탈퇴
          </div>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="bg-light-2 dark:bg-dark-2 max-h-[50%]">
        <ScrollArea className='overflow-y-scroll'>
          <DrawerHeader>
            <div>
              진행 중인 빌리기, 빌려주기가 없어야 회원 탈퇴를 할 수 있습니다.
            </div>
            {process ? (
              <div className='flex justify-center'>
                <Chip label={'진행 카드가 없습니다'} color="primary" />
              </div>
            ) : (
              <div className='flex justify-center'>
                <Chip label={'진행 카드가 있습니다'} color="error" />
              </div>
            )}
            <div>정말로 회원 탈퇴를 하시려면 이메일을 입력해 주세요</div>
          </DrawerHeader>
          <div className="flex flex-col justify-center p-5 gap-5">
            <TextField label="이메일" onChange={onChange} />
            {process && confirmEmail ? (
              <Button variant="outlined" onClick={delist}>
                회원 탈퇴
              </Button>
            ) : (
              <Button variant="outlined" disabled>
                회원 탈퇴
              </Button>
            )}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileMembersDrawers;
