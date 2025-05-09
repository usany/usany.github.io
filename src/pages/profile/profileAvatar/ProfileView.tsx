import BeachAccess from "@mui/icons-material/BeachAccess";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import LoadingsSkeletons from "src/components/recycle/recycleLoadingsSkeletons";
import Avatars from "src/pages/core/Avatars";

const ProfileView = ({ userObj, user, changeAttachment }) => {
  const profileColor = useSelector((state) => state.profileColor.value);
  const profileUrl = useSelector((state) => state.profileUrl.value);
  // const profileImage = useSelector((state) => state.profileImage.value);
  // const [profile, setProfile] = useState(null)
  // console.log(profileUrl)
  // useEffect(() => {
  //   if (profileImage) {
  //     setProfile(profileUrl)
  //   } else {
  //     setProfile(staticImage)
  //   }
  // }, [profileUrl])
  return (
    <div onClick={() => {
      changeAttachment('')
    }}>
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
        >
          {profileUrl ? (
            <Avatars
              user={user}
              uid={user.uid}
              piazza={null}
              profile={true}
              profileColor=""
              profileUrl={user.profileImageUrl}
              defaultProfileUrl={user.defaultProfile}
            />
          ) : (
            <LoadingsSkeletons height={"[192px]"} width={"[192px]"} />
          )}
        </Badge>
      ) : (
        <>
          {user?.profileImageUrl ? (
            <Avatars
              user={user}
              uid={user.uid}
              piazza={null}
              profile={true}
              profileColor=""
              profileUrl={user.profileImageUrl}
              defaultProfileUrl={user.defaultProfile}
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
