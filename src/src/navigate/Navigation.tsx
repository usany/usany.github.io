import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { auth, dbservice } from 'src/baseApi/serverbase'
import Modes from 'src/Modes'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { doc, onSnapshot, query } from 'firebase/firestore';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import Public from '@mui/icons-material/Public';
import { useSideNavigationStore, useThemeStore } from 'src/store'

interface Props {
  userObj: {uid: string, displayName: string} | null
  sideNavigation: boolean
  handleSideNavigation: () => void
}

const onLogOutClick = () => auth.signOut();
function Navigation({ userObj, sideNavigation, handleSideNavigation }: Props) {
  const [textColor, setTextColor] = useState<string>('#e2e8f0');
  const [backgroundColor, setBackgroundColor] = useState<string>('#e2e8f0');
  const [points, setPoints] = useState<number>(0)
  const theme = useThemeStore((state) => state.theme)
  const [profileColor, setProfileColor] = useState<string>('');
  
  useEffect(() => {
    if (userObj) {
      onSnapshot(doc(dbservice, `members/${userObj.uid}`), (snapshot) => {
        const number = snapshot.data()?.points
        setPoints(number)
        const profileColor = snapshot.data()?.profileColor
        setProfileColor(profileColor)
      })
    }
  }, [])
  const checkbox = () => {
    handleSideNavigation()
  }

  const logOut = () => {
    onLogOutClick()
    checkbox()
  }

  useEffect(() => {
    if (theme === 'dark') {
      setTextColor('#ddd')
      setBackgroundColor('#2d3848')
    } else {
      setTextColor('#000')
      setBackgroundColor('#e2e8f0')
    }
  }, [theme])
  const element = {
    uid: userObj?.uid,
    displayName: userObj?.displayName,
    profileColor: profileColor
  }
  return (
    <SwipeableDrawer
      PaperProps={{
        sx: {
          backgroundColor: {backgroundColor},
          // color: {textColor},
          // height: '100%'
        }
      }}
      anchor={'left'}
      open={sideNavigation}
      onClose={handleSideNavigation}
      onOpen={handleSideNavigation}
      aria-hidden="false"
    >
      <nav
        className='flex flex-col justify-between w-full'
      >
        {userObj ?
          <div className=''>
            <div className='flex border-b border-light-3 dark:border-dark-3'>
              <div className='p-5'>
                <div>좋은 날씨네요 {userObj.displayName} 님</div>
                {userObj && <div>내 포인트: {points}</div>}
              </div>
              <div className='flex border-b border-light-3 dark:border-dark-3'></div>
              <Modes />
            </div>
            <div className='flex flex-col justify-between'>
            <div>
              <h1 className='text-2xl	px-5 pt-5'>
                <Link to='/profile' 
                  state={{element: element}}
                  onClick={() => checkbox()}
                >
                  <span className='px-3'><InboxIcon /></span>
                  내 프로필
                </Link>
              </h1>
              <h1 className='text-2xl	px-5'>
                <span className='px-3'><DraftsIcon /></span>
                <Link to='/ranking' onClick={() => checkbox()}>유저 랭킹</Link>
              </h1>
              <h1 className='text-2xl px-5'>
                <span className='px-3'><WorkIcon /></span>
                <Link to='/piazza' onClick={() => checkbox()}>단체 대화방</Link>
              </h1>
              <h1 className='text-2xl	px-5'>
                <span className='px-3'><ImageIcon /></span>
                <Link to='/contact' onClick={() => checkbox()}>신고하기</Link>
              </h1>
              <h1 className='text-2xl px-5'>
                <span className='px-3'><WorkIcon /></span>
                <Link to='/chats' onClick={() => checkbox()}>실험실</Link>
              </h1>
              <h1 className='text-2xl px-5'>
                <span className='px-3'><Public /></span>
                <Link to="/" onClick={() => {
                  logOut()
                }}>로그아웃</Link>
              </h1>
            </div>
            </div>
          </div>
          :
          <div className='flex border-b border-light-3 dark:border-dark-3'>
            <div className='p-5'>
              <div className='flex justify-center'>좋은 날씨네요</div>
              <div className='flex justify-center'>로그인을 해 주세요</div>
            </div>
            <Modes />
          </div>
        }
        {userObj &&
          <div className='absolute flex justify-center bottom-0'>
            <iframe src="https://open.spotify.com/embed/playlist/6phYndBIC4DIqefH1CcUsT?utm_source=generator&theme=0" width="90%" height="200" allow="autoplay; clipboard-write; fullscreen; picture-in-picture" loading="lazy" />
          </div>
        }
      </nav>
    </SwipeableDrawer>
  )
}

export default Navigation