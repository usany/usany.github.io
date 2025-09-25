import { useSelectors, useTexts } from "src/hooks";
import Steppers from "src/pages/add/Steppers";

interface Props {
  message: {};
  round: number
}

function SpecificsSteppers({ message, round }: Props) {
  const {process} = useTexts()
  return (
    <div className="flex flex-col gap-1">
      <div className="flex pt-5">{process} {message.round}</div>
      <Steppers message={message} />
    </div>
  );
}

export default SpecificsSteppers;
