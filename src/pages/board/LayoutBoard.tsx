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
import PageTitle from "src/pages/core/pageTitle/PageTitle";
import { useImmer } from "use-immer";
// import { AlarmCheck, AlertCircle, Building, Clock, DoorOpen, MessagesSquare, Pen, PenBox, Pencil, PenSquare, PenTool, Presentation, Search, SearchCheck, SearchCode, SearchSlash, Siren, TowerControl, Umbrella, UserCheck, UserRound, Watch } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeBottomNavigation } from "src/stateSlices/userCertificatedNavigationSlice";

function LayoutBoard({ borrow }) {
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
  // const mapAccordionTrue = () => setMapAccordion(true)
  // const mapAccordionFalse = () => setMapAccordion(false)
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
  const languages = useSelector((state) => state.languages.value)
  const dispatch = useDispatch()
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
        // onSnapshot(
        //   query(collection(dbservice, "num"), orderBy("creatorClock", order)),
        //   (snapshot) => {
        //     const newArray = snapshot.docs.map((document) => {
        //       return {
        //         id: document.id,
        //         ...document.data(),
        //       };
        //     });
        //     setMessages(newArray);
        //   }
        // );
      } else {
        // onSnapshot(
        //   query(collection(dbservice, "num"), orderBy("creatorClock", order)),
        //   (snapshot) => {
        //     const newArray = snapshot.docs.map((document) => {
        //       return {
        //         id: document.id,
        //         ...document.data(),
        //       };
        //     });
        //     setMessages(newArray);
        //   }
        // );
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
    <div className='flex flex-col h-screen'>
      {borrow ?
        <PageTitle title={`빌리기 카드 목록`} />
        :
        <PageTitle title={`빌려주기 카드 목록`} />
      }
      {/* <SwipeableViews>
      </SwipeableViews> */}
      <div className='blur-md'>
        <Accordion type="single" collapsible className="px-3" disabled>
          <AccordionItem value="item-1">
            <AccordionTrigger onClick={() => mapAccordionToggle()}>
              등록 지도
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
        <div>
          <div className="flex p-3 sticky top-16 z-30 justify-between bg-light-3 dark:bg-dark-3">
            <div className="pt-1">카드 목록</div>
            <div className="flex gap-1">
              {/* <FilterDialogs
                selectedValues={selectedValues}
                handleSelectedValues={handleSelectedValues}
              /> */}
              {/* <Chip
                label={selectedValues[0].value}
                disabled
              />
              <Chip
                label={selectedValues[1].value}
                disabled
              />
              <Chip
                label={selectedValues[2].value}
                disabled
              /> */}
              {selectedValues.map((element, index) => {
                return (
                  <Chip label={element.value} />
                  // <Chips key={index} label={element.value} onClick={null} />
                )
              })}
            </div>
          </div>
          {/* <SwipeableViews>
            <CardsList choose={1} messages={messages} selectedValues={selectedValues} userObj={userObj} />
            <CardsList choose={2} messages={messages} selectedValues={selectedValues} userObj={userObj} />
          </SwipeableViews> */}
        </div>
      </div>
      <Link to={'/'}>
        <div className='flex fixed justify-center top-[30%] left-[10%] right-[10%]' onClick={() => dispatch(changeBottomNavigation(1))}>
          <div className='flex rounded bg-light-1 dark:bg-dark-1 w-1/2 p-5 justify-center shadow-md'>{languages === 'ko' ? '로그인이 필요합니다' : 'Need to Sign In'}</div>
        </div>
      </Link>
    </div>
  );
}

export default LayoutBoard;
