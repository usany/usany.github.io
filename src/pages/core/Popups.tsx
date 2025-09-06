import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog'
import useLargeMedia from 'src/hooks/useLargeMedia'
import DrawersBar from 'src/pages/core/DrawersBar'

const Popups = ({ trigger, title, content, close, attachment, onLink }) => {

  const largeMedia = useLargeMedia()
  if (largeMedia) {
    return (
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger className='w-full'>{trigger}</DialogTrigger>
          <DialogContent className="bg-light-2 dark:bg-dark-2 h-[50vh]">
            <ScrollArea className="overflow-y-scroll">
              <DrawersBar />
              <DialogTitle className="flex justify-center p-5">
                {title}
              </DialogTitle>
              {content}
              {attachment && (
                <div className="flex justify-center p-5">
                  {onLink ? (
                    <div>{close}</div>
                  ) : (
                    <DialogClose>{close}</DialogClose>
                  )}
                </div>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
  return (
    <div className="flex justify-center">
      {/* <Drawer direction="left">
        <DrawerTrigger>{trigger}</DrawerTrigger>
        <DrawerContent className="bg-light-2 dark:bg-dark-2 right-auto top-0 mt-0 w-[310px] overflow-hidden rounded-[10px]">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
 */}
      <Drawer>
        <DrawerTrigger className='w-full'>{trigger}</DrawerTrigger>
        <DrawerContent className="bg-light-2 dark:bg-dark-2 max-h-[75vh]">
          <ScrollArea className="overflow-y-scroll">
            <DrawersBar />
            <DrawerTitle className="flex justify-center p-5">
              {title}
            </DrawerTitle>
            {content}
            {attachment && (
              <div className="flex justify-center p-5">
                {onLink ? (
                  <div>{close}</div>
                ) : (
                  <DrawerClose>{close}</DrawerClose>
                )}
              </div>
            )}
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Popups
