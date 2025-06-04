import Card from "@mui/material/Card";
import { useSelector } from "react-redux";
import {
  Link
} from "react-router-dom";
import { useSelectors } from "src/hooks/useSelectors";
import useCardsBackground from "../../hooks/useCardsBackground";
import Popups from "../core/Popups";
import ProfileMembersDrawersContent from "./ProfileMembersDrawersContent";
import ProfileMembersDrawersTitle from "./ProfileMembersDrawersTitle";
import ProfileMembersDrawersTrigger from "./ProfileMembersDrawersTrigger";
import ProfileMembersPasswordTrigger from "./ProfileMembersPasswordTrigger";

const ProfileMembers = ({ userObj, user }) => {
  const theme = useSelector((state) => state.theme.value)
  const { color } = useCardsBackground()
  const languages = useSelectors((state) => state.languages.value)
  return (
    <div className="flex flex-col p-5">
      {user.uid === userObj.uid ? (
        <div className="flex justify-center">
          {/* <Card sx={{ width: "50%" }}>
            <div
              className="flex justify-center p-5"
              onClick={() => {
                document.getElementById("member")?.click();
              }}
            >
              회원 탈퇴
            </div>
          </Card> */}
          <Popups trigger={<ProfileMembersPasswordTrigger />} title={<div>비밀번호 변경</div>} content={<ProfileMembersDrawersContent userObj={userObj} user={user} />} />
          <Popups trigger={<ProfileMembersDrawersTrigger />} title={<ProfileMembersDrawersTitle />} content={<ProfileMembersDrawersContent userObj={userObj} user={user} />} />
          {/* <ProfileMembersDrawers userObj={userObj} user={user} /> */}
        </div>
      ) : (
        <Link to="/contact" state={{ user: user }}>
          <div className="flex justify-center">
            <Card sx={{ width: "50%", bgcolor: color }}>
              <div className="flex justify-center p-5">{languages === 'ko' ? '신고하기' : 'Report'}</div>
            </Card>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ProfileMembers;
