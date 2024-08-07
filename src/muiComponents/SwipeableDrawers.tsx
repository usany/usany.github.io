import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Navigation from 'src/navigate/Navigation'

function SwipeableDrawers({ check, setCheck, isLoggedIn, scroll, setScroll, isLoggedIn, userObj, setUserObj, setValue, setMode }) {

  const list = () => (
      <List>
        <div>
        {isLoggedIn && 
          <nav>
            {/* <Modes setCheck={setCheck}/> */}
            <h1 
            // className='nav-padding'
            >
              <div to='/postings/' onClick={(event) => checkbox(event)}>메인 페이지</div>
            </h1>
            <h1>
              <div to='/postings/profile' onClick={(event) => checkbox(event)}>의 프로필</div>
            </h1>
            <h1>
              <div to='/postings/ranking' onClick={(event) => checkbox(event)}>유저 랭킹</div>
            </h1>
            <h1>
              <div to="/postings/" onClick={(event) => {
                logOut(event)
              }}>로그아웃</div>
            </h1>
          </nav>
        }
        {!isLoggedIn && 
          <nav>
            {/* <Modes setCheck={setCheck}/> */}
            <h1 
            // className='nav-padding'
            >
              <div to='/postings/' onClick={(event) => checkbox(event)}>메인 페이지</div>
            </h1>
            <h1>
              <div to='/postings/' onClick={(event) => {
                checkbox(event)
                setValue(1)
              }}>로그인/회원가입</div>
            </h1>
            <h1>
              <div to="/postings/contact" onClick={(event) => checkbox(event)}>신고하기</div>
            </h1>
          </nav>
        }
        </div>
      </List>
    )

    const toggle = (choose) => () => {
      setCheck(choose)
    }

  return (
    <div>
      {/* <Button onClick={() => toggle(!check)}>sample</Button> */}
      <SwipeableDrawer
        anchor={'left'}
        open={check}
        onClose={toggle(false)}
        onOpen={toggle(true)}
      >
        {list()}
        <Navigation scroll={scroll} setScroll={setScroll} isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} setValue={setValue} check={check} setCheck={setCheck} setMode={setMode}/>
      </SwipeableDrawer>
    </div>
  );
}

export default SwipeableDrawers