import useTexts from "src/hooks/useTexts";
import Popups from "src/pages/core/Popups";
import AuthDialogsContent from "./AuthDialogsContent";
import AuthDialogsContentPassword from "./AuthDialogsContentPassword";
import AuthDialogsTrigger from "./AuthDialogsTrigger";
import { useState } from "react";

function AuthDialogs() {
  const {findPassword, welcomeToKhusan} = useTexts()
  const [progress, setProgress] = useState(false)
  const changeProgress = () => setProgress(!progress)
  const progressFalse = () => setProgress(false)
  return (
    <div className='flex justify-center text-xs p-5 gap-5'>
      <Popups trigger={<AuthDialogsTrigger findingPassword={true}/>}
        title={findPassword}
        content={<AuthDialogsContentPassword />}
      />
      <div className='flex items-center text-xl'>|</div>
      <Popups trigger={<AuthDialogsTrigger findingPassword={false} progressFalse={progressFalse}/>}
        title={welcomeToKhusan}
        content={<AuthDialogsContent changeProgress={changeProgress}/>}
        progress={progress}
      />
    </div>
  );
}

export default AuthDialogs;
