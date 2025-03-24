import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import static01 from "src/assets/blue01.png";
import static02 from "src/assets/blue02.png";
import static03 from "src/assets/blue03.png";

interface Props {
  profile: boolean;
  profileColor: string;
  profileUrl: string;
  fallback: string;
  piazza: () => void
}

const Avatars = ({
  userObj,
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
  const profileImageArray = [static01, static02, static03]
  let designatedProfile;
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const letters = alpha.map((x) => String.fromCharCode(x));
  if (userObj) {
    designatedProfile = profileImageArray[letters.indexOf(String(userObj?.uid[0]).toUpperCase()) % 3];
  }
  const defaultProfile = useSelector((state) => state.defaultProfile.value)
  console.log(defaultProfile)
  return (
    <div>
      {profile ? (
        // <Avatar className={`w-48 h-48 bg-${(profileColor || '')[0] === '#' ? 'profile-blue' : profileColor}`}>
        <Avatar
          className={`w-48 h-48 bg-${(profileColor || "#")[0] === "#" ? "profile-blue" : profileColor}`}
        >
          <AvatarImage src={profileUrl} />
          <AvatarFallback className="text-8xl border-none">
            <img className='h-full' src={defaultProfile} />
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
            <img className='h-full' src={defaultProfile} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default Avatars;
