import { useState } from "react";
import useTexts from "src/hooks/useTexts";
import AuthForm from "src/pages/main/auth/AuthForm";
import AuthMethods from "./AuthMethods";
import Playlist from "src/pages/core/Playlist";
import useLargeMedia from "src/hooks/useLargeMedia";

function AuthDialogsContent({changeProgress}) {
  const [agreed, setAgreed] = useState(false)
  const changeAgreed = () => {
    setAgreed(!agreed)
  }
  const largeMedia = useLargeMedia()
  // const {onlyTakesOneMinuteToRegisterAccount, playlistReadyForYouToGetRidOfBoredom} = useTexts()
  return (
    <div className={`${!largeMedia && 'w-full'}`}>
      {/* <div className="flex flex-col p-3">
        {onlyTakesOneMinuteToRegisterAccount}
        {playlistReadyForYouToGetRidOfBoredom}
      </div>
      <div className="flex justify-center pt-3">
        <Playlist />
      </div> */}
      <AuthMethods agreed={agreed} changeAgreed={changeAgreed} changeProgress={changeProgress}/>
      <AuthForm signIn={false} agreed={agreed} />
    </div>
  );
}

export default AuthDialogsContent;
