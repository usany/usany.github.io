import { ClickAwayListener } from "@mui/material";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc
} from "firebase/firestore";
import { getToken } from "firebase/messaging";
import { useEffect, useState } from "react";
import {
  dbservice,
  messaging
} from "src/baseApi/serverbase";
import { AnimatedList } from "src/components/ui/animated-list";
import { useSelectors } from "src/hooks/useSelectors";
import Cards from "src/pages/core/card/Cards";

const emptyCards = {
  ko: '진행 카드가 없습니다',
  en: 'No cards'
}
interface Props {
  userObj: User;
}
function CardsStacks({ userObj }: Props) {
  const [messages, setMessages] = useState([]);
  const [cardLoaded, setCardLoaded] = useState(false);
  const [longPressCard, setLongPressCard] = useState(null);
  const [onLongPress, setOnLongPress] = useState(0)
  const languages = useSelectors((state) => state.languages.value)
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'
  const deleteMessage = (deletingMessage) => {
    const newMessages = [...messages]
    newMessages.splice(newMessages.indexOf(deletingMessage), 1)
    setMessages(newMessages)
  }

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey:
            "BC6ZRwx8Ke48uprRA17AlLOqJ8HCMIwIVYLy32evgnACjpf0aH5yxHhkvEe5D8I73kjn69E2jF-bnMLeRbbzRRE",
        });
        if (token) {
          console.log("Token generated:", token);
          // Send this token to your server to store it for later use
          // webSocket.on('messagingToken', token)
          // return (
          //     webSocket.off('messagingToken', token)
          // )
          const myDoc = doc(dbservice, `members/${userObj.uid}`);
          updateDoc(myDoc, { messagingToken: token });
        } else {
          console.log("No registration token available.");
        }
      } catch (err) {
        console.error("Error getting token:", err);
      }
    };
    requestPermission();
  }, []);

  useEffect(() => {
    const bringCards = async () => {
      const collectionQuery = query(collection(dbservice, "num"), orderBy("creatorClock", "desc"))
      const documents = await getDocs(collectionQuery)
      const newArray = []
      documents.forEach((element) => {
        if (element.data().creatorId === userObj.uid) {
          const newObject = { id: element.id, ...element.data() }
          newArray.push(newObject)
        } else if (
          element.data().connectedId === userObj.uid && element.data().round !== 1
        ) {
          const newObject = { id: element.id, ...element.data() }
          newArray.push(newObject)
        }
      })
      setMessages(newArray)
      setCardLoaded(true)
    }
    bringCards()
  }, []);

  useEffect(() => {
    if (!onLongPress) {
      setLongPressCard(null);
    }
  }, [onLongPress]);
  useEffect(() => {
    if (!longPressCard) {
      setOnLongPress(0);
    }
  }, [longPressCard]);

  return (
    <div>
      {cardLoaded &&
        <div>
          {!messages.filter((value) => {
            if (value.round !== 5) return value
          }).length ? (
            <div className="flex items-center flex-col">
              <div className="flex justify-center rounded w-1/2 p-5 bg-light-2 dark:bg-dark-2 shadow-md">
                {emptyCards[index]}
              </div>
            </div>
          ) : (
            <>
              {/* <div className="flex flex-wrap gap-3"> */}
              <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] col-span-full">
                {messages.map((value) => {
                  const isOwner = value.creatorId === userObj.uid;
                  if (value.round !== 5) {
                    if (value.creatorId === userObj.uid) {
                      return (
                        <div className='flex justify-center'>
                          <ClickAwayListener
                            onClickAway={() => {
                              if (longPressCard === value.id) {
                                setOnLongPress(0);
                                setLongPressCard(null);
                              }
                            }}
                          >
                            <div
                              onMouseDownCapture={() => {
                                const longPress = value.id;
                                setLongPressCard(longPress);
                              }}
                              // onMouseUp={() => {
                              //   setPressed(true)
                              // }}
                              onTouchStartCapture={() => {
                                const longPress = value.id;
                                setLongPressCard(longPress);
                              }}
                            >
                              <AnimatedList>
                                <Cards
                                  message={value}
                                  isOwner={isOwner}
                                  userObj={userObj}
                                  num={null}
                                  points={null}
                                  onLongPress={onLongPress}
                                  changeOnLongPress={(newValue) =>
                                    setOnLongPress(newValue)
                                  }
                                  longPressCard={longPressCard}
                                  changeLongPressCard={(newValue) =>
                                    setLongPressCard(newValue)
                                  }
                                  deleteMessage={deleteMessage}
                                />
                              </AnimatedList>
                            </div>
                          </ClickAwayListener>
                        </div>
                      );
                    } else if (
                      value.connectedId === userObj.uid &&
                      value.round !== 1
                    ) {
                      return (
                        <div
                          onMouseDownCapture={() => {
                            const longPress = value.id;
                            setLongPressCard(longPress);
                          }}
                          // onMouseUp={() => {
                          //   setPressed(true)
                          // }}
                          onTouchStartCapture={() => {
                            const longPress = value.id;
                            setLongPressCard(longPress);
                          }}
                        >
                          <AnimatedList>
                            <Cards
                              message={value}
                              isOwner={isOwner}
                              userObj={userObj}
                              num={null}
                              points={null}
                              onLongPress={onLongPress}
                              changeOnLongPress={(newValue) =>
                                setOnLongPress(newValue)
                              }
                              longPressCard={longPressCard}
                              deleteMessage={deleteMessage}
                            />
                          </AnimatedList>
                        </div>
                      );
                    }
                  }
                })}
              </div>
            </>
          )}
        </div>
      }
    </div >
  );
}

export default CardsStacks;
