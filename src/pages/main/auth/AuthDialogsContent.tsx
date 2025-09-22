import { useState } from "react";
import { useSelectors, useTexts } from "src/hooks";
import AuthForm from "src/pages/main/auth/AuthForm";
import AuthMethods from "./AuthMethods";

export const Playlist = () => {
  const theme = useSelectors((state) => state.theme.value);
  return (
    <iframe
      src={import.meta.env.VITE_SPOTIFY_URL+`${theme !== 'light' ? '&theme=0' : ''}`}
      width="90%"
      height="200"
      allow="autoplay; clipboard-write; fullscreen; picture-in-picture"
      loading="lazy"
    />
  )
}
function AuthDialogsContent() {
  const [agreed, setAgreed] = useState(false)
  const changeAgreed = () => {
    setAgreed(!agreed)
  }
  const {onlyTakesOneMinuteToRegisterAccount, playlistReadyForYouToGetRidOfBoredom} = useTexts()
  return (
    <div>
      <AuthMethods agreed={agreed} changeAgreed={changeAgreed} />
      <div className="flex flex-col p-3">
        {onlyTakesOneMinuteToRegisterAccount}
            {playlistReadyForYouToGetRidOfBoredom}
      </div>
      <div className="flex justify-center pt-3">
        <Playlist />
      </div>
      <AuthForm signIn={false} agreed={agreed} />
    </div>
  );
}

export default AuthDialogsContent;
