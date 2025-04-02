import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
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
  piazza: () => void
}

const Avatars = ({
  element,
  uid,
  profile,
  profileColor,
  profileUrl,
  piazza
}: Props) => {
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
  const profileImage = element?.profileImage
  return (
    <div>
      {profile ? (
        <Avatar
          className={`w-48 h-48 bg-${(profileColor || "#")[0] === "#" ? "profile-blue" : profileColor}`}
        >
          <AvatarImage src={profileUrl} />
          {!profileImage &&
            <AvatarFallback className="text-8xl border-none">
              <img className='h-full' src={defaultProfile} />
            </AvatarFallback>
          }
        </Avatar>
      ) : (
        <Avatar
          onClick={piazza}
        >
          <AvatarImage src={profileUrl} />
          {!profileImage &&
            <AvatarFallback className="border">
              <img className='h-full' src={defaultProfile} />
            </AvatarFallback>
          }
        </Avatar>
      )}
    </div>
  );
};

export default Avatars;
