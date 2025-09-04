import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { useSelectors } from "src/hooks";

const NavigationTopLogOut = () => {
  const languages = useSelectors((state) => state.languages.value)
  return (
    <>
      <Link to="/">
        <div className="pt-5 min-w-36">{languages === 'ko' ? '로그인을 해 주세요' : 'Please sign in'}</div>
      </Link>
      <Divider sx={{ width: "100%" }} />
    </>
  );
};

export default NavigationTopLogOut;
