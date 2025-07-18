import { User } from 'firebase/auth'
import { doc, DocumentData, onSnapshot } from 'firebase/firestore'
import {
  DoorOpen,
  MessagesSquare,
  SearchCheck,
  Siren,
  UserRound,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import staticImage from "src/assets/blue.png"
import { auth, dbservice } from 'src/baseApi/serverbase'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from 'src/components/ui/drawer'
import { useSelectors } from 'src/hooks/useSelectors'
import texts from 'src/texts.json'
import Avatars from '../../Avatars'
import IframePlayer from './iframePlayer/IframePlayer'
import Links from './links/Links'
import NavigationSignedIn from './navigationSignedIn/NavigationSignedIn'
import NavigationSignedOut from './navigationSignedOut/NavigationSignedOut'
interface Props {
  user: DocumentData | undefined
  userObj: User | null
  handleSideNavigation: () => void
}

const onLogOutClick = () => auth.signOut()
function Navigation({ user, userObj, handleSideNavigation }: Props) {
  const [points, setPoints] = useState(0)
  const [delayed, setDelayed] = useState(true)
  const theme = useSelectors((state) => state.theme.value)
  const languages = useSelectors(state => state.languages.value)
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
    // if (!user) {
    //   setTimeout(() => {
    //     dispatch(changeProfileUrl(''))
    //     dispatch(changeProfileImage(''))
    //     dispatch(changeProfileColor(''))
    //     checkbox()
    //   }, 250)
    // }
  }
  const links = [
    {
      href: '/profile',
      passingState: { element: user },
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
      <DrawerTrigger className='px-5'>
        {user ?
          <Avatars
            element={user}
            piazza={null}
            profile={false}
            profileColor=""
            profileUrl={user.profileImageUrl}
            defaultProfileUrl={user.defaultProfile}
          />
          :
          <>
            {!delayed &&
              <Avatars
                element={{ defaultProfile: staticImage }}
                piazza={null}
                profile={false}
              />
            }
          </>
        }
      </DrawerTrigger>
      <DrawerContent className="border-none bg-light-2 dark:bg-dark-2 right-auto top-0 mt-0 w-[355px] overflow-hidden rounded-[10px]">
        <nav className="flex flex-col justify-between w-[350px]">
          {userObj ? (
            <div>
              <NavigationSignedIn userObj={userObj} points={points} />
              <div className="flex flex-col justify-between pt-5 gap-5">
                {links.map((value, index) => {
                  return (
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
                  )
                })}
              </div>
            </div>
          ) : (
            <div>
              <NavigationSignedOut
                userObj={userObj}
                points={points}
              // checkbox={checkbox}
              />
              <div className="flex flex-col justify-between pt-5 gap-5">
                {links.map((value, index) => {
                  if (index === 3) {
                    return (
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
                    )
                  }
                })}
              </div>
            </div>
          )}
          {userObj && <IframePlayer mode={theme} />}
        </nav>
      </DrawerContent>
    </Drawer>
  )
}

export default Navigation
