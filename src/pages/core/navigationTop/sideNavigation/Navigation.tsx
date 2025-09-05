import {
  DoorOpen,
  Film,
  MessagesSquare,
  SearchCheck,
  Siren,
  UserRound,
} from 'lucide-react'
import staticImage from 'src/assets/blue.png'
import { auth } from 'src/baseApi/serverbase'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from 'src/components/ui/drawer'
import { useId, useState } from 'react';
import { useSelectors } from 'src/hooks'
import Avatars from '../../Avatars'
import IframePlayer from './iframePlayer/IframePlayer'
import Links from './links/Links'
import NavigationSignedIn from './navigationSignedIn/NavigationSignedIn'
import NavigationSignedOut from './navigationSignedOut/NavigationSignedOut'
import { useTexts } from 'src/hooks'
interface Props {
  handleSideNavigation: () => void
}

function Navigation() {
  const theme = useSelectors((state) => state.theme.value)
  const linkId = useId();
  const { myProfile, userRanking, groupChat, report, collection, signOut } = useTexts()
  const profile = useSelectors((state) => state.profile.value)
  const onLine = useSelectors((state) => state.onLine.value)
  const { needNetworkConnection } = useTexts()

  const links = [
    {
      href: '/profile',
      passingState: null,
      icon: <UserRound />,
      description: myProfile,
    },
    {
      href: '/ranking',
      passingState: null,
      icon: <SearchCheck />,
      description: userRanking,
    },
    {
      href: '/piazza',
      passingState: { conversation: 'piazza', multiple: true },
      icon: <MessagesSquare />,
      description: groupChat,
    },
    {
      href: '/contact',
      passingState: { multiple: true },
      icon: <Siren />,
      description: report,
    },
    {
      href: '/collection',
      passingState: { multiple: true },
      icon: <Film />,
      description: collection,
    },
    {
      href: '/',
      passingState: { multiple: true },
      icon: <DoorOpen />,
      description: signOut,
    },
  ]
  return (
    <Drawer direction="left">
      <DrawerTrigger className="px-5">
        <Avatars element={profile?.certificated ? profile : { defaultProfile: staticImage }} piazza={null} profile={false} />
      </DrawerTrigger>
      <DrawerContent className="border-none bg-light-2 dark:bg-dark-2 right-auto top-0 mt-0 w-[355px] overflow-hidden rounded-[10px]">
        <nav className="flex flex-col justify-between w-[350px]">
          {profile?.certificated ? <NavigationSignedIn /> : <NavigationSignedOut />}
          {onLine ? (
            <div className="flex flex-col justify-between pt-5 gap-5">
              {links.map((value) => {
                const drawerLinks = (
                  <DrawerClose key={`${linkId}-${value.href}`}>
                    <Links
                      href={value.href}
                      passingState={value.passingState}
                      icon={value.icon}
                      description={value.description}
                    />
                  </DrawerClose>
                )
                if ((!['/contact', '/'].includes(value.href) && profile?.certificated) ||
                    (value.href === '/' && profile) ||
                    value.href === '/contact') {
                  return drawerLinks;
                }
                return null
              })}
            </div>
          ) : (
            <div className="flex justify-center pt-5 gap-5">
              {needNetworkConnection}
            </div>
          )}
          {profile?.certificated && onLine && <IframePlayer mode={theme} />}
        </nav>
      </DrawerContent>
    </Drawer>
  )
}

export default Navigation
