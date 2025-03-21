import DeleteIcon from "@mui/icons-material/Delete";
import { ClickAwayListener } from "@mui/material";
import Chip from "@mui/material/Chip";
import { User } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import {
  useEffect,
  useRef,
  useState
} from "react";
import { dbservice } from "src/baseApi/serverbase";
import useLongPress from "src/hooks/useLongPress";
import MorphingDialogs from "../../core/morphingDialogs/MorphingDialogs";
import CardsViews from "./CardsViews";

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

const Cards = ({
  message,
  isOwner,
  userObj,
  num,
  points,
  onLongPress,
  changeOnLongPress,
  longPressCard,
  changeLongPressCard,
}: Props) => {
  const [longPressed, setLongPressed] = useState(false);

  const cardsRef = useRef();
  useLongPress(cardsRef, () => {
    if (longPressCard && !onLongPress) {
      setLongPressed(true);
      changeOnLongPress(onLongPress + 1);
    }
  });
  useEffect(() => {
    if (!onLongPress) {
      setLongPressed(false);
    }
  }, [onLongPress]);

  return (
    <div className="max-w-60 min-w-20 p-1" ref={cardsRef}>
      {longPressed ? (
        <div className="flex gap-3 scale-75 w-[200px]">
          <ClickAwayListener
            onClickAway={() => {
              console.log("practice");
              if (longPressCard === message.id) {
                changeOnLongPress(0);
                changeLongPressCard(null);
              }
            }}
          >
            <div
              className="longPress"
              onClick={() => {
                setLongPressed(false);
                changeOnLongPress(onLongPress - 1);
              }}
            >
              <CardsViews
                message={message}
                isOwner={isOwner}
                userObj={userObj}
                num={num}
                points={points}
              />
            </div>
          </ClickAwayListener>
          {/* {longPressed &&
            <div className='z-10 h-full' onClick={() => {
              const data = doc(dbservice, `num/${msgObj.id}`)
              deleteDoc(data)
              changeOnLongPress(null)
            }}>
              <Chip label={<DeleteIcon />} color='error'/>
            </div>
          } */}
          <div
            className="z-10 h-full"
            onClick={() => {
              const data = doc(dbservice, `num/${message.id}`);
              deleteDoc(data);
              changeOnLongPress(null);
            }}
          >
            <Chip label={<DeleteIcon />} color="error" />
          </div>
        </div>
      ) : (
        <div>
          {onLongPress ? (
            <ClickAwayListener
              onClickAway={() => {
                if (longPressCard === message.id) {
                  changeOnLongPress(0);
                  changeLongPressCard(null);
                }
              }}
            >
              <div
                onClick={() => {
                  setLongPressed(true);
                  changeOnLongPress(onLongPress + 1);
                }}
              >
                <CardsViews
                  message={message}
                  isOwner={isOwner}
                  userObj={userObj}
                  num={num}
                  points={points}
                />
              </div>
            </ClickAwayListener>
          ) : (
            <MorphingDialogs
              message={message}
              isOwner={isOwner}
              userObj={userObj}
              num={num}
              points={points}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Cards;
