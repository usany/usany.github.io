import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import {
  DoorOpen,
  MessagesSquare,
  SearchCheck,
  Siren,
  UserRound
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth, dbservice } from "src/baseApi/serverbase";
import Modes from "src/Modes";
import { changeBottomNavigation } from "src/stateSlices/bottomNavigationSlice";
import { changeProfileColor } from "src/stateSlices/profileColorSlice";
import { changeProfileImage } from "src/stateSlices/profileImageSlice";
import { changeProfileUrl } from "src/stateSlices/profileUrlSlice";
import NavigationSignedIn from "./navigationSignedIn/NavigationSignedIn";

const Links = ({ href, passingState, onClick, icon, description }) => {
  return (
    <h1 className="text-2xl	px-5">
      <div className="flex">
        <Link
          to={href}
          state={passingState}
          onClick={onClick}
        >
          <div className="flex px-3">
            {icon}
            <div className="px-3">{description}</div>
          </div>
        </Link>
      </div>
    </h1>
  )
}


export default Links;
