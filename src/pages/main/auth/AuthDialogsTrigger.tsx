import useTexts from "src/hooks/useTexts";

interface Props {
  findingPassword: boolean
  progressFalse: () => void
}
function AuthDialogsTrigger({findingPassword, progressFalse}: Props) {
  const {findPassword, newAccount} = useTexts()
  return (
    <button onClick={progressFalse}>
      {findingPassword ? findPassword : newAccount}
    </button>
  );
}

export default AuthDialogsTrigger;
