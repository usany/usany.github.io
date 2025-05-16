import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { useSelectors } from "src/hooks/useSelectors";

function AuthDialogsTrigger() {
  const theme = useSelector((state) => state.theme.value);
  const languages = useSelectors((state) => state.languages.value)
  return (
    <>
      <div className="flex justify-center text-xs p-5">
        <Divider sx={{ width: "15%", padding: "5px" }} />
        <div className="px-5">{languages === 'ko' ? '회원가입' : 'Register'}</div>
        <Divider sx={{ width: "15%", padding: "5px" }} />
      </div>
    </>
  );
}

export default AuthDialogsTrigger;
