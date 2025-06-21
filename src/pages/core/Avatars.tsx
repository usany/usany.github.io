import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DocumentData } from "firebase/firestore";
import static01 from "src/assets/blue01.png";
import static02 from "src/assets/blue02.png";
import statics from "src/assets/blue03.png";
import static05 from "src/assets/gold1.png";
import static06 from "src/assets/gold2.png";
import static03 from "src/assets/red1.png";
import static04 from "src/assets/red2.png";

interface Props {
  element: DocumentData | undefined
  profile: boolean;
  profileColor: string;
  profileUrl: string;
  defaultProfileUrl: string
  piazza: () => void
}

const Avatars = ({
  element,
  profile,
  piazza
  // uid,
  // profileColor,
  // profileUrl,
  // defaultProfileUrl,
}: Props) => {
  const profileImageArray = [static01, static02, static03, static04, static05, static06, statics]
  const profileImage = element?.profileImage
  let defaultProfile
  if (element?.defaultProfile) {
    defaultProfile = element?.defaultProfile
  } else {
    defaultProfile = static05
  }
  // console.log(element)
  // console.log(element?.profileImageUrl)
  // console.log(element?.defaultProfile)

  return (
    <div>
      {profile ? (
        <Avatar
          className='w-48 h-48'
        >
          <AvatarImage src={profileImage ? element.profileImageUrl : defaultProfile} />
          <AvatarFallback className='border border-none bg-light-1 dark:bg-dark-1'>
          </AvatarFallback>
          {/* {!profileImage &&
            <AvatarFallback className="text-8xl border-none">
              <img className='h-full' src={defaultProfile} />
    </AvatarFallback>
          } */}
        </Avatar >
      ) : (
        <Avatar
          onClick={piazza}
        >
          <AvatarImage src={profileImage ? element.profileImageUrl : defaultProfile} />
          <AvatarFallback className='border border-none bg-light-1 dark:bg-dark-1'>
          </AvatarFallback>
          {/* <img className='h-full' src={defaultProfile} /> */}
          {/* {!profileImage &&
          } */}
        </Avatar>
      )}
    </div >
  );
};

export default Avatars;
