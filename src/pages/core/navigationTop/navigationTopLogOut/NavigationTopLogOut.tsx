import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

const NavigationTopLogOut = () => {

  return (
    <div>
      <Link to="/">
        <div className="pt-5 min-w-36">로그인을 해 주세요</div>
      </Link>
      <Divider sx={{ width: "100%" }} />
    </div>
  );
};

export default NavigationTopLogOut;
