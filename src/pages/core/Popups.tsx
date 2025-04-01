import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import BeachAccess from "@mui/icons-material/BeachAccess";
import Badge from "@mui/material/Badge";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSelector } from "react-redux";
import LoadingsSkeletons from "src/components/recycle/recycleLoadingsSkeletons";
import { Dialog, DialogContent, DialogTrigger } from 'src/components/ui/dialog';
import useLargeMedia from "src/hooks/useLargeMedia";
import Avatars from "src/pages/core/Avatars";
import DrawersBar from "src/pages/core/DrawersBar";
import ProfileDialogs from "../profile/profileAvatar/profileDialogs/ProfileDialogs";

const ProfileAvatar = ({ userObj, user, handleProfileDialog, profileDialog, attachment, changeAttachment, handleClose }) => {
  const profileColor = useSelector((state) => state.profileColor.value);
  const profileUrl = useSelector((state) => state.profileUrl.value);
  const largeMedia = useLargeMedia()

  if (largeMedia) {
    return (
      <div className='flex justify-center'>
        <Dialog>
          <DialogTrigger>
            <>
              {user.uid === userObj.uid ? (
                <Badge
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <button
                      className="p-1 bg-transparent border-dashed border-2"
                    // onClick={handleProfileDialog}
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
            </>
          </DialogTrigger>
          <DialogContent className='bg-light-2 dark:bg-dark-2'>
            <ScrollArea className="overflow-y-scroll">
              <DrawersBar />
              <ProfileDialogs
                userObj={userObj}
                profileDialog={profileDialog}
                attachment={attachment}
                changeAttachment={(newState: string) => setAttachment(newState)}
                handleClose={handleClose}
              />
              {/* <div className="flex flex-col items-center pt-5">
              <Avatars
                uid={userObj.uid}
                profile={true}
                profileColor={profileColor}
                profileUrl={profileUrl}
              />
              <div>{message?.displayName}</div>
            </div>
            <div className="flex justify-center p-5">
            </div> */}
            </ScrollArea>
          </DialogContent>
        </Dialog >
      </div>
    )
  }
  return (
    <div className="flex justify-center">
      <Drawer>
        <DrawerTrigger>
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
                  profileUrl={user?.profileImageUrl}
                />
              ) : (
                <LoadingsSkeletons height={"[192px]"} width={"[192px]"} />
              )}
            </>
          )}
        </DrawerTrigger>
        <DrawerContent className='bg-light-2 dark:bg-dark-2'>
          <ScrollArea className="overflow-y-scroll">
            <DrawersBar />
            <ProfileDialogs
              userObj={userObj}
              profileDialog={profileDialog}
              attachment={attachment}
              changeAttachment={(newState: string) => setAttachment(newState)}
              handleClose={handleClose}
            />
            {/* <div className="flex flex-col items-center pt-5">
              <Avatars
                uid={userObj.uid}
                profile={true}
                profileColor={profileColor}
                profileUrl={profileUrl}
              />
              <div>{message?.displayName}</div>
            </div>
            <div className="flex justify-center p-5">
            </div> */}
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ProfileAvatar;
