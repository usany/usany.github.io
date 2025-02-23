import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import Btn from "src/pages/Btn";
import Steppers from "src/pages/main/add/Steppers";
import PageTitle from "src/pages/core/pageTitle/PageTitle";
import Button from "@mui/material/Button";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import {
  auth,
  onSocialClick,
  dbservice,
  storage,
} from "src/baseApi/serverbase";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import { CardActionArea, CardActions } from '@mui/material';
import Chip from "@mui/material/Chip";
// import { useBottomNavigationStore } from 'src/store'
import BeachAccess from "@mui/icons-material/BeachAccess";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import Divider from "@mui/material/Divider";
import { useSelector, useDispatch } from "react-redux";
import { changeBottomNavigation } from "src/stateSlices/bottomNavigationSlice";
import { User } from "firebase/auth";
import Avatars from "src/pages/core/Avatars";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import staticImg from "src/assets/pwa-512x512.png";

interface Props {
  userObj: User | null;
  message: {};
}

function Specifics({ userObj, message }: Props) {
  const [msgObj, setMsgObj] = useState<{
    id: string;
    round: number;
    displayName: string;
    connectedName: string;
    point: number;
    connectedId: string | null;
    creatorId: string;
  } | null>(null);
  const [num, setNum] = useState<number | null>(null);
  const [points, setPoints] = useState<number | null>(null);
  const [deleted, setDeleted] = useState<boolean>(false);
  const profileColor = useSelector((state) => state.profileColor.value);
  const profileImage = useSelector((state) => state.profileImage.value);
  useEffect(() => {
    if (!msgObj) {
      setMsgObj(message);
    }
  });
  // useEffect(() => {
  //   dispatch(changeBottomNavigation(5))
  // }, [])
  useEffect(() => {
    onSnapshot(query(collection(dbservice, "num")), (snapshot) => {
      const newArray = snapshot.docs.map((document) => {
        if (document.id === message.id) {
          setMsgObj({ id: document.id, ...document.data() });
        }
      });
      const newArrayId = snapshot.docs.map((document) => document.id);
      if (newArrayId.indexOf(message.id) === -1) {
        setDeleted(true);
      }
    });
  }, []);
  useEffect(() => {
    onSnapshot(doc(dbservice, `members/${message.creatorId}`), (snapshot) => {
      const number = snapshot.data()?.points;
      setNum(number);
    });
  }, []);
  useEffect(() => {
    if (message.connectedId !== null) {
      onSnapshot(
        doc(dbservice, `members/${message.connectedId}`),
        (snapshot) => {
          const element = snapshot.data()?.points;
          setPoints(element);
        }
      );
    }
  });
  const shadowColorArray = [
    "lightblue",
    "lightcoral",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgreen",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightsteelblue",
    "lightyellow",
  ];
  let shadowColor;
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const letters = alpha.map((x) => String.fromCharCode(x));
  const numbers = Array.from({ length: 10 }, (e, i) => `${i}`);
  const mergedArray = letters.concat(numbers);
  shadowColor =
    shadowColorArray[
      mergedArray.indexOf(String(message.id[0]).toUpperCase()) %
        shadowColorArray.length
    ];
  const messageDisplayName = message.displayName;
  let messageName;
  if (messageDisplayName.length > 10) {
    messageName = messageDisplayName.slice(0, 10) + "......";
  } else {
    messageName = messageDisplayName;
  }
  return (
    <div className="truncate">
      <Card
        sx={{
          boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`,
        }}
      >
        <CardContent>
          <div className="flex justify-between gap-1">
            <div className="flex flex-col gap-1 items-center">
              <Avatars
                profile={false}
                profileColor={profileColor}
                profileUrl={message.creatorUrl}
                fallback={userObj.displayName ? userObj.displayName[0] : ""}
              />
              {message.creatorId === userObj?.uid ? (
                <Chip label="내가 작성함" />
              ) : (
                <Chip label={`${messageName} 작성함`} />
              )}
            </div>
            <div className="flex items-center">
              <Chip
                label={`${message.item} ${message.text.choose === 1 ? " 빌리기" : " 빌려주기"}`}
              />
            </div>
          </div>
          <div className="pt-5">
            <CardMedia
              sx={{ height: 140 }}
              image={"src/assets/pwa-512x512.png"}
            />
          </div>
          <div className="flex justify-around gap-1 pt-5">
            <div className="flex items-center">
              <div>전달 장소:&emsp;</div>
              <Chip
                label={`${message.text.count} ${message.text.counter} ${message.text.counting}`}
              />
            </div>
            <div>
              <div className="flex items-center">
                <div>대여 시간:&emsp;</div>
                <Chip
                  label={`${message.text.clock.year}.${message.text.clock.month}.${message.text.clock.day} ${message.text.clock.hour}:${message.text.clock.minute}`}
                />
              </div>
              <div className="flex items-center">
                <div>반납 시간:&emsp;</div>
                <Chip
                  label={`${message.text.clock.year}.${message.text.clock.month}.${message.text.clock.day} ${message.text.clock.hour}:${message.text.clock.minute}`}
                />
              </div>
            </div>
          </div>
          <Divider />
          <div className="pt-3">
            {message.text.choose === 1 && (
              <div className="flex justify-center">
                <div className="flex flex-col items-center px-5 gap-1">
                  <div>빌리는 분</div>
                  <Avatars
                    profile={false}
                    profileColor={profileColor}
                    profileUrl={message.creatorUrl}
                    fallback={userObj.displayName ? userObj.displayName[0] : ""}
                  />
                  <Chip label={messageName} />
                </div>
                <div className="flex flex-col">
                  <div>{message.point} 포인트 지급</div>
                  <div className="flex justify-start">
                    <HorizontalRuleIcon />
                    <EastIcon />
                    <HorizontalRuleIcon />
                    <EastIcon />
                  </div>
                  <div className="flex justify-end">
                    <WestIcon />
                    <HorizontalRuleIcon />
                    <WestIcon />
                    <HorizontalRuleIcon />
                  </div>
                  <div className="flex justify-end">
                    <BeachAccess />
                  </div>
                </div>
                <div className="flex flex-col items-center px-5 gap-1">
                  <div>빌려주는 분</div>
                  <Avatar
                    className={`bg-light-3 dark:bg-dark-3 border border-dashed`}
                  >
                    <AvatarImage src={message?.connectedUrl} />
                    <AvatarFallback className="text-xl border-none">
                      ?
                    </AvatarFallback>
                  </Avatar>
                  {message.connectedName ? (
                    <Chip label={message.connectedName} />
                  ) : (
                    <Chip variant="outlined" label={"아직 없음"} />
                  )}
                </div>
              </div>
            )}
            {message.text.choose === 2 && (
              <div className="flex justify-center">
                <div className="flex flex-col items-center px-5 gap-1">
                  <div>빌리는 분</div>
                  <Avatars
                    profile={false}
                    profileColor={profileColor}
                    profileUrl={message.creatorUrl}
                    fallback={userObj.displayName ? userObj.displayName[0] : ""}
                  />
                  <Chip label={messageName} />
                </div>
                <div className="flex flex-col">
                  <div>{message.point} 포인트 지급</div>
                  <div className="flex justify-start">
                    <HorizontalRuleIcon />
                    <EastIcon />
                    <HorizontalRuleIcon />
                    <EastIcon />
                  </div>
                  <div className="flex justify-end">
                    <WestIcon />
                    <HorizontalRuleIcon />
                    <WestIcon />
                    <HorizontalRuleIcon />
                  </div>
                  <div className="flex justify-end">
                    <BeachAccess />
                  </div>
                </div>
                <div className="flex flex-col items-center px-5 gap-1">
                  <div>빌려주는 분</div>
                  <Avatars
                    profile={false}
                    profileColor={profileColor}
                    profileUrl={message.creatorUrl}
                    fallback={userObj.displayName ? userObj.displayName[0] : ""}
                  />
                  <Chip label={messageName} />
                  <Avatar
                    className={`bg-light-3 dark:bg-dark-3 border border-dashed`}
                  >
                    <AvatarImage src={message?.connectedUrl} />
                    <AvatarFallback className="text-xl border-none">
                      ?
                    </AvatarFallback>
                  </Avatar>
                  {message.connectedName ? (
                    <Chip label={message.connectedName} />
                  ) : (
                    <Chip variant="outlined" label={"아직 없음"} />
                  )}
                </div>
              </div>
            )}
            {/* {message.text.choose === 2 && (
              <div className="flex justify-between">
                <div>빌려주는 분: {message.displayName}</div>
                <div>지급 포인트: {message.point}</div>
                <div>빌리는 분: {message.connectedName || "아직 없음"}</div>
              </div>
            )} */}
            <Divider />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex pt-5">진행 단계: {message.round}</div>
            <Steppers msgObj={message} />
          </div>
          <Divider />
          <div className="flex justify-center pt-5">
            {deleted === false && userObj !== null && (
              <div className="flex justify-center">
                <Btn
                  msgObj={message}
                  isOwner={message.creatorId === userObj.uid}
                  uid={userObj.uid}
                  displayName={userObj.displayName}
                  userObj={userObj}
                  num={num}
                  points={points}
                />
              </div>
            )}
            {deleted === false && userObj === null && (
              <div className="flex justify-center">
                <Btn
                  msgObj={message}
                  isOwner={false}
                  uid={null}
                  displayName={null}
                  userObj={userObj}
                  num={num}
                  points={points}
                />
              </div>
            )}
            {deleted === true && (
              <div className="flex justify-center">
                <Button variant="outlined" disabled>
                  지워졌습니다
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Specifics;
