import { useState } from "react";
import { useTexts } from "src/hooks";
import AuthForm from "src/pages/main/auth/AuthForm";
import AuthMethods from "./AuthMethods";
import Playlist from "src/pages/core/Playlist";

function AuthDialogsContent() {
  const [agreed, setAgreed] = useState(false)
  const changeAgreed = () => {
    setAgreed(!agreed)
  }
  const {onlyTakesOneMinuteToRegisterAccount, playlistReadyForYouToGetRidOfBoredom} = useTexts()
  return (
    <>
      <AuthMethods agreed={agreed} changeAgreed={changeAgreed} />
      <div className="flex flex-col p-3">
        {onlyTakesOneMinuteToRegisterAccount}
        {playlistReadyForYouToGetRidOfBoredom}
      </div>
      <div className="flex justify-center pt-3">
        <Playlist />
      </div>
      <AuthForm signIn={false} agreed={agreed} />
    </>
  );
}

export default AuthDialogsContent;
