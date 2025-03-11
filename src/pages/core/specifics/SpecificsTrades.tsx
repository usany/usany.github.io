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

interface Props {
  userObj: User | null;
  message: {};
}

function SpecificsTrades({ userObj, message }: Props) {
  const messageDisplayName = message.displayName;
  let messageName;
  if (messageDisplayName.length > 10) {
    messageName = messageDisplayName.slice(0, 10) + "......";
  } else {
    messageName = messageDisplayName;
  }

  return (
    <div className="flex justify-center pt-3">
      <div className="flex flex-col items-center px-5 gap-1">
        <div>빌리는 분</div>
        {message.text.choose === 1 ? (
          <div className="flex flex-col items-center">
            <Avatars
              profile={false}
              profileColor={""}
              profileUrl={message.creatorUrl}
              fallback={userObj.displayName ? userObj.displayName[0] : ""}
            />
            <Chip label={messageName} />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {message.connectedName ? (
              <Avatars
                profile={false}
                profileColor={""}
                profileUrl={message.creatorUrl}
                fallback={message.connectedName ? message.connectedName[0] : ""}
              />
            ) : (
              <Avatar
                className={`bg-light-3 dark:bg-dark-3 border border-dashed`}
              >
                <AvatarImage src={message?.connectedUrl} />
                <AvatarFallback className="text-xl border-none">
                  ?
                </AvatarFallback>
              </Avatar>
            )}
            {message.connectedName ? (
              <Chip label={message.connectedName} />
            ) : (
              <Chip variant="outlined" label={"아직 없음"} />
            )}
          </div>
        )}
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
        {message.text.choose === 1 ? (
          <div className="flex flex-col items-center">
            {message.connectedName ? (
              <Avatars
                profile={false}
                profileColor={""}
                profileUrl={message.connectedUrl}
                fallback={message.connectedName ? message.connectedName[0] : ""}
              />
            ) : (
              <Avatar
                className={`bg-light-3 dark:bg-dark-3 border border-dashed`}
              >
                <AvatarImage src={message?.connectedUrl} />
                <AvatarFallback className="text-xl border-none">
                  ?
                </AvatarFallback>
              </Avatar>
            )}
            {message.connectedName ? (
              <Chip label={message.connectedName} />
            ) : (
              <Chip variant="outlined" label={"아직 없음"} />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Avatars
              profile={false}
              profileColor={""}
              profileUrl={message.creatorUrl}
              fallback={userObj.displayName ? userObj.displayName[0] : ""}
            />
            <Chip label={messageName} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SpecificsTrades;
