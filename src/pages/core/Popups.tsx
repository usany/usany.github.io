import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSelector } from "react-redux";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from 'src/components/ui/dialog';
import useLargeMedia from "src/hooks/useLargeMedia";
import DrawersBar from "src/pages/core/DrawersBar";

const Popups = ({ trigger, title, content, close, attachment, onLink }) => {
  const profileColor = useSelector((state) => state.profileColor.value);
  const profileUrl = useSelector((state) => state.profileUrl.value);
  const largeMedia = useLargeMedia()
  console.log(onLink?.state)
  if (largeMedia) {
    return (
      <div className='flex justify-center'>
        <Dialog>
          <DialogTrigger>
            {trigger}
          </DialogTrigger>
          <DialogContent className='bg-light-2 dark:bg-dark-2 h-[50vh]'>
            <ScrollArea className="overflow-y-scroll">
              <DrawersBar />
              <DialogTitle className='flex justify-center p-5'>{title}</DialogTitle>
              {content}
              {attachment && <div className='flex justify-center p-5'>
                {onLink ?
                  <div>
                    {close}
                  </div>
                  :
                  <DialogClose>{close}</DialogClose>
                }
              </div>}
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
          {trigger}
        </DrawerTrigger>
        <DrawerContent className='bg-light-2 dark:bg-dark-2 max-h-[50vh]'>
          <ScrollArea className="overflow-y-scroll">
            <DrawersBar />
            <DrawerTitle className='flex justify-center p-5'>{title}</DrawerTitle>
            {content}
            {attachment && <div className='flex justify-center p-5'>
              {onLink ?
                <div>
                  {close}
                </div>
                :
                <DrawerClose>{close}</DrawerClose>
              }
            </div>}
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

export default Popups;
