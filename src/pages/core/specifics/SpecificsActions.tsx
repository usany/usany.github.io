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
import SpecificsDimensions from "./SpecificsDimensions";

interface Props {
  userObj: User | null;
  message: {};
}

function SpecificsActions({ userObj, message }: Props) {
  const messageDisplayName = message.displayName;
  let messageName;
  if (messageDisplayName.length > 10) {
    messageName = messageDisplayName.slice(0, 10) + "......";
  } else {
    messageName = messageDisplayName;
  }
  return (
    <>
      <div className="flex justify-between gap-1">
        <div className="flex flex-col gap-1 items-center">
          <Avatars
            profile={false}
            profileColor={""}
            profileUrl={message.creatorUrl}
            fallback={message.displayName && message.displayName[0]}
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
    </>
  );
}

export default SpecificsActions;
