import { User } from "firebase/auth";
import { ScrollText } from "lucide-react";
import { useSelectors } from "src/hooks";
import FilterDialogs from "src/pages/board/FilterDialogs/FilterDialogs";
import FilterDialogsTitle from "./FilterDialogs/FilterDialogsTitle";
import FilterDialogsTrigger from "./FilterDialogs/FilterDialogsTrigger";

const cardList = {
  ko: '카드 목록',
  en: 'Card list'
}
interface Props {
  userObj: User | null;
}

function BoardList({ selectedValues }) {

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
        <FilterDialogsTrigger />
      </div>
    </div>
  );
}

export default BoardList;
