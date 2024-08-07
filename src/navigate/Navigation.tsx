import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Modes from 'src/Modes'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Snackbars from 'src/muiComponents/Snackbars'
import { doc, onSnapshot, query } from 'firebase/firestore';

const onLogOutClick = () => auth.signOut();
function Navigation({ scroll, setScroll, isLoggedIn, userObj, setUserObj, setValue, check, setCheck, setMode }) {
  const [colors, setColors] = useState(localStorage.getItem("theme"));
  const [color, setColor] = useState('#e2e8f0');
  const [backgroundColor, setBackgroundColor] = useState('#e2e8f0');
  const [points, setPoints] = useState<number>(0)

  useEffect(() => {
    onSnapshot(query(doc(dbservice, `members/${userObj.uid}`)), (snapshot) => {
        if (isLoggedIn) {
            const number = snapshot.data().points
            setPoints(number)
        }
    })
  }, [])
  const checkbox = (event) => {
    setCheck(false)
    setScroll(0)
  }

  const logOut = (event) => {
    onLogOutClick()
    checkbox(event)
    setValue(1)
    // setUserObj(null)
  }

  const navigation = []
  if (check) {
    navigation.push(
      'navigationChecked fixed top-0 bottom-0 left-0 z-10 w-2/3'
    )
  } else {
    navigation.push(
      'fixed top-0 bottom-0 overflow-hidden -left-full'
    )
  }

  const toggle = (choose) => () => {
    setCheck(choose)
  }
  useEffect(() => {
    if (colors === 'dark') {
      setColor('#ddd')
      setBackgroundColor('#2d3848')
    } else {
      setColor('#000')
      setBackgroundColor('#e2e8f0')
    }
  })

  return (
    <SwipeableDrawer
      PaperProps={{
        sx: {
          backgroundColor: {backgroundColor},
          color: {color},
        }
      }}
      anchor={'left'}
      open={check}
      onClose={toggle(false)}
      onOpen={toggle(true)}
    >
      {isLoggedIn &&
        <nav
          className='w-full'
          // className={navigation[0]}
        >
          <div className='flex'>
            <div className='p-5'>
              <div className='flex justify-center'>좋은 날씨네요 {userObj.displayName} 님</div>
              {isLoggedIn && <div className='flex justify-center'>내 포인트: {points}</div>}
            </div>
            <Modes colors={colors} setColors={setColors} setMode={setMode}/>
          </div>
          <h1
          // className='nav-padding'
          >
            <Link className='text-2xl	px-20' to='/postings/' onClick={(event) => checkbox(event)}>메인 페이지</Link>
          </h1>
          <h1>
            <Link className='text-2xl	px-20' to='/postings/profile' onClick={(event) => checkbox(event)}>{userObj.displayName}의 프로필</Link>
          </h1>
          <h1>
            <Link className='text-2xl	px-20' to='/postings/ranking' onClick={(event) => checkbox(event)}>유저 랭킹</Link>
          </h1>
          <h1>
            <a className='text-2xl px-20' href='mailto:ckd_qja@naver.com' target="_blank">신고하기</a>
          </h1>
          <h1>
            <a className='text-2xl px-20' href='https://open.kakao.com/o/sT7ptgQd' target="_blank">단체방</a>
          </h1>
          <h1>
            <Link className='text-2xl px-20' to="/postings/" onClick={(event) => {
              logOut(event)
            }}>로그아웃</Link>
          </h1>
          <Snackbars />
        </nav>
      }
      {!isLoggedIn &&
        <nav
          className='w-full'
          // className={navigation[0]}
        >
          <Modes setMode={setMode}/>
          <h1
          // className='nav-padding'
          >
            <Link to='/postings/' onClick={(event) => checkbox(event)}>메인 페이지</Link>
          </h1>
          <h1>
            <Link to='/postings/' onClick={(event) => {
              checkbox(event)
              setValue(1)
            }}>로그인/회원가입</Link>
          </h1>
          <h1>
            <a href='mailto:ckd_qja@naver.com' target="_blank">신고하기</a>
          </h1>
        </nav>
      }
    </SwipeableDrawer>
  )
}

export default Navigation