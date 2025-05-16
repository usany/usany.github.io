import { useSelector } from "react-redux";
import { useSelectors } from "src/hooks/useSelectors";
import Popups from "src/pages/core/Popups";
import AuthDialogsContent from "./AuthDialogsContent";
import AuthDialogsTrigger from "./AuthDialogsTrigger";

function AuthDialogs() {
  const theme = useSelector((state) => state.theme.value);
  const languages = useSelectors((state) => state.languages.value)
  return (
    <>
      <Popups trigger={<AuthDialogsTrigger />}
        title={<div>{languages === 'ko' ? '환영합니다' : 'Welcome'}</div>}
        content={<AuthDialogsContent />}
      />
      {/* <Drawer>
        <div className="flex justify-center w-full"> */}
      {/* <Button sx={{width: '100%'}} variant='outlined'>회원가입</Button> */}
      {/* <div className="flex justify-center w-full text-xs p-5">
            <Divider sx={{ width: "25%", padding: "5px" }} />
            <div className="px-5">{languages === 'ko' ? '회원가입' : 'Register'}</div>
            < Divider sx={{ width: "25%", padding: "5px" }} />
          </div>
        </div>
        <DrawerContent className="bg-light-3 dark:bg-dark-3 max-h-[90%]">
          <ScrollArea className="overflow-y-scroll">
            <DrawersBar />
            <DrawerTitle className="flex justify-center pt-5">
              {languages === 'ko' ? '환영합니다' : 'Welcome'}
            </DrawerTitle>
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
          </ScrollArea>
        </DrawerContent>
      </Drawer> */}
    </>
  );
}

export default AuthDialogs;
