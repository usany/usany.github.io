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
import { useDispatch, useSelector } from 'react-redux'
import staticImage from "src/assets/blue.png"
import { auth, dbservice } from 'src/baseApi/serverbase'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from 'src/components/ui/drawer'
import { useSelectors } from 'src/hooks/useSelectors'
import { changeProfileColor } from 'src/stateSlices/profileColorSlice'
import { changeProfileImage } from 'src/stateSlices/profileImageSlice'
import { changeProfileUrl } from 'src/stateSlices/profileUrlSlice'
import Avatars from '../../Avatars'
import IframePlayer from './iframePlayer/IframePlayer'
import Links from './links/Links'
import NavigationSignedIn from './navigationSignedIn/NavigationSignedIn'
import NavigationSignedOut from './navigationSignedOut/NavigationSignedOut'

interface Props {
  user: DocumentData | undefined
  userObj: User | null
  sideNavigation: boolean
  handleSideNavigation: () => void
}

const onLogOutClick = () => auth.signOut()
function Navigation({ user, userObj, sideNavigation, handleSideNavigation,
  uid, profile, piazza
}: Props) {
  const [backgroundColor, setBackgroundColor] = useState<string>('#e2e8f0')
  const [points, setPoints] = useState<number>(0)
  const [delayed, setDelayed] = useState(true)
  const theme = useSelectors((state) => state.theme.value)
  const [userData, setUserData] = useState(null)
  const languages = useSelector((state) => state.languages.value)
  const profileColor = useSelector((state) => state.profileColor.value);
  const profileUrl = useSelector((state) => state.profileUrl.value);
  const dispatch = useDispatch()
  useEffect(() => {
    if (userObj) {
      onSnapshot(doc(dbservice, `members/${userObj.uid}`), (snapshot) => {
        const number = snapshot.data()?.points
        setPoints(number)
        const element = snapshot.data()
        setUserData(element)
      })
    }
  }, [])
  const checkbox = () => {
    handleSideNavigation()
  }

  const logOut = () => {
    onLogOutClick()
    if (!user) {
      setTimeout(() => {
        dispatch(changeProfileUrl(''))
        dispatch(changeProfileImage(''))
        dispatch(changeProfileColor(''))
        checkbox()
      }, 250)
    }
  }

  useEffect(() => {
    if (theme === 'dark') {
      setBackgroundColor('#2d3848')
    } else {
      setBackgroundColor('#e2e8f0')
    }
  }, [theme])
  // const element = {
  //   uid: userObj?.uid,
  //   displayName: userObj?.displayName,
  //   profileColor: profileColor,
  //   userData: userData,
  // }
  const element = user
  const links = [
    {
      href: '/profile',
      passingState: { element: element },
      icon: <UserRound />,
      description: '내 프로필',
      onClick: () => checkbox(),
    },
    {
      href: '/ranking',
      passingState: null,
      icon: <SearchCheck />,
      description: '유저 랭킹',
      onClick: () => checkbox(),
    },
    {
      href: '/piazza',
      passingState: { multiple: true },
      icon: <MessagesSquare />,
      description: '단체 대화방',
      onClick: () => checkbox(),
    },
    {
      href: '/contact',
      passingState: { multiple: true },
      icon: <Siren />,
      description: '신고하기',
      onClick: () => checkbox(),
    },
    {
      href: '/',
      passingState: { multiple: true },
      icon: <DoorOpen />,
      description: '로그아웃',
      onClick: () => logOut(),
    },
  ]
  // const loggedOutProfile = setTimeout(() => {
  //   return (
  //     <Avatars
  //       element={{ defaultProfile: staticImage }}
  //       piazza={null}
  //       profile={false}
  //     />
  //   )
  // }, 1000)
  setTimeout(() => setDelayed(false), 1000)
  return (
    <Drawer direction="left">
      <DrawerTrigger className='px-5'>
        {user ?
          <Avatars
            element={user}
            // uid={user.uid}
            piazza={null}
            profile={false}
            profileColor=""
            profileUrl={user.profileImageUrl}
            defaultProfileUrl={user.defaultProfile}
          // uid={userObj ? userObj.uid : ''}
          // profile={false}
          // profileColor={userObj ? profileColor : 'profile-blue'}
          // profileUrl={userObj ? profileUrl : staticImage}
          // piazza={() => null}
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
            <NavigationSignedOut
              userObj={userObj}
              points={points}
              checkbox={checkbox}
            />
          )}
          {userObj && <IframePlayer mode={theme} />}
        </nav>
      </DrawerContent>
    </Drawer>
    //     <Drawer
    //       PaperProps = {{
    //     sx: {
    //       backgroundColor: { backgroundColor },
    //       opacity: 0.9,
    //         },
    //   }
    // }
    // anchor = { 'left'}
    // open = { sideNavigation }
    // onClose = { handleSideNavigation }
    //   >
    //   <nav className="flex flex-col justify-between w-[350px]">
    //     {userObj ? (
    //       <div>
    //         <NavigationSignedIn userObj={userObj} points={points} />
    //         <div className="flex flex-col justify-between pt-5 gap-5">
    //           {links.map((value, index) => {
    //             return (
    //               <Links
    //                 key={index}
    //                 href={value.href}
    //                 passingState={value.passingState}
    //                 onClick={value.onClick}
    //                 icon={value.icon}
    //                 description={value.description}
    //               />
    //             )
    //           })}
    //         </div>
    //       </div>
    //     ) : (
    //       <div>
    //         <NavigationSignedOut
    //           userObj={userObj}
    //           points={points}
    //           checkbox={checkbox}
    //         />
    //       </div>
    //     )}
    //     {userObj && <IframePlayer mode={theme} />}
    //   </nav>
    //     </Drawer>
  )
}

export default Navigation
