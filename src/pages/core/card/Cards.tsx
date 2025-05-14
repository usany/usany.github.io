import { DndContext } from "@dnd-kit/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip, ClickAwayListener } from "@mui/material";
import { User } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import {
  useEffect,
  useRef,
  useState
} from "react";
import { dbservice } from "src/baseApi/serverbase";
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
  deleteMessage
}: Props) => {
  const [longPressed, setLongPressed] = useState(false);
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
    <div className="max-w-60 min-w-20 text-sm p-1" ref={cardsRef}>
      {longPressed ? (
        <div className="flex scale-75">
          <ClickAwayListener
            onClickAway={() => {
              // console.log("practice");
              if (longPressCard === message.id) {
                changeOnLongPress(0);
                changeLongPressCard(null);
              }
            }}
          >
            <DndContext>
              <Draggable>
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
                    deleteMessage={deleteMessage}
                  />
                </div>
              </Draggable>
            </DndContext>
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
          {round < 2 ?
            <div
              className="z-10 h-full"
              onClick={() => {
                const data = doc(dbservice, `num/${message.id}`);
                deleteDoc(data);
                changeOnLongPress(null);
                deleteMessage(message)
              }}
            >
              <Chip sx={{}} label={<DeleteIcon />} color="error" />
              {/* <Chips label={<DeleteIcon />} className={'bg-profile-red'} onClick={null} /> */}
            </div>
            :
            <Chip sx={{}} label={<DeleteIcon />} color="error" disabled />
            // <Chips label={<DeleteIcon />} className={'bg-profile-red'} onClick={null} />
          }
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
                  deleteMessage={deleteMessage}
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
