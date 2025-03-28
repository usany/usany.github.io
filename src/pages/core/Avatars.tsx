import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import static01 from "src/assets/blue01.png";
import static02 from "src/assets/blue02.png";
import statics from "src/assets/blue03.png";
import static05 from "src/assets/gold1.png";
import static06 from "src/assets/gold2.png";
import static03 from "src/assets/red1.png";
import static04 from "src/assets/red2.png";

interface Props {
  uid: string
  profile: boolean;
  profileColor: string;
  profileUrl: string;
  fallback: string;
  piazza: () => void
}

const Avatars = ({
  uid,
  profile,
  profileColor,
  profileUrl,
  piazza
  //   profileImage,
}: Props) => {
  // const defaultProfile = useSelector((state) => state.defaultProfile.value)
  // console.log(defaultProfile)
  const profileImageArray = [static01, static02, static03, static04, static05, static06, statics]
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const letters = alpha.map((x) => String.fromCharCode(x));
  let defaultProfile
  let index
  index = letters.indexOf(String(uid[0]).toUpperCase()) % profileImageArray.length
  if (index === -1) {
    index = Number(uid[0]) % profileImageArray.length
  }
  if (uid) {
    defaultProfile = profileImageArray[index];
  }

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
