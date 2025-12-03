import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LinearProgress } from '@mui/material'
import { Scroll } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ScrollProgress } from 'src/components/motion-primitives/scroll-progress'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog'
import useLargeMedia from 'src/hooks/useLargeMedia'
import DrawersBar from 'src/pages/core/DrawersBar'

interface Props {
  trigger: React.ReactNode
  title: React.ReactNode
  content: React.ReactNode
  close?: React.ReactNode
  attachment?: boolean
  onLink?: boolean
  progress?: boolean
}
const SignUpPopups = ({
  trigger,
  title,
  content,
  close = null,
  attachment = false,
  onLink = false,
}: Props) => {
  const [progress, setProgress] = useState(0)
  const largeMedia = useLargeMedia()
  const docRef = useRef(null)
  const docsRef = useRef(null)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = docRef.current.scrollTop
      const scrollHeight = docRef.current.scrollHeight
      const clientHeight = docRef.current.clientHeight
      const scrollPercentage = scrollTop/(scrollHeight-clientHeight)*100
      setProgress(scrollPercentage)
    }
    if (docRef.current) {
      docRef.current.addEventListener('scroll', handleScroll)
      return () => docRef.current.removeEventListener('scroll', handleScroll)
    }
  }, [docRef.current])
  if (largeMedia) {
    return (
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger className="w-full">{trigger}</DialogTrigger>
          <DialogContent className="bg-light-2 dark:bg-dark-2 max-h-[75vh] min-w-[850px]">
            <ScrollArea className="overflow-y-scroll absolute" ref={docRef}>
              <LinearProgress sx={{positon: 'fixed', top: '10px', left: 0, width: '100%'}} variant='determinate' value={progress} />
              {/* <ScrollProgress
                containerRef={docRef}
                className="fixed top-5 bg-[#0090FF]"
              /> */}
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
            {/* <ScrollArea className="overflow-y-scroll" ref={docRef}>
            </ScrollArea> */}
          </DialogContent>
        </Dialog>
      </div>
    )
  }
  return (
    <div className="flex justify-center">
      <Drawer>
        <DrawerTrigger className="w-full">{trigger}</DrawerTrigger>
        <DrawerContent className="bg-light-2 dark:bg-dark-2 max-h-[75vh]">
          <ScrollArea className="overflow-y-scroll absolute" ref={docsRef}>
            <LinearProgress sx={{positon: 'fixed', top: '10px', left: 0, width: '100%'}} variant='determinate' value={progress} />
            {/* <ScrollProgress
              containerRef={docsRef}
              className="fixed top-5 bg-[#0090FF]"
            /> */}
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

export default SignUpPopups
