import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import Btn from "src/Btn";
import Steppers from "src/pages/add/Steppers";
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
import SpecificsDimensions from "./SpecificsDimensions";
import SpecificsActions from "./SpecificsActions";
import SpecificsSteppers from "./SpecificsSteppers";
import SpecificsTrades from "./SpecificsTrades";

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
  useEffect(() => {
    if (!msgObj) {
      setMsgObj(message);
    }
  });
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

  return (
    <div className="truncate">
      <Card
        sx={{
          boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`,
        }}
      >
        <CardContent>
          <SpecificsActions userObj={userObj} message={message} />
          <div className="pt-5">
            <CardMedia
              sx={{ height: 140 }}
              image={"src/assets/pwa-512x512.png"}
            />
          </div>
          <SpecificsDimensions message={message} />
          <Divider />
          <SpecificsTrades userObj={userObj} message={message} />
          <Divider />
          <SpecificsSteppers message={message} />
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
