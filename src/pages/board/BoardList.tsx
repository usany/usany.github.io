import { ScrollText } from "lucide-react";
import { useSelectors, useTexts } from "src/hooks";
import FilterDialogsTrigger from "./FilterDialogs/FilterDialogsTrigger";


function BoardList() {
  const {cardList} = useTexts()

  return (
    <div className="rounded shadow-md flex p-3 justify-between bg-light-2/50 dark:bg-dark-2/50">
      <div className="truncate pt-1">
        <div className='flex gap-5'>
          <ScrollText />{cardList}
        </div>
      </div>
      <div className="truncate flex gap-1">
        <FilterDialogsTrigger />
      </div>
    </div>
  );
}

export default BoardList;
