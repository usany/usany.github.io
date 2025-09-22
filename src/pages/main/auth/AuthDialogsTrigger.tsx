import { useTexts } from "src/hooks";

function AuthDialogsTrigger({findingPassword}) {
  const {findPassword, newAccount} = useTexts()
  return (
    <>
      {findingPassword ? findPassword : newAccount}
    </>
  );
}

export default AuthDialogsTrigger;
