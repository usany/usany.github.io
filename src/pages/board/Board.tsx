import { User } from "firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  dbservice
} from "src/baseApi/serverbase";
// import Cards from "src/pages/main/card/Cards";
import { useSelector } from "react-redux";
import BoardMap from "src/pages/board/boardMap/BoardMap";
import FilterDialogs from "src/pages/board/FilterDialogs/FilterDialogs";
import PageTitle from "src/pages/core/pageTitle/PageTitle";
import { SwipeableViews } from "src/pages/core/SwipeableViews";
import { useImmer } from "use-immer";
import CardsList from "../core/card/CardsList";
import LayoutBoard from "./LayoutBoard";
// import { AlarmCheck, AlertCircle, Building, Clock, DoorOpen, MessagesSquare, Pen, PenBox, Pencil, PenSquare, PenTool, Presentation, Search, SearchCheck, SearchCode, SearchSlash, Siren, TowerControl, Umbrella, UserCheck, UserRound, Watch } from "lucide-react";

interface Props {
  userObj: User | null;
}

function Board({ userObj }: Props) {
  const [messages, setMessages] = useState<Array<object>>([]);
  const [selectedValues, setSelectedValues] = useImmer([
    {
      id: "selectedValueOne",
      value: "전체 아이템",
    },
    {
      id: "selectedValueTwo",
      value: "전체 장소",
    },
    {
      id: "selectedValueThree",
      value: "최신순",
    },
  ]);
  const [onMarker, setOnMarker] = useState(false);
  const [mapAccordion, setMapAccordion] = useState(false)
  const mapAccordionToggle = () => setMapAccordion(!mapAccordion)
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
  const languages = useSelector((state) => state.languages)

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, []);
  useEffect(() => {
    const bringMessages = async () => {
      let order = 'asc'
      if (selectedValues[2].value === "최신순" || !selectedValues[2].value) {
        order = 'desc'
      }
      const collectionQuery = query(collection(dbservice, "num"), orderBy("creatorClock", order))
      const docs = await getDocs(collectionQuery)
      const newArray = []
      docs.forEach((doc) => {
        newArray.push({ id: doc.id, ...doc.data() })
      })
      setMessages(newArray)
    }
    bringMessages()
  }, [selectedValues[2].value]);
  return (
    <div>
      {userObj ?
        <div>
          {/* <AlarmCheck />
            <AlertCircle />
            <Siren />
            <Presentation />
            <DoorOpen />
            <UserRound />
            <UserCheck />
            <MessagesSquare />
            <Umbrella />
            <TowerControl />
            <Clock />
            <Building />
            <Watch />
            <Pencil />
            <Search />
            <SearchCheck />
            <SearchCode />
            <SearchSlash />
            <Pen />
            <PenBox />
            <PenTool />
            <PenSquare /> */}
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
            <PageTitle title={`${languages === 'ko' ? '빌리기 카드 목록' : 'Borrowing Card Board'}`} />
            <PageTitle title={`${languages === 'ko' ? '빌려주기 카드 목록' : 'Lending Card Board'}`} />
          </SwipeableViews>
          <BoardMap
            mapAccordion={mapAccordion}
            mapAccordionToggle={mapAccordionToggle}
            onMarker={onMarker}
            onMarkerTrue={onMarkerTrue}
            onMarkerFalse={onMarkerFalse}
            selectedValues={selectedValues}
            handleSelectedValues={handleSelectedValues}
          />
          <div>
            <div className="shadow-md flex p-3 sticky top-16 z-30 justify-between bg-light-3 dark:bg-dark-3">
              <div className="pt-1">카드 목록</div>
              <div className="flex gap-1">
                <FilterDialogs
                  selectedValues={selectedValues}
                  handleSelectedValues={handleSelectedValues}
                />
              </div>
            </div>
            <SwipeableViews>
              <CardsList choose={1} messages={messages} selectedValues={selectedValues} userObj={userObj} />
              <CardsList choose={2} messages={messages} selectedValues={selectedValues} userObj={userObj} />
            </SwipeableViews>
          </div>
        </div>
        :
        <LayoutBoard />
      }
    </div>
  );
}

export default Board;
