import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts';
import Steppers from "src/pages/add/Steppers";

interface Props {
  message: {};
  issue: boolean
}

function SpecificsSteppers({ message, issue }: Props) {
  const {process} = useTexts()
  return (
    <div className="flex flex-col gap-1">
      <div className="flex pt-5">{process} {message.round}</div>
      <Steppers message={message} issue={issue} />
    </div>
  );
}

export default SpecificsSteppers;
