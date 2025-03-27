import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { User } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import {
  DoorOpen,
  MessagesSquare,
  SearchCheck,
  Siren,
  UserRound,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth, dbservice } from 'src/baseApi/serverbase'
import { changeProfileColor } from 'src/stateSlices/profileColorSlice'
import { changeProfileImage } from 'src/stateSlices/profileImageSlice'
import { changeProfileUrl } from 'src/stateSlices/profileUrlSlice'
import IframePlayer from './iframePlayer/IframePlayer'
import Links from './links/Links'
import NavigationSignedIn from './navigationSignedIn/NavigationSignedIn'
import NavigationSignedOut from './navigationSignedOut/NavigationSignedOut'

interface Props {
  userObj: User | null
  sideNavigation: boolean
  handleSideNavigation: () => void
}

const onLogOutClick = () => auth.signOut()
function Navigation({ userObj, sideNavigation, handleSideNavigation }: Props) {
  const [backgroundColor, setBackgroundColor] = useState<string>('#e2e8f0')
  const [points, setPoints] = useState<number>(0)
  const theme = useSelector((state) => state.theme)
  const [profileColor, setProfileColor] = useState<string>('')
  const [userData, setUserData] = useState(null)
  const languages = useSelector((state) => state.languages)
  const dispatch = useDispatch()
  useEffect(() => {
    if (userObj) {
      onSnapshot(doc(dbservice, `members/${userObj.uid}`), (snapshot) => {
        const number = snapshot.data()?.points
        setPoints(number)
        const color = snapshot.data()?.profileColor
        setProfileColor(color)
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
    dispatch(changeProfileUrl(''))
    dispatch(changeProfileImage('null'))
    dispatch(changeProfileColor(''))
    checkbox()
  }

  useEffect(() => {
    if (theme === 'dark') {
      setBackgroundColor('#2d3848')
    } else {
      setBackgroundColor('#e2e8f0')
    }
  }, [theme])
  const element = {
    uid: userObj?.uid,
    displayName: userObj?.displayName,
    profileColor: profileColor,
    userData: userData,
  }
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
  return (
    <SwipeableDrawer
      PaperProps={{
        sx: {
          backgroundColor: { backgroundColor },
          opacity: 0.9,
        },
      }}
      anchor={'left'}
      open={sideNavigation}
      onClose={handleSideNavigation}
      onOpen={handleSideNavigation}
      aria-hidden="false"
      swipeAreaWidth={20}
    >
      <nav className="flex flex-col justify-between w-[350px]">
        {userObj ? (
          <div>
            <NavigationSignedIn userObj={userObj} points={points} />
            <div className="flex flex-col justify-between pt-5 gap-5">
              {links.map((value, index) => {
                return (
                  <Links
                    key={index}
                    href={value.href}
                    passingState={value.passingState}
                    onClick={value.onClick}
                    icon={value.icon}
                    description={value.description}
                  />
                )
              })}
            </div>
          </div>
        ) : (
          <div>
            <NavigationSignedOut
              userObj={userObj}
              points={points}
              checkbox={checkbox}
            />
          </div>
        )}
        {userObj && <IframePlayer mode={theme} />}
      </nav>
    </SwipeableDrawer>
  )
}

export default Navigation
