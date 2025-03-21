import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import { User } from "firebase/auth";
import { Building, Watch } from "lucide-react";
import {
  useEffect,
  useState
} from "react";
import { useSelector } from "react-redux";
import staticImageJ from "src/assets/blue-01.png";
import staticImg from "src/assets/pwa-512x512.png";
import staticImageC from "src/assets/screen-01.png";
import { PulsatingButton } from "src/components/ui/pulsating-button";
import useCardsBackground from "src/hooks/useCardsBackground";
import Avatars from "../../core/Avatars";

interface Props {
  message: { id: string; text: object };
  isOwner: boolean;
  userObj: User | null;
  num: number | null;
  points: number | null;
}
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
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const letters = alpha.map((x) => String.fromCharCode(x));
const numbers = Array.from({ length: 10 }, (e, i) => `${i}`);
const mergedArray = letters.concat(numbers);

const CardView = ({ message, shadowColor }) => {
  const profileColor = useSelector((state) => state.profileColor.value);
  const profileUrl = message?.creatorUrl;
  const { color } = useCardsBackground()

  return (
    <Card
      sx={{
        width: 200,
        height: 280,
        boxShadow: `1.5px 1.5px 1.5px 1.5px ${shadowColor}`,
        bgcolor: color
      }}
    >
      <CardContent sx={{ padding: "5px" }}>
        <div>
          <div className="flex justify-between gap-1">
            <Avatars
              profile={false}
              profileColor={profileColor}
              profileUrl={profileUrl}
              // profileImage={profileImage}
              fallback={message.displayName ? message.displayName[0] : ""}
              piazza={null}
            />
            {
              <Chip
                label={`${message.item} ${message.text.choose === 1 ? " 빌리기" : " 빌려주기"}`}
              />
            }
            {/* {item && <Chip label='내가 작성함' />} */}
          </div>
          {/* {!item &&
                            <div className='flex justify-center pt-5'>
                                빈 카드입니다
                            </div>
                        } */}
          <div className="flex justify-center pt-1">
            <CardMedia sx={{
              width: 159,
              height: 141
            }} image={staticImg} />
          </div>
          {/* {locationState.locationOne &&
                        } */}
          <div className="flex flex-col gap-3 p-1">
            <div className="flex gap-3">
              <Building />
              <div>
                {message.text.count} {message.text.counter} {message.text.counting !== "" && message.text.counting}
              </div>
            </div>
            <div className='flex gap-3'>
              <Watch />
              <div className='flex flex-col'>
                <div className="flex">
                  {message.text.clock?.year}.{message.text.clock?.month}.
                  {message.text.clock?.day} {message.text.clock?.hour}:
                  {message.text.clock?.minute} 부터
                </div>
                <div className="flex">
                  {message.text.clocker?.year}.{message.text.clocker?.month}.
                  {message.text.clock?.day} {message.text.clocker?.hour}:
                  {message.text.clocker?.minute} 까지
                </div>
              </div>
            </div>
          </div>
          {/* <div className='flex flex-col justify-center pt-1'>
                            {locationState && <div className='flex justify-center'>{locationState?.locationOne} {locationState?.locationTwo} {locationState?.locationThree}</div>}
                            {fromTo.from && <div className='flex justify-center'>{fromTo.from.year}.{fromTo.from.month < 10 && '0'}{fromTo.from.month}.{fromTo.from.day < 10 && '0'}{fromTo.from.day} {fromTo.from.hour < 10 && '0'}{fromTo.from.hour}:{fromTo.from.minute < 10 && '0'}{fromTo.from.minute} 부터</div>}
                            {fromTo.to && <div className='flex justify-center'>{fromTo.to.year}.{fromTo.to.month < 10 && '0'}{fromTo.to.month}.{fromTo.from.day < 10 && '0'}{fromTo.to.day} {fromTo.to.hour < 10 && '0'}{fromTo.to.hour}:{fromTo.to.minute < 10 && '0'}{fromTo.to.minute} 까지</div>}
                        </div> */}
        </div>
      </CardContent>
    </Card>
  )
}
const CardsViews = ({ message, isOwner, userObj, num, points, onPulse }: Props) => {
  // const [onPulse, setOnPulse] = useState(false)
  // const changeOnPulse = () => setOnPulse(!onPulse)
  // useEffect(() => {
  //   if (message.text.choose === 1) {
  //     if (message.creatorId === userObj.uid) {
  //       if (message.round === 2 || message.round === 3) {
  //         setOnPulse(true)
  //       }
  //     } else if (message.connectedId === userObj.uid) {
  //       if (message.round === 4) {
  //         setOnPulse(true)
  //       }
  //     }
  //   } else {
  //     if (message.creatorId === userObj.uid) {
  //       if (message.round === 2 || message.round === 4) {
  //         setOnPulse(true)
  //       }
  //     } else if (message.connectedId === userObj.uid) {
  //       if (message.round === 3) {
  //         setOnPulse(true)
  //       }
  //     }
  //   }
  // })
  // useEffect(() => {
  //   if (!webSocket) return
  //   function sOnPulseCallback() {
  //     setOnPulse(true)
  //   }
  //   webSocket.on(`sIncrease${message.id}`, sOnPulseCallback)
  //   return () => {
  //     webSocket.off(`sIncrease${message.id}`, sOnPulseCallback)
  //   }
  // })
  const [staticImage, setStaticImage] = useState("");
  const id = message?.id || ''
  const shadowColor =
    shadowColorArray[
    mergedArray.indexOf(String(id[0]).toUpperCase()) %
    shadowColorArray.length
    ];
  const profileColor = useSelector((state) => state.profileColor.value);
  // const profileImage = useSelector((state) => state.profileImage.value);
  const theme = useSelector((state) => state.theme)
  useEffect(() => {
    if (message.text.count === "중도") {
      setStaticImage(staticImageJ);
    } else if (message.text.count === "청운") {
      setStaticImage(staticImageC);
    } else {
      setStaticImage(staticImg);
    }
  }, [message]);
  const profileUrl = message?.creatorUrl;
  const { color } = useCardsBackground()
  return (
    <div>
      {onPulse ?
        <PulsatingButton pulseColor={shadowColor}>
          <CardView message={message} shadowColor={shadowColor} />
        </PulsatingButton>
        :
        <CardView message={message} shadowColor={shadowColor} />
      }
    </div>
  );
};

export default CardsViews;
