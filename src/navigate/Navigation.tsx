import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { auth, dbservice } from 'src/baseApi/serverbase'
import Modes from 'src/Modes'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { doc, onSnapshot, query } from 'firebase/firestore';

const onLogOutClick = () => auth.signOut();
function Navigation({ setScroll, isLoggedIn, userObj, setValue, check, setCheck, setMode }) {
  const [colors, setColors] = useState(localStorage.getItem("theme"));
  const [color, setColor] = useState('#e2e8f0');
  const [backgroundColor, setBackgroundColor] = useState('#e2e8f0');
  const [points, setPoints] = useState<number>(0)

  useEffect(() => {
    if (userObj) {
      onSnapshot(query(doc(dbservice, `members/${userObj.uid}`)), (snapshot) => {
        if (isLoggedIn) {
          const number = snapshot.data().points
          setPoints(number)
        }
      })
    }
  }, [])
  const checkbox = () => {
    setCheck(false)
    setScroll(0)
  }

  const logOut = () => {
    onLogOutClick()
    checkbox()
    setValue(1)
    // setUserObj(null)
  }
  // const navigation = []
  // if (check) {
  //   navigation.push(
  //     'navigationChecked fixed top-0 bottom-0 left-0 z-10 w-2/3'
  //   )
  // } else {
  //   navigation.push(
  //     'fixed top-0 bottom-0 overflow-hidden -left-full'
  //   )
  // }

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
      aria-hidden="false"
    >
      {isLoggedIn &&
        <nav
          className='w-full'
        >
          <div className='flex border-b border-light-3 dark:border-dark-3'>
            <div className='p-5'>
              <div>좋은 날씨네요 {userObj.displayName} 님</div>
              {isLoggedIn && <div>내 포인트: {points}</div>}
              {/* <div className='flex justify-end'>
                <Link to='/postings/profile' onClick={() => checkbox()}>내 프로필</Link>
              </div> */}
            </div>
            <div className='flex border-b border-light-3 dark:border-dark-3'></div>
            <Modes colors={colors} setColors={setColors} setMode={setMode}/>
          </div>
          {/* <h1
          >
            <Link className='text-2xl	px-5' to='/postings/' onClick={() => checkbox()}>메인 페이지</Link>
          </h1> */}
          <h1 className='text-2xl	px-5 pt-5'>
            <Link to='/postings/profile' onClick={() => checkbox()}>{userObj.displayName}의 프로필</Link>
          </h1>
          <h1 className='text-2xl	px-5'>
            <Link to='/postings/ranking' onClick={() => checkbox()}>유저 랭킹</Link>
          </h1>
          <h1>
            <a className='text-2xl px-5' href='mailto:ckd_qja@naver.com' target="_blank">신고하기</a>
          </h1>
          <h1>
            <a className='text-2xl px-5' href='https://open.kakao.com/o/sT7ptgQd' target="_blank">단체방</a>
          </h1>
          <h1>
            <Link className='text-2xl px-5' to="/postings/" onClick={() => {
              logOut()
            }}>로그아웃</Link>
          </h1>
        </nav>
      }
      {!isLoggedIn &&
        <nav
          className='w-full'
        >
          <div className='flex border-b border-light-3 dark:border-dark-3'>
          <div className='p-5'>
            <div className='flex justify-center'>좋은 날씨네요</div>
            <div className='flex justify-center'>로그인을 해 주세요</div>
          </div>
            <Modes colors={colors} setColors={setColors} setMode={setMode}/>
          </div>
          {/* <h1>
            <Link className='text-2xl	px-5' to='/postings/' onClick={(event) => checkbox(event)}>메인 페이지</Link>
          </h1>
          <h1>
            <Link className='text-2xl	px-5' to='/postings/' onClick={(event) => {
              checkbox(event)
              setValue(1)
            }}>로그인/회원가입</Link>
          </h1> */}
          <h1 className='text-2xl px-5 pt-5'>
            <a href='mailto:ckd_qja@naver.com' target="_blank">신고하기</a>
          </h1>
        </nav>
      }
    </SwipeableDrawer>
  )
}

export default Navigation