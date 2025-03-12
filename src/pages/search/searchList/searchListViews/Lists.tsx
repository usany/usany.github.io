import { useState, useEffect, useLayoutEffect } from "react";
import Divider from "@mui/material/Divider";
// import Avatar from '@mui/material/Avatar';
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Avatars from "src/pages/core/Avatars";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  Minimize2,
  Maximize2,
  Captions,
  Bike,
  Ellipsis,
  ChevronRight,
} from "lucide-react";
import staticImg from "src/assets/pwa-512x512.png";
import RankingListsTitle from "src/pages/search/searchList/searchListViews/searchListViewsTitle/RankingListsTitle";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { dbservice } from "src/baseApi/serverbase";
import { Chip } from "@mui/material";

function Lists({
  userObj,
  elements,
  multiple,
  userSearch,
  ranking,
  handleUser,
}) {
  let point;
  let samePointIndex;
  const [newRanking, setNewRanking] = useState(0);

  return (
    <div>
      {ranking && (
        <div>
          <RankingListsTitle multiple={multiple} />
          <div className="bg-light-3 dark:bg-dark-3">
            {elements.map((element, index) => {
              if (element.points !== point) {
                point = element.points;
                samePointIndex = index;
              }
              if (element.uid === userObj.uid) {
                // console.log(element.uid);
                // console.log(samePointIndex);
                const user = doc(dbservice, `members/${userObj.uid}`);
                const newRank = samePointIndex ? samePointIndex + 1 : index + 1;
                if (!newRanking && multiple) {
                  updateDoc(user, { ranking: newRank });
                  setNewRanking(newRank);
                }
              }
              const profileColor = element?.profileColor;
              let userNameConfirm = true;
              if (userSearch) {
                for (let number = 0; number < userSearch.length; number++) {
                  if (element?.displayName[number] !== userSearch[number]) {
                    userNameConfirm = false;
                  }
                }
              }
              if (userNameConfirm) {
                let displayName;
                if (element.displayName.length > 10) {
                  displayName = element.displayName.slice(0, 10) + "......";
                } else {
                  displayName = element.displayName;
                }
                return (
                  <div key={index} className="px-3 pt-3">
                    <Link
                      to="/profile"
                      state={{
                        element: element,
                      }}
                    >
                      <div
                        className={`flex w-full justify-between p-3 rounded ranking-${multiple ? index + 1 : element.rank}`}
                      >
                        <div className="flex gap-5">
                          {!multiple ? (
                            <div className="flex items-center justify-center  w-20">
                              {newRanking ? newRanking : element.ranking}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center px-5 w-20">
                              {samePointIndex ? samePointIndex + 1 : index + 1}
                            </div>
                          )}
                          <Avatar
                            className={`bg-${profileColor?.indexOf("#") === -1 ? element?.profileColor : "profile-blue"}`}
                          >
                            <AvatarImage src={element?.profileImageUrl} />
                            <AvatarFallback className="text-xl border-none">
                              {element?.displayName[0]}
                            </AvatarFallback>
                          </Avatar>
                          {/* <Avatars profile={false} profileColor={'profile-blue'} profileImage={element?.profileImageUrl || 'null'} fallback={element.displayName[0]}/> */}
                          {/* {element?.profileImageUrl &&
                            <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || '#2196f3' }} src={element?.profileImageUrl || './src'} variant="rounded" />
                          }
                          {!element?.profileImageUrl &&
                            <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || '#2196f3' }} src={'./src'} variant="rounded" />
                          } */}
                          <div className="flex flex-col justify-center overflow-hidden px-5 w-40">
                            <div className="overflow-hidden">{displayName}</div>
                            <div className="overflow-hidden">
                              {element.points}
                            </div>
                          </div>
                        </div>
                        <div className='flex items-center'>
                          {element.locationConfirmed ?
                            <Chip color="success" label={'캠퍼스 위치 확인'} /> : <Chip label={'캠퍼스 위치 미확인'} />
                          }
                        </div>
                      </div>
                    </Link>
                    <Divider />
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
      {!ranking && (
        <div>
          <div className="bg-light-3 dark:bg-dark-3">
            {elements.map((element, index) => {
              const profileColor = element?.profileColor;
              let userNameConfirm = true;
              if (userSearch) {
                for (let number = 0; number < userSearch.length; number++) {
                  if (element?.displayName[number] !== userSearch[number]) {
                    userNameConfirm = false;
                  }
                }
              }
              if (userNameConfirm) {
                let displayName;
                if (element.displayName.length > 10) {
                  displayName = element.displayName.slice(0, 10) + "......";
                } else {
                  displayName = element.displayName.slice(0, 10) + "......";
                }
                return (
                  <div
                    key={index}
                    className="px-3 pt-3"
                    onClick={() => handleUser(element)}
                  >
                    <div className={`flex w-full justify-between p-3`}>
                      <div className="flex">
                        {/* {!multiple ?
                        <div className='flex flex-col justify-center px-5 w-20'>
                          {element.rank}
                        </div>
                      :
                        <div className='flex flex-col justify-center px-5 w-20'>
                          {index+1}
                        </div>
                      } */}
                        <Avatar
                          className={`bg-${profileColor?.indexOf("#") === -1 ? element?.profileColor : "profile-blue"}`}
                        >
                          <AvatarImage src={element?.profileImageUrl} />
                          <AvatarFallback className="text-xl border-none">
                            {element?.displayName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col justify-center overflow-hidden px-10 w-48">
                          <div className="overflow-hidden">{displayName}</div>
                          {/* <div className='overflow-hidden'>
                          {element.points}
                        </div> */}
                        </div>
                      </div>
                    </div>
                    <Divider variant="inset" />
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Lists;
