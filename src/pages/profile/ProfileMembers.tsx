import Card from "@mui/material/Card";
import {
  Link
} from "react-router-dom";
import ProfileMembersDrawers from "src/pages/profile/ProfileMembersDrawers";

const ProfileMembers = ({ userObj, user }) => {
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
          <ProfileMembersDrawers userObj={userObj} user={user} />
        </div>
      ) : (
        <Link to="/contact" state={{ user: user }}>
          <div className="flex justify-center">
            <Card sx={{ width: "50%" }}>
              <div className="flex justify-center p-5">신고하기</div>
            </Card>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ProfileMembers;
