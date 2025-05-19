import { ClickAwayListener } from "@mui/material";
import { User } from "firebase/auth";
import {
  useEffect,
  useRef,
  useState
} from "react";
import useLongPress from "src/hooks/useLongPress";
import Draggable from "src/pages/main/menu/Draggable";
import MorphingDialogs from "../morphingDialogs/MorphingDialogs";
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
  deleteMessage,
  longPressed,
  changeLongPressed
}: Props) => {
  // const [longPressed, setLongPressed] = useState(false);
  const [round, setRound] = useState(0)
  const increaseRound = () => {
    setRound(round + 1)
  }
  const decreaseRound = () => {
    setRound(round - 1)
  }
  useEffect(() => {
    if (!round) {
      setRound(message.round)
    }
  })

  const cardsRef = useRef();
  useLongPress(cardsRef, () => {
    if (longPressCard && !onLongPress) {
      changeLongPressed(true);
      changeOnLongPress(onLongPress + 1);
    }
  });
  useEffect(() => {
    if (!onLongPress) {
      changeLongPressed(false);
    }
  }, [onLongPress]);
  return (
    <div className="max-w-60 min-w-20 text-sm p-1" ref={cardsRef}>
      {longPressCard === message.id && longPressed ? (
        <div className="flex scale-75">
          <ClickAwayListener
            onClickAway={() => {
              if (longPressCard === message.id) {
                changeOnLongPress(0);
                changeLongPressCard(null);
                changeLongPressed(false)
              }
            }}
          >
            <div>
              <Draggable id={message.id}>
                <div
                  className="longPress touch-none"
                  onClick={() => {
                    changeLongPressed(false);
                    changeOnLongPress(onLongPress - 1);
                  }}
                >
                  <CardsViews
                    message={message}
                    isOwner={isOwner}
                    userObj={userObj}
                    num={num}
                    points={points}
                    deleteMessage={deleteMessage}
                  />
                </div>
              </Draggable>
            </div>
          </ClickAwayListener>
        </div>
      ) : (
        <div>
          {longPressed ? (
            <>
              <div
              // onClick={() => {
              //   changeLongPressCard(null)
              //   changeLongPressed(false);
              //   console.log('practice')
              // }}
              >
                <CardsViews
                  message={message}
                  isOwner={isOwner}
                  userObj={userObj}
                  num={num}
                  points={points}
                  deleteMessage={deleteMessage}
                />
              </div>
            </>
          ) : (
            <MorphingDialogs
              message={message}
              isOwner={isOwner}
              userObj={userObj}
              num={num}
              points={points}
              round={round}
              increaseRound={increaseRound}
              decreaseRound={decreaseRound}
              deleteMessage={deleteMessage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Cards;
