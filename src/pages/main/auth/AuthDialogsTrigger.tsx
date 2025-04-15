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

function AuthDialogsTrigger() {
  const theme = useSelector((state) => state.theme);
  const languages = useSelectors((state) => state.languages.value)
  return (
    <>
      <div className="flex justify-center w-screen text-xs p-5">
        <Divider sx={{ width: "25%", padding: "5px" }} />
        <div className="px-5">{languages === 'ko' ? '회원가입' : 'Register'}</div>
        <Divider sx={{ width: "25%", padding: "5px" }} />
      </div>
    </>
  );
}

export default AuthDialogsTrigger;
