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
import { useSelectors } from "src/hooks/useSelectors";
import BoardMap from "src/pages/board/boardMap/BoardMap";
import PageTitle from "src/pages/core/pageTitle/PageTitle";
import { SwipeableViews } from "src/pages/core/SwipeableViews";
import { useImmer } from "use-immer";
import CardsList from "../core/card/CardsList";
import Popups from "../core/Popups";
import BoardList from "./BoardList";
import FilterDialogsContent from "./FilterDialogs/FilterDialogsContent";
import FilterDialogsTitle from "./FilterDialogs/FilterDialogsTitle";
import LayoutBoard from "./LayoutBoard";
// import { AlarmCheck, AlertCircle, Building, Clock, DoorOpen, MessagesSquare, Pen, PenBox, Pencil, PenSquare, PenTool, Presentation, Search, SearchCheck, SearchCode, SearchSlash, Siren, TowerControl, Umbrella, UserCheck, UserRound, Watch } from "lucide-react";

const registeredMap = {
  ko: '등록 지도',
  en: 'Registered map'
}
const cardList = {
  ko: '카드 목록',
  en: 'Card list'
}
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
  const languages = useSelectors((state) => state.languages.value)
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'

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
          <div className='px-5'>
            <BoardMap
              mapAccordion={mapAccordion}
              mapAccordionToggle={mapAccordionToggle}
              onMarker={onMarker}
              onMarkerTrue={onMarkerTrue}
              onMarkerFalse={onMarkerFalse}
              selectedValues={selectedValues}
              handleSelectedValues={handleSelectedValues}
            />
            <Popups trigger={
              <BoardList />
            } title={<FilterDialogsTitle />} content={<FilterDialogsContent selectedValues={selectedValues} handleSelectedValues={handleSelectedValues} />} />
          </div>
          <div>
            {/* <div className="rounded shadow-md flex p-3 sticky top-16 z-30 justify-between bg-light-2/50 dark:bg-dark-2/50">
                <div className="truncate pt-1">{cardList[index]}</div>
                <div className="truncate flex gap-1">
                  <FilterDialogs
                    selectedValues={selectedValues}
                    handleSelectedValues={handleSelectedValues}
                  />
                </div>
              </div> */}
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
