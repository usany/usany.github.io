import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { auth, dbservice } from 'src/baseApi/serverbase'
import Modes from 'src/Modes'
import { modeStore } from 'src/store'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { doc, onSnapshot, query } from 'firebase/firestore';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import Public from '@mui/icons-material/Public';
import { sideNavigationStore } from 'src/store'

const onLogOutClick = () => auth.signOut();
function Navigation({ setScroll, userObj, setValue, setMode, stateMode, handleModes }:
  {
    setScroll: (newState: number) => void,
    userObj: {uid: string, displayName: string},
    setValue: (newState: number) => void,
    setMode: (newState: string) => void
  }
) {
  const [colors, setColors] = useState<string | null>(localStorage.getItem("theme"));
  const [color, setColor] = useState<string>('#e2e8f0');
  const [backgroundColor, setBackgroundColor] = useState<string>('#e2e8f0');
  const [points, setPoints] = useState<number>(0)
  const modes = modeStore((state) => state.mode)
  const sideNavigation = sideNavigationStore((state) => state.sideNavigation)
  const handleSideNavigation = sideNavigationStore((state) => state.handleSideNavigation)

  useEffect(() => {
    if (userObj) {
      onSnapshot(query(doc(dbservice, `members/${userObj.uid}`)), (snapshot) => {
        const number = snapshot.data().points
        setPoints(number)
      })
    }
  }, [])
  const checkbox = () => {
    handleSideNavigation()
    setScroll(0)
  }

  const logOut = () => {
    onLogOutClick()
    checkbox()
    setValue(2)
  }

  useEffect(() => {
    if (modes === 'dark') {
      setColor('#ddd')
      setBackgroundColor('#2d3848')
    } else {
      setColor('#000')
      setBackgroundColor('#e2e8f0')
    }
  })
  const element = {
    uid: userObj?.uid,
    displayName: userObj?.displayName,
  }
  return (
    <SwipeableDrawer
      PaperProps={{
        sx: {
          backgroundColor: {backgroundColor},
          color: {color},
        }
      }}
      anchor={'left'}
      open={sideNavigation}
      onClose={handleSideNavigation}
      onOpen={handleSideNavigation}
      aria-hidden="false"
    >
      {userObj &&
        <nav
          className='w-full'
        >
          <div className='flex border-b border-light-3 dark:border-dark-3'>
            <div className='p-5'>
              <div>좋은 날씨네요 {userObj.displayName} 님</div>
              {userObj && <div>내 포인트: {points}</div>}
            </div>
            <div className='flex border-b border-light-3 dark:border-dark-3'></div>
            <Modes colors={colors} setColors={(newState: string) => setColors(newState)} setMode={(newState: string) => setMode(newState)} stateMode={stateMode} handleModes={handleModes}/>
          </div>
          <h1 className='text-2xl	px-5 pt-5'>
            <Link to='/profile' 
              state={{element: element}}
              onClick={() => checkbox()}
            >
              <span className='px-3'><InboxIcon /></span>
              {userObj.displayName} 프로필
            </Link>
          </h1>
          <h1 className='text-2xl	px-5'>
            <span className='px-3'><DraftsIcon /></span>
            <Link to='/ranking' onClick={() => checkbox()}>유저 랭킹</Link>
          </h1>
          <h1 className='text-2xl	px-5'>
            <span className='px-3'><ImageIcon /></span>
            <Link to='/contact' onClick={() => checkbox()}>신고하기</Link>
          </h1>
          <h1 className='text-2xl px-5'>
            <span className='px-3'><WorkIcon /></span>
            <Link to='/piazza' onClick={() => checkbox()}>단체방</Link>
          </h1>
          <h1 className='text-2xl px-5'>
            <span className='px-3'><Public /></span>
            <Link to="/" onClick={() => {
              logOut()
            }}>로그아웃</Link>
          </h1>
        </nav>
      }
      {!userObj &&
        <nav
          className='w-full'
        >
          <div className='flex border-b border-light-3 dark:border-dark-3'>
            <div className='p-5'>
              <div className='flex justify-center'>좋은 날씨네요</div>
              <div className='flex justify-center'>로그인을 해 주세요</div>
            </div>
            <Modes colors={colors} setColors={(newState: string) => setColors(newState)} setMode={(newState: string) => setMode(newState)}/>
          </div>
        </nav>
      }
    </SwipeableDrawer>
  )
}

export default Navigation