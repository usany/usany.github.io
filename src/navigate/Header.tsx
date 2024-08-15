import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'src/pages/Home'
import Profile from 'src/pages/Profile'
import Ranking from 'src/pages/Ranking'
import Specific from 'src/pages/Specific'
import WeatherView from 'src/navigate/WeatherView'
import Navigation from 'src/navigate/Navigation'
import Navigations from 'src/navigate/Navigations'
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
// import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import ToggleTabs from 'src/muiComponents/Tabs'
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Snackbars from 'src/muiComponents/Snackbars'

const Header = ({ scroll, setScroll, isLoggedIn, userObj, setUserObj, setValue, check, setCheck, setMode, prevScrollPos, value, }) => {
    
    return (
        <div className='flex flex-row'>
                <div id='navigationSelectorOne' className='pt-1'>
                    <Navigation scroll={scroll} setScroll={setScroll} isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} setValue={setValue} check={check} setCheck={setCheck} setMode={setMode}/>
                    <div className='flex justify-between w-screen'>
                        <div className='px-5 pt-1'>
                            {userObj ?
                                <Avatar alt={userObj.displayName} sx={{ bgcolor: blue[500] }} src='./src' onClick={() => {
                                    setCheck(!check)
                                    setScroll(prevScrollPos)
                                    document.getElementsByClassName('location')[0].style.top = `-${prevScrollPos}px`
                                }} />
                                :
                                <Avatar sx={{ bgcolor: blue[500] }} onClick={() => {
                                    setCheck(!check)
                                    setScroll(prevScrollPos)
                                    document.getElementsByClassName('location')[0].style.top = `-${prevScrollPos}px`
                                }} />
                            }
                        </div>
                        <div>
                    {isLoggedIn && value === 0 && 
                        <ToggleTabs num={1} valuing={value} setValuing={setValue}/>
                    }
                    {isLoggedIn && value === 1 && 
                        <ToggleTabs num={1} valuing={value} setValuing={setValue}/>
                    }
                    {isLoggedIn && value === 3 && 
                        <ToggleTabs num={2} valuing={value} setValuing={setValue}/>
                    }
                    {isLoggedIn && value === 4 && 
                        <ToggleTabs num={2} valuing={value} setValuing={setValue}/>
                    }
                    {!isLoggedIn && 
                        <div className='pt-5 min-w-36' onClick={() => setValue(1)}>로그인을 해 주세요</div>
                    }
                    </div>
                    <div>
                    <WeatherView />
                    </div>
                    </div>
                </div>
            {/* <div id='navigationSelectorTwo' className='w-full h-15'></div> */}
        </div>
    )
}

export default Header