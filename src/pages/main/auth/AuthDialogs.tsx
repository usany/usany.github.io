// import { useSelector } from "react-redux";
import { useSelectors } from "src/hooks";
import Popups from "src/pages/core/Popups";
import AuthDialogsContent from "./AuthDialogsContent";
import AuthDialogsContentPassword from "./AuthDialogsContentPassword";
import AuthDialogsTrigger from "./AuthDialogsTrigger";
import AuthDialogsTriggerPassword from "./AuthDialogsTriggerPassword";

function AuthDialogs() {
  // const theme = useSelector((state) => state.theme.value);
  const languages = useSelectors((state) => state.languages.value)
  return (
    <div className='flex justify-center text-xs p-5 gap-5'>
      <Popups trigger={<AuthDialogsTriggerPassword />}
        title={<div>{languages === 'ko' ? '비밀번호 찾기' : 'Find Password'}</div>}
        content={<AuthDialogsContentPassword />}
      />
      <div className='flex items-center text-xl'>|</div>
      <Popups trigger={<AuthDialogsTrigger />}
        title={<div>{languages === 'ko' ? '환영합니다' : 'Welcome'}</div>}
        content={<AuthDialogsContent />}
      />
    </div>
  );
}

export default AuthDialogs;
