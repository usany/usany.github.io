import Card from "@mui/material/Card";
import { useSelector } from "react-redux";
import {
  Link
} from "react-router-dom";
import ProfileMembersDrawers from "src/pages/profile/ProfileMembersDrawers";

const ProfileMembers = ({ userObj, user }) => {
  const theme = useSelector((state) => state.theme)

  return (
    <div className="flex flex-col p-5">
      {user.uid === userObj.uid ? (
        <div className="flex justify-center">
          <ProfileMembersDrawers userObj={userObj} user={user} />
        </div>
      ) : (
        <Link to="/contact" state={{ user: user }}>
          <div className="flex justify-center">
            <Card sx={{ width: "50%", bgcolor: theme === 'dark' ? '#5c6778' : '' }}>
              <div className="flex justify-center p-5">신고하기</div>
            </Card>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ProfileMembers;
