import { useTexts } from "src/hooks";
import Popups from "src/pages/core/Popups";
import AuthDialogsContent from "./AuthDialogsContent";
import AuthDialogsContentPassword from "./AuthDialogsContentPassword";
import AuthDialogsTrigger from "./AuthDialogsTrigger";
import AuthDialogsTriggerPassword from "./AuthDialogsTriggerPassword";

function AuthDialogs() {
  const {findPassword, welcomeToKhusan} = useTexts()
  return (
    <div className='flex justify-center text-xs p-5 gap-5'>
      <Popups trigger={<AuthDialogsTriggerPassword findingPassword={true}/>}
        title={findPassword}
        content={<AuthDialogsContentPassword />}
      />
      <div className='flex items-center text-xl'>|</div>
      <Popups trigger={<AuthDialogsTrigger findingPassword={false}/>}
        title={welcomeToKhusan}
        content={<AuthDialogsContent />}
      />
    </div>
  );
}

export default AuthDialogs;
