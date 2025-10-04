import useTexts from "src/hooks/useTexts";

interface Props {
  findingPassword: boolean
}
function AuthDialogsTrigger({findingPassword}: Props) {
  const {findPassword, newAccount} = useTexts()
  return (
    <>
      {findingPassword ? findPassword : newAccount}
    </>
  );
}

export default AuthDialogsTrigger;
