import BeachAccess from "@mui/icons-material/BeachAccess";
import Badge from "@mui/material/Badge";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSelector } from "react-redux";
import LoadingsSkeletons from "src/components/recycle/recycleLoadingsSkeletons";
import { Dialog, DialogContent, DialogTrigger } from 'src/components/ui/dialog';
import useLargeMedia from "src/hooks/useLargeMedia";
import Avatars from "src/pages/core/Avatars";
import DrawersBar from "src/pages/core/DrawersBar";

const ProfileAvatar = ({ userObj, user, handleProfileDialog }) => {
  const profileColor = useSelector((state) => state.profileColor.value);
  const profileUrl = useSelector((state) => state.profileUrl.value);
  const largeMedia = useLargeMedia()

  if (largeMedia) {
    return (
      <Dialog>
        <DialogTrigger>
        </DialogTrigger>
        <DialogContent>
          <ScrollArea className="overflow-y-scroll">
            <DrawersBar />
            <div className="flex flex-col items-center pt-5">
              <Avatars
                uid={message.creatorId}
                profile={true}
                profileColor=""
                profileUrl={message.creatorUrl}
                piazza={null}
              />
              <div>{message?.displayName}</div>
            </div>
            <div className="flex justify-center p-5">
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <div className="flex justify-center">
      {user.uid === userObj.uid ? (
        <Badge
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <button
              className="p-1 bg-transparent border-dashed border-2"
              onClick={handleProfileDialog}
            >
              <BeachAccess />
            </button>
          }
        >
          {profileUrl ? (
            <Avatars
              uid={userObj.uid}
              profile={true}
              profileColor={profileColor}
              profileUrl={profileUrl}
            // profileImage={profileImage}
            />
          ) : (
            <LoadingsSkeletons height={"[192px]"} width={"[192px]"} />
          )}
        </Badge>
      ) : (
        <>
          {user?.profileImageUrl ? (
            <Avatars
              uid={userObj.uid}
              profile={true}
              profileColor={user.profileColor}
              profileImage={user?.profileImageUrl}
            />
          ) : (
            <LoadingsSkeletons height={"[192px]"} width={"[192px]"} />
          )}
        </>
      )}
    </div>
  );
};

export default ProfileAvatar;
