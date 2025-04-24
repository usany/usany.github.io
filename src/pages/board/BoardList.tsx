import { User } from "firebase/auth";
import { useSelectors } from "src/hooks/useSelectors";
import FilterDialogs from "src/pages/board/FilterDialogs/FilterDialogs";
import { useImmer } from "use-immer";
// import { AlarmCheck, AlertCircle, Building, Clock, DoorOpen, MessagesSquare, Pen, PenBox, Pencil, PenSquare, PenTool, Presentation, Search, SearchCheck, SearchCode, SearchSlash, Siren, TowerControl, Umbrella, UserCheck, UserRound, Watch } from "lucide-react";

const cardList = {
  ko: '카드 목록',
  en: 'Card list'
}
interface Props {
  userObj: User | null;
}

function BoardList() {
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

  return (
    <div className="rounded shadow-md flex p-3 sticky top-16 z-30 justify-between bg-light-2/50 dark:bg-dark-2/50">
      <div className="truncate pt-1">{cardList[index]}</div>
      <div className="truncate flex gap-1">
        <FilterDialogs
          selectedValues={selectedValues}
          handleSelectedValues={handleSelectedValues}
        />
      </div>
    </div>
  );
}

export default BoardList;
