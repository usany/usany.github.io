import { useState, useEffect, useRef, useMemo, useLayoutEffect, useContext, useReducer } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'src/pages/Home'
import Profile from 'src/pages/Profile'
import Ranking from 'src/pages/Ranking'
import Points from 'src/pages/Points'
import Specific from 'src/pages/Specific'
import Actions from 'src/pages/Actions'
import Allies from 'src/pages/Allies'
import Contact from 'src/pages/Contact'
import Piazza from 'src/pages/Piazza'
import Chatting from 'src/pages/Chatting'
import Header from 'src/navigate/Header'
import Navigations from 'src/navigate/Navigations'
import { doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { auth, dbservice } from 'src/baseApi/serverbase'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useBottomNavigationStore, useThemeStore, useSideNavigationStore, useAvatarColorStore, useNewMessageStore } from 'src/store'

const Router = ({ userObj }) => {

    // keep track of previous scroll position
    let prevScrollPos = window.scrollY;
    window.addEventListener('scroll', function () {
        // current scroll position
        const currentScrollPos = window.scrollY;
        if (prevScrollPos >= currentScrollPos) {
            // user has scrolled up
            document.querySelector('#navigationSelectorOne')?.classList.add('fixed', 'top-0', 'z-20', 'bg-light-3', 'dark:bg-dark-3')
            document.querySelector('#navigationSelectorTwo')?.classList.add('fixed', 'top-0', 'z-10', 'bg-light-3', 'dark:bg-dark-3')
            document.querySelector('#contentSelector')?.classList.add('pt-16')
        } else {
            // user has scrolled down
            document.querySelector('#navigationSelectorOne')?.classList.remove('fixed', 'top-0', 'z-20', 'bg-light-3', 'dark:bg-dark-3')
            document.querySelector('#navigationSelectorTwo')?.classList.remove('fixed', 'top-0', 'z-10', 'bg-light-3', 'dark:bg-dark-3')
            document.querySelector('#contentSelector')?.classList.remove('pt-16')
        }
        // update previous scroll position
        prevScrollPos = currentScrollPos;
    });

    useEffect(() => {
        let refresh = false
        const pullToRefresh = document.querySelector('.pull-to-refresh');
        let touchstartY = 0;
        document.addEventListener('touchstart', e => {
            touchstartY = e.touches[0].clientY;
        });
        document.addEventListener('touchmove', e => {
            const touchY = e.touches[0].clientY;
            const touchDiff = touchY - touchstartY;
            if (touchDiff > 0 && window.scrollY === 0) {
                if (touchDiff > 500) {
                    pullToRefresh?.classList.add('visible');
                    refresh = true
                }
                else {
                    pullToRefresh?.classList.remove('visible');
                    refresh = false
                }
            }
        });
        document.addEventListener('touchend', e => {
            if (refresh) {
                if (pullToRefresh?.classList.contains('visible')) {
                    pullToRefresh?.classList.remove('visible');
                    window.location.reload();
                }
            }
        });
    })

    const storage = getStorage();
    const storageRef = ref(storage, 'screen.jpg');      
    // const handleCounter = (newState: number[]) => setCounter(newState)
    // const handleValue = (newState: number) => setValue(newState)
    // const handleCheck = (newState: boolean) => setCheck(newState)
    // const handleScroll = (newState: number) => setScroll(newState)
    // const handleProfileColor = (newState: string | null) => setProfileColor(newState)
    // const handleNewMessage = (newState: boolean) => setNewMessage(newState)
    // const handlePiazzaSwitch = (newRef: string | null) => piazzaSwitch.current = newRef

    return (
        <BrowserRouter>
            <div className={
                // sides[0] + 
                ' flex flex-col location'
            }>
                <div className="pull-to-refresh">
                    {/* <span>Loading</span> */}
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                </div>
                <Header
                    userObj={userObj}
                    // check={check} 
                    // setCheck={(newState: boolean) => setCheck(newState)} 
                    storage={storage}
                    // setScroll={(newState: number) => setScroll(newState)}
                    // handleSideNavigation={() => dispatchSideNavigation({type: 'toggle'})}
                />
                <div
                    id='contentSelector'
                >
                    <Routes>
                        {
                            userObj ? (
                                <Route>
                                    <Route path='/' Component={() => <Home userObj={userObj} />} />
                                    <Route path='/profile' Component={() => <Profile userObj={userObj} />} />
                                    <Route path='/ranking' Component={() => <Ranking userObj={userObj}/>} />
                                    <Route path='/specific' Component={() => <Specific userObj={userObj} />} />
                                    <Route path='/actions' Component={() => <Actions userObj={userObj} />} />
                                    <Route path='/allies' Component={() => <Allies />} />
                                    <Route path='/points' Component={() => <Points />} />
                                    <Route path='/contact' Component={() => <Contact userObj={userObj} />} />
                                    <Route path='/piazza' Component={() => <Piazza userObj={userObj} />} />
                                    <Route path='/chatting' Component={() => <Chatting userObj={userObj} />} />
                                </Route>
                            ) : (
                                <Route>
                                    <Route path='/' Component={() => <Home userObj={userObj} />} />
                                    <Route path='/specific' Component={() => <Specific userObj={userObj} />} />
                                </Route>
                            )
                        }
                    </Routes>
                </div>
                <Navigations userObj={userObj} />
            </div>
        </BrowserRouter>
    )
}

export default Router