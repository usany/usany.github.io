import Card from "@mui/material/Card";
import {
  Link
} from "react-router-dom";
import { useSelectors } from "src/hooks/useSelectors";
import useCardsBackground from "../../hooks/useCardsBackground";
import Popups from "../core/Popups";
import ProfileMembersDrawersContent from "./ProfileMembersDrawersContent";
import ProfileMembersDrawersTitle from "./ProfileMembersDrawersTitle";
import ProfileMembersDrawersTrigger from "./ProfileMembersDrawersTrigger";
import ProfileMembersPasswordContent from "./ProfileMembersPasswordContent";
import ProfileMembersPasswordTrigger from "./ProfileMembersPasswordTrigger";

const ProfileMembers = ({ userObj, user }) => {
  const { color } = useCardsBackground()
  const languages = useSelectors((state) => state.languages.value)
  return (
    <div className="flex justify-center p-5">
      {user.uid === userObj.uid ? (
        <div className="grid grid-flow-row grid-cols-2 justify-center">
          <Popups trigger={<ProfileMembersPasswordTrigger />} title={<div>비밀번호 변경</div>} content={<ProfileMembersPasswordContent />} />
          <Popups trigger={<ProfileMembersDrawersTrigger />} title={<ProfileMembersDrawersTitle />} content={<ProfileMembersDrawersContent userObj={userObj} user={user} />} />
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
