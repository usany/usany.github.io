import BeachAccess from "@mui/icons-material/BeachAccess";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import LoadingsSkeletons from "src/components/recycle/recycleLoadingsSkeletons";
import Avatars from "src/pages/core/Avatars";

const ProfileView = ({ userObj, user, changeAttachment }) => {
  const profileUrl = useSelector((state) => state.profileUrl.value);
  const profile = useSelector((state) => state.profile.value)
  return (
    <div>
      {user.uid === userObj.uid ? (
        <Badge
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <button
              className="p-1 bg-transparent border-dashed border-2"
            >
              <BeachAccess />
            </button>
          }
          onClick={() => changeAttachment(null)}
        >
          {profileUrl ? (
            <Avatars
              element={profile}
              piazza={null}
              profile={true}
            />
          ) : (
            <LoadingsSkeletons height={"[192px]"} width={"[192px]"} />
          )}
        </Badge>
      ) : (
        <>
          {user?.profileImageUrl ? (
            <Avatars
              element={user}
              piazza={null}
              profile={true}
            />
          ) : (
            <LoadingsSkeletons height={"[192px]"} width={"[192px]"} />
          )}
        </>
      )}
    </div>
  )
};

export default ProfileView;
