import { useSelector } from "react-redux";
import { useSelectors } from "src/hooks/useSelectors";
import AuthForm from "src/pages/main/auth/AuthForm";

function AuthDialogsContentPassword() {
  const theme = useSelector((state) => state.theme.value);
  const languages = useSelectors((state) => state.languages.value)
  return (
    <div>
      <div className="p-3">
        {languages === 'ko' ?
          <div>비밀번호 재설정 메일을 보내드릴게요</div>
          :
          <div>We will send you a password reset email</div>
        }
      </div>
      <AuthForm signIn={false} />
    </div>
  );
}

export default AuthDialogsContentPassword;
