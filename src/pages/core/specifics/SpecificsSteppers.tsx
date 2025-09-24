import { useSelectors } from "src/hooks";
import Steppers from "src/pages/add/Steppers";
// import { CardActionArea, CardActions } from '@mui/material';
// import { useBottomNavigationStore } from 'src/store'

interface Props {
  message: {};
}

function SpecificsSteppers({ message, round }: Props) {
  const languages = useSelectors((state) => state.languages.value)
  return (
    <div className="flex flex-col gap-1">
      <div className="flex pt-5">{languages === 'ko' ? '진행 단계:' : 'Process:'} {round}</div>
      <Steppers message={message} round={round} />
    </div>
  );
}

export default SpecificsSteppers;
