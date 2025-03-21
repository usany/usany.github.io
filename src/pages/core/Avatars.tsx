import { useState, useEffect, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector, useDispatch } from "react-redux";
import staticImage from "src/assets/blue01.png";

interface Props {
  profile: boolean;
  profileColor: string;
  profileUrl: string;
  fallback: string;
  piazza: () => void
}

const Avatars = ({
  profile,
  profileColor,
  profileUrl,
  fallback,
  piazza
  //   profileImage,
}: Props) => {
  // const profileImage = useSelector(state => state.profileImage.value)
  // const profileUrl = useSelector(state => state.profileUrl.value)
  // console.log(profileImage)

  return (
    <div>
      {profile ? (
        // <Avatar className={`w-48 h-48 bg-${(profileColor || '')[0] === '#' ? 'profile-blue' : profileColor}`}>
        <Avatar
          className={`w-48 h-48 bg-${(profileColor || "#")[0] === "#" ? "profile-blue" : profileColor}`}
        >
          <AvatarImage src={profileUrl} />
          <AvatarFallback className="text-8xl border-none">
            <img className='h-full' src={staticImage} />
            {/* {fallback} */}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Avatar
          onClick={piazza}
        // className={`bg-${(profileColor || "#")[0] === "#" ? "profile-blue" : profileColor}`}
        >
          <AvatarImage src={profileUrl} />
          <AvatarFallback className="border">
            {/* {fallback} */}
            <img className='h-full' src={staticImage} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default Avatars;
