import { User } from "firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query
} from "firebase/firestore";
import { Maximize2, Minimize2 } from "lucide-react";
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
  const [messageLoaded, setMessageLoaded] = useState(false)
  const userCertificated = useSelectors(state => state.userCertificated.value)
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
      setMessageLoaded(true)
    }
    bringMessages()
  }, [selectedValues[2].value]);
  const handleMail = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/mail', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: userObj?.uid,
          author: userObj?.displayName
        })
      })
      const jsonData = await res.json()
      console.log(jsonData)
    } catch (error) {
      alert("아이템 작성 실패")
      console.log(error)
    }
  }
  return (
    <div>
      {userObj && userCertificated ?
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
          <SwipeableViews>
            <PageTitle icon={<Minimize2 />} title={
              languages === 'ko' ? '빌리기 카드 목록' : 'Borrowing Card Board'
            } />
            <PageTitle icon={<Maximize2 />} title={
              languages === 'ko' ? '빌려주기 카드 목록' : 'Lending Card Board'
            } />
          </SwipeableViews>
          <div className='px-5'>
            <div className='flex justify-center'>
              <div className='w-[1000px]'>
                <BoardMap
                  mapAccordion={mapAccordion}
                  mapAccordionToggle={mapAccordionToggle}
                  onMarker={onMarker}
                  onMarkerTrue={onMarkerTrue}
                  onMarkerFalse={onMarkerFalse}
                  selectedValues={selectedValues}
                  handleSelectedValues={handleSelectedValues}
                />
              </div>
            </div>
          </div>
          <>
            <div className='truncate flex justify-center sticky top-16 z-30 px-5'>
              <div className='w-[1000px] shadow-md'>
                <Popups trigger={
                  <BoardList selectedValues={selectedValues} />
                } title={<FilterDialogsTitle />} content={<FilterDialogsContent selectedValues={selectedValues} handleSelectedValues={handleSelectedValues} />} />
              </div>
            </div>
            <SwipeableViews>
              {messageLoaded &&
                <>
                  <CardsList choose={1} messages={messages} selectedValues={selectedValues} userObj={userObj} />
                  <CardsList choose={2} messages={messages} selectedValues={selectedValues} userObj={userObj} />
                </>
              }
            </SwipeableViews>
          </>
        </div>
        :
        <SwipeableViews>
          <LayoutBoard borrow={true} />
          <LayoutBoard borrow={false} />
        </SwipeableViews>
      }
      <div onClick={(e) => handleMail(e)}>mail</div>
    </div>
  );
}

export default Board;
