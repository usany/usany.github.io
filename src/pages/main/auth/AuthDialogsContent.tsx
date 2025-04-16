import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Divider } from "@mui/material";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSelector } from "react-redux";
import { useSelectors } from "src/hooks/useSelectors";
import DrawersBar from "src/pages/core/DrawersBar";
import Popups from "src/pages/core/Popups";
import AuthForm from "src/pages/main/auth/AuthForm";
import AuthDialogsTrigger from "./AuthDialogsTrigger";

function AuthDialogsContent() {
  const theme = useSelector((state) => state.theme);
  const languages = useSelectors((state) => state.languages.value)
  return (
    <div>
            <div className="p-3">
              {languages === 'ko' ?
                <div>
                  <div>1분이면 계정을 만들 수 있어요</div>
                  <div>지루하지 않게 노래도 준비했어요</div>
                </div>
                :
                <div>
                  <div>Only takes 1minute to register account</div>
                  <div>Playlist ready for you to get rid of boredom</div>
                </div>
              }
            </div>
            <div className="flex justify-center pt-3">
              {theme === "light" ? (
                <iframe
                  src="https://open.spotify.com/embed/playlist/41clCj2piQBL3BSEFQN9J3?utm_source=generator"
                  width="90%"
                  height="200"
                  allow="autoplay; clipboard-write; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              ) : (
                <iframe
                  src="https://open.spotify.com/embed/playlist/41clCj2piQBL3BSEFQN9J3?utm_source=generator&theme=0"
                  width="90%"
                  height="200"
                  allow="autoplay; clipboard-write; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              )}
            </div>
            <AuthForm signIn={false} />
          </div>
  );
}

export default AuthDialogsContent;
