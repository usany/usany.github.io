import { User } from 'firebase/auth'
import { doc, DocumentData, onSnapshot } from 'firebase/firestore'
import {
  DoorOpen,
  Film,
  MessagesSquare,
  SearchCheck,
  Siren,
  UserRound,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import staticImage from 'src/assets/blue.png'
// import supabase from 'src/baseApi/base'
import { auth, dbservice } from 'src/baseApi/serverbase'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from 'src/components/ui/drawer'
import { useSelectors } from 'src/hooks/useSelectors'
import texts from 'src/texts.json'
import Avatars from '../../Avatars'
import IframePlayer from './iframePlayer/IframePlayer'
import Links from './links/Links'
import NavigationSignedIn from './navigationSignedIn/NavigationSignedIn'
import NavigationSignedOut from './navigationSignedOut/NavigationSignedOut'
import useTexts from 'src/useTexts'
interface Props {
  userObj: User | null
  handleSideNavigation: () => void
}

const onLogOutClick = async () => {
  auth.signOut()
}
function Navigation({ userObj, handleSideNavigation }: Props) {
  const [points, setPoints] = useState(0)
  const [delayed, setDelayed] = useState(true)
  const theme = useSelectors((state) => state.theme.value)
  const languages = useSelectors((state) => state.languages.value)
  const userCertificated = useSelectors((state) => state.userCertificated.value)
  const profile = useSelectors((state) => state.profile.value)
  const onLine = useSelectors((state) => state.onLine.value)
  const {needNetworkConnection} = useTexts()
  useEffect(() => {
    if (userObj) {
      onSnapshot(doc(dbservice, `members/${userObj.uid}`), (snapshot) => {
        const number = snapshot.data()?.points
        setPoints(number)
      })
    }
  }, [])
  const checkbox = () => {
    handleSideNavigation()
  }

  const logOut = () => {
    onLogOutClick()
    setTimeout(() => {
      location.reload()
    }, 1000)
  }

  const links = [
    {
      href: '/profile',
      passingState: null,
      icon: <UserRound />,
      description: texts[languages as keyof typeof texts]['myProfile'],
      onClick: () => checkbox(),
    },
    {
      href: '/ranking',
      passingState: null,
      icon: <SearchCheck />,
      description: texts[languages as keyof typeof texts]['userRanking'],
      onClick: () => checkbox(),
    },
    {
      href: '/piazza',
      passingState: { conversation: 'piazza', multiple: true },
      icon: <MessagesSquare />,
      description: texts[languages as keyof typeof texts]['groupChat'],
      onClick: () => checkbox(),
    },
    {
      href: '/contact',
      passingState: { multiple: true },
      icon: <Siren />,
      description: texts[languages as keyof typeof texts]['report'],
      onClick: () => checkbox(),
    },
    {
      href: '/collection',
      passingState: { multiple: true },
      icon: <Film />,
      description: texts[languages as keyof typeof texts]['collection'],
      onClick: () => checkbox(),
    },
    {
      href: '/',
      passingState: { multiple: true },
      icon: <DoorOpen />,
      description: texts[languages as keyof typeof texts]['signOut'],
      onClick: () => logOut(),
    },
  ]
  setTimeout(() => setDelayed(false), 1000)
  return (
    <Drawer direction="left">
      <DrawerTrigger className="px-5">
        {profile && userCertificated ? (
          <Avatars
            element={profile}
            piazza={null}
            profile={false}
            profileColor=""
            profileUrl={profile.profileImageUrl}
            defaultProfileUrl={profile.defaultProfile}
          />
        ) : (
          <>
            {!delayed && (
              <Avatars
                element={{ defaultProfile: staticImage }}
                piazza={null}
                profile={false}
              />
            )}
          </>
        )}
      </DrawerTrigger>
      <DrawerContent className="border-none bg-light-2 dark:bg-dark-2 right-auto top-0 mt-0 w-[355px] overflow-hidden rounded-[10px]">
        <nav className="flex flex-col justify-between w-[350px]">
          {userObj && userCertificated ? (
            <div>
              <NavigationSignedIn userObj={userObj} points={points} />
              {onLine ? (
                <div className="flex flex-col justify-between pt-5 gap-5">
                  {links.map((value, index) => {
                    return (
                      <div key={index}>
                        <DrawerClose>
                          <Links
                            href={value.href}
                            passingState={value.passingState}
                            onClick={value.onClick}
                            icon={value.icon}
                            description={value.description}
                          />
                        </DrawerClose>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex justify-center pt-5 gap-5">
                  {needNetworkConnection}
                </div>
              )}
            </div>
          ) : (
            <div>
              <NavigationSignedOut userObj={userObj} points={points} />
              {onLine ? (
                <div className="flex flex-col justify-between pt-5 gap-5">
                  {links.map((value, index) => {
                    if (value.href === '/contact') {
                      return (
                        <div key={index}>
                          <DrawerClose>
                            <Links
                              key={index}
                              href={value.href}
                              passingState={value.passingState}
                              onClick={value.onClick}
                              icon={value.icon}
                              description={value.description}
                            />
                          </DrawerClose>
                        </div>
                      )
                    }
                    if (!userCertificated && userObj) {
                      if (value.href === '/') {
                        return (
                          <div key={index}>
                            <DrawerClose>
                              <Links
                                key={index}
                                href={value.href}
                                passingState={value.passingState}
                                onClick={value.onClick}
                                icon={value.icon}
                                description={value.description}
                              />
                            </DrawerClose>
                          </div>
                        )
                      }
                    }
                  })}
                </div>
              ) : (
                <div className="flex justify-center pt-5 gap-5">
                  {needNetworkConnection}
                </div>
              )}
            </div>
          )}
          {userObj && userCertificated && onLine && (
            <IframePlayer mode={theme} />
          )}
        </nav>
      </DrawerContent>
    </Drawer>
  )
}

export default Navigation
