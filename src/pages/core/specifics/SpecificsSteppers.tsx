import Steppers from "src/pages/add/Steppers";
// import { CardActionArea, CardActions } from '@mui/material';
// import { useBottomNavigationStore } from 'src/store'

interface Props {
  message: {};
}

function SpecificsSteppers({ message }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex pt-5">진행 단계: {message.round}</div>
      <Steppers message={message} />
    </div>
  );
}

export default SpecificsSteppers;
