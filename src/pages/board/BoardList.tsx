import { User } from "firebase/auth";
import { ScrollText } from "lucide-react";
import { useSelectors } from "src/hooks/useSelectors";
import FilterDialogs from "src/pages/board/FilterDialogs/FilterDialogs";
// import { AlarmCheck, AlertCircle, Building, Clock, DoorOpen, MessagesSquare, Pen, PenBox, Pencil, PenSquare, PenTool, Presentation, Search, SearchCheck, SearchCode, SearchSlash, Siren, TowerControl, Umbrella, UserCheck, UserRound, Watch } from "lucide-react";

const cardList = {
  ko: '카드 목록',
  en: 'Card list'
}
interface Props {
  userObj: User | null;
}

function BoardList({ selectedValues }) {
  // const [selectedValues, setSelectedValues] = useImmer([
  //   {
  //     id: "selectedValueOne",
  //     value: "전체 아이템",
  //   },
  //   {
  //     id: "selectedValueTwo",
  //     value: "전체 장소",
  //   },
  //   {
  //     id: "selectedValueThree",
  //     value: "최신순",
  //   },
  // ]);
  const languages = useSelectors((state) => state.languages.value)
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'

  return (
    <div className="rounded shadow-md flex p-3 justify-between bg-light-2/50 dark:bg-dark-2/50">
      <div className="truncate pt-1">
        <div className='flex gap-5'>
          <ScrollText />{cardList[index]}
        </div>
      </div>
      <div className="truncate flex gap-1">
        <FilterDialogs
          selectedValues={selectedValues}
        />
      </div>
    </div>
  );
}

export default BoardList;
