import { useState, useEffect, lazy } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import {
  auth,
  onSocialClick,
  dbservice,
  storage,
} from "src/baseApi/serverbase";
import FilterDialogs from "src/pages/main/FilterDialogs";
import { useImmer } from "use-immer";
import { User } from "firebase/auth";
import Cards from "src/components/card/Cards";
import PageTitle from "src/pages/core/pageTitle/PageTitle";
import BoardMap from "src/pages/main/BoardMap";
import { SwipeableViews } from "src/navigate/SwipeableViews";
import { AlarmCheck, AlertCircle, DoorOpen, Presentation, Siren, UserCheck, UserRound } from "lucide-react";

interface Props {
  userObj: User | null;
  borrow: boolean;
}

function Notice({ userObj, borrow }: Props) {
  const [messages, setMessages] = useState<Array<object>>([]);
  // const [lendMessages, setLendMessages] = useState([]);
  const [selectedValues, setSelectedValues] = useImmer([
    {
      id: "selectedValueOne",
      value: "전체",
    },
    {
      id: "selectedValueTwo",
      value: "전체",
    },
    {
      id: "selectedValueThree",
      value: "최신순",
    },
  ]);
  const [onMarker, setOnMarker] = useState(false);
  const onMarkerTrue = () => setOnMarker(true);
  const onMarkerFalse = () => setOnMarker(false);
  const handleSelectedValues = ({
    id,
    newValue,
  }: {
    id: string;
    newValue: string;
  }) => {
    setSelectedValues((values) => {
      const value = values.find((value) => value.id === id);
      if (value) {
        value.value = newValue;
      }
    });
  };

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, []);

  useEffect(() => {
    if (selectedValues[2].value === "최신순" || !selectedValues[2].value) {
      onSnapshot(
        query(collection(dbservice, "num"), orderBy("creatorClock", "desc")),
        (snapshot) => {
          const newArray = snapshot.docs.map((document) => {
            return {
              id: document.id,
              ...document.data(),
            };
          });
          setMessages(newArray);
        }
      );
    } else {
      onSnapshot(
        query(collection(dbservice, "num"), orderBy("creatorClock")),
        (snapshot) => {
          const newArray = snapshot.docs.map((document) => {
            return {
              id: document.id,
              ...document.data(),
            };
          });
          setMessages(newArray);
        }
      );
    }
  }, [selectedValues[2].value]);

  return (
    <div>
      <AlarmCheck />
      <AlertCircle />
      <Siren />
      <Presentation />
      <DoorOpen />
      <UserRound />
      <UserCheck />
      {/* <div>
        <div className="sticky top-20 p-5 bg-white">카드 목록</div>
        <div>
          <div>목록 카드 목록</div>
          <div>목록 카드 목록</div>
          <div>목록 카드 목록</div>
          <div>목록 카드 목록</div>
          <div>목록 카드 목록</div>
          <div>목록 카드 목록</div>
        </div>
      </div>
      <div>
        <div className="sticky top-20 p-5 bg-white">목록 카드 목록 목록</div>
        <div>
          <div>목록 카드 목록</div>
          <div>목록 카드 목록</div>
          <div>목록 카드 목록</div>
          <div>목록 카드 목록</div>
          <div>목록 카드 목록</div>
          <div>목록 카드 목록</div>
        </div>
      </div> */}
      {/* <div className="flex justify-between text-2xl">
        <PageTitle title={`${borrow ? "빌리기" : "빌려주기"} 카드 목록`} />
      </div> */}
      {/* <div className="sticky top-20 p-5">카드 목록</div>
      <div className="sticky top-20 p-5">카드 목록 목록</div> */}
      <SwipeableViews>
        <div className="flex justify-between text-2xl">
          <PageTitle title={`빌리기 카드 목록`} />
        </div>
        <div className="flex justify-between text-2xl">
          <PageTitle title={`빌려주기 카드 목록`} />
        </div>
      </SwipeableViews>
      <BoardMap
        onMarker={onMarker}
        onMarkerTrue={onMarkerTrue}
        onMarkerFalse={onMarkerFalse}
      />
      <div>
        <div className="flex p-3 sticky top-16 z-30 justify-between bg-light-3 dark:bg-dark-3">
          <div className="pt-1">카드 목록</div>
          <div className="flex gap-1">
            {!onMarker && (
              <FilterDialogs
                selectedValues={selectedValues}
                handleSelectedValues={handleSelectedValues}
              />
            )}
          </div>
        </div>
        <SwipeableViews>
          <div className="flex flex-wrap justify-between p-3 gap-1">
            {messages.map((msg) => {
              const choose = 1;
              const isOwner = msg?.creatorId === userObj?.uid;
              if (msg?.text.choose === choose && msg?.round === 1) {
                if (
                  selectedValues[0].value === "전체" ||
                  selectedValues[0].value === msg?.item ||
                  !selectedValues[0].value
                ) {
                  if (
                    selectedValues[1].value === "전체" ||
                    selectedValues[1].value === msg?.text.count ||
                    !selectedValues[1].value
                  ) {
                    return (
                      <Cards
                        msgObj={msg}
                        isOwner={isOwner}
                        userObj={userObj}
                        num={null}
                        points={null}
                      />
                    );
                  }
                }
              }
            })}
          </div>
          <div className="flex flex-wrap justify-between p-3 gap-1">
            {messages.map((msg) => {
              const choose = 2;
              const isOwner = msg?.creatorId === userObj?.uid;
              if (msg?.text.choose === choose && msg?.round === 1) {
                if (
                  selectedValues[0].value === "전체" ||
                  selectedValues[0].value === msg?.item ||
                  !selectedValues[0].value
                ) {
                  if (
                    selectedValues[1].value === "전체" ||
                    selectedValues[1].value === msg?.text.count ||
                    !selectedValues[1].value
                  ) {
                    return (
                      <Cards
                        msgObj={msg}
                        isOwner={isOwner}
                        userObj={userObj}
                        num={null}
                        points={null}
                      />
                    );
                  }
                }
              }
            })}
          </div>
        </SwipeableViews>
      </div>
    </div>
  );
}

export default Notice;
