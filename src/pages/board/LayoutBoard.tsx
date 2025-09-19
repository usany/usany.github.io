import { useEffect, useState } from "react";
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
import { changeBottomNavigation } from "src/stateSlices/bottomNavigationSlice";

interface Props {
  isBorrow: boolean
}
function LayoutBoard({ isBorrow }: Props) {
  const selectedValues = [
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
  ];
  const [mapAccordion, setMapAccordion] = useState(false)
  const mapAccordionToggle = () => setMapAccordion(!mapAccordion)
  const languages = useSelector((state) => state.languages.value)
  const dispatch = useDispatch()
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, []);

  return (
    <div className='flex flex-col h-screen'>
      {isBorrow ?
        <PageTitle title={`빌리기 카드 목록`} />
        :
        <PageTitle title={`빌려주기 카드 목록`} />
      }
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
              {selectedValues.map((element) => {
                return (
                  <Chip label={element.value} />
                )
              })}
            </div>
          </div>
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
