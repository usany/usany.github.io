import useTexts from "src/hooks/useTexts";

interface Props {
  findingPassword: boolean
  progressFalse: () => void
}
function AuthDialogsTrigger({progressFalse}: Props) {
  const {newAccount} = useTexts()
  return (
    <button className='h-full' onClick={progressFalse}>
      {newAccount}
    </button>
  );
}

export default AuthDialogsTrigger;
