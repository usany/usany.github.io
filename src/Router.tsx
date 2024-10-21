import { useState, useEffect, useRef, useMemo } from 'react'
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
import { blue } from '@mui/material/colors';
// import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import ToggleTabs from 'src/muiComponents/Tabs'
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Snackbars from 'src/muiComponents/Snackbars'
import { doc, onSnapshot, query } from 'firebase/firestore';
import { auth, dbservice } from 'src/baseApi/serverbase'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const tmpCounter = []
const Router = ({ isLoggedIn, userObj, setUserObj, setMode, bottomNavigation, setBottomNavigation }: {
    isLoggedIn: boolean,
    userObj: object,
    setUserObj: () => void,
    setMode: () => void
}) => {
    const [counter, setCounter] = useState<Array<object>>([]);
    const [value, setValue] = useState<number>(0);
    // const [bottomNavigation, setBottomNavigation] = useState<number>(1);
    const [check, setCheck] = useState<boolean>(false)
    const [scroll, setScroll] = useState<number>(0)
    const [profileColor, setProfileColor] = useState<string>('#2196f3')
    const piazzaSwitch = useRef(localStorage.getItem('piazza'))
    const [newMessage, setNewMessage] = useState(false)
    useEffect(() => {
        if (!check) {
            setTimeout(() => window.scrollTo({
                top: scroll,
                behavior: "smooth"
            }), 15);
        }
    })
    useEffect(() => {
        if (!(piazzaSwitch.current)) {
            localStorage.setItem("piazza", 'false');
            piazzaSwitch.current = 'false'
            // setPiazzaSwitch('false')
        }
    })
    // useEffect(() => {
    //     const checkUsername = async () => {
    //       const values = (await supabase
    //         .from('practices')
    //         .select()
    //         .eq('id', userObj.id)).data?.map((element) => element.username)[0]
    //         setDisplayName(
    //           values
    //         )
    //     }
    //     if (userObj) {
    //       checkUsername()
    //     }
    //   }, [userObj])
    useEffect(() => {
        if (userObj) {
            onSnapshot(query(doc(dbservice, `members/${userObj.uid}`)), (snapshot) => {
                if (isLoggedIn) {
                    const userColor = snapshot.data().profileColor
                    setProfileColor(userColor)
                }
            })
        }
    })
    // useEffect(() => {
    //     const checkUsername = async () => {
    //       const values = (await supabase
    //         .from('practices')
    //         .select()
    //         .eq('id', userObj.id)).data?.map((element) => element.username)[0]
    //         setDisplayName(
    //           values
    //         )
    //     }
    //     if (userObj) {
    //       checkUsername()
    //     }
    //   }, [userObj])
    const sides = []
    if (check === false) {
        // sides.push(
        //     'flex flex-col'
        // )
        // sides.push(
        //     'border border-sky-500 rounded-t fixed bottom-0 start-0 end-0'
        // )
    } else {
        sides.push(
            'fixed'
        )
        // sides.push(
        //     'fixed border border-sky-500 rounded-t bottom-0 start-0 end-0'
        // )
    }

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
                    pullToRefresh.classList.add('visible');
                    refresh = true
                }
                else {
                    pullToRefresh.classList.remove('visible');
                    refresh = false
                }
                // e.preventDefault();
                // refresh = true
                // if (touchDiff > 0) {
                //     refresh = true
                // }
                // if (touchDiff <= 0) {
                //     refresh = false
                // }
            }
        });
        document.addEventListener('touchend', e => {
            if (refresh) {
                if (pullToRefresh.classList.contains('visible')) {
                    pullToRefresh.classList.remove('visible');
                    window.location.reload();
                }
            }
        });
    })
    // const piazza = useMemo(() => <Route path='/piazza' Component={() => <Piazza userObj={userObj} setBottomNavigation={setBottomNavigation} piazzaSwitch={piazzaSwitch} setPiazzaSwitch={setPiazzaSwitch} newMessage={newMessage} setNewMessage={setNewMessage} />} />, [newMessage])
    return (
        <BrowserRouter>
            <div className={sides[0] + ' flex flex-col location'}>
                <div className="pull-to-refresh">
                    {/* <span>Loading</span> */}
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                </div>
                <Header
                    bottomNavigation={bottomNavigation}
                    scroll={scroll}
                    setScroll={setScroll}
                    isLoggedIn={isLoggedIn}
                    userObj={userObj}
                    setUserObj={setUserObj}
                    setValue={setValue}
                    check={check} setCheck={setCheck} setMode={setMode} prevScrollPos={prevScrollPos} value={value}
                    profileColor={profileColor}
                />
                <div
                    id='contentSelector'
                >
                    <Routes>
                        {
                            isLoggedIn ? (
                                <Route>
                                    <Route path='/' Component={() => <Home isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} tmpCounter={tmpCounter} bottomNavigation={bottomNavigation} setBottomNavigation={setBottomNavigation} piazzaSwitch={piazzaSwitch} newMessage={newMessage} setNewMessage={setNewMessage} />} />
                                    <Route path='/profile' Component={() => <Profile isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} bottomNavigation={bottomNavigation} setBottomNavigation={setBottomNavigation} profileColor={profileColor} setProfileColor={setProfileColor} userUid={userObj} />} />
                                    <Route path='/ranking' Component={() => <Ranking isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} setBottomNavigation={setBottomNavigation} profileColor={profileColor} />} />
                                    <Route path='/specific' Component={() => <Specific isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    <Route path='/actions' Component={() => <Actions isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    <Route path='/allies' Component={() => <Allies isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    <Route path='/points' Component={() => <Points isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    <Route path='/contact' Component={() => <Contact displayName={userObj.displayName} isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    {/* {piazza} */}
                                    <Route path='/piazza' Component={() => <Piazza userObj={userObj} setBottomNavigation={setBottomNavigation} piazzaSwitch={piazzaSwitch} />} />
                                    <Route path='/chatting' Component={() => <Chatting userObj={userObj} setBottomNavigation={setBottomNavigation} newMessage={newMessage} setNewMessage={setNewMessage} />} />
                                </Route>
                            ) : (
                                <Route>
                                    <Route path='/' Component={() => <Home isLoggedIn={isLoggedIn} userObj={{ uid: null }} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} bottomNavigation={bottomNavigation} setBottomNavigation={setBottomNavigation} />} />
                                    <Route path='/specific' Component={() => <Specific isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    <Route path='/actions' Component={() => <Actions isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    <Route path='/allies' Component={() => <Allies isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    <Route path='/points' Component={() => <Points isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    {/* <Route path='/chats' Component={() => <Specific isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} /> */}
                                </Route>
                            )
                        }
                    </Routes>
                </div>
                <Navigations profileColor={profileColor} bottomNavigation={bottomNavigation} setBottomNavigation={setBottomNavigation} scroll={scroll} setScroll={setScroll} sides={sides[1]} counter={counter} isLoggedIn={isLoggedIn} value={value} setValue={setValue} tmpCounter={tmpCounter} />
            </div>
        </BrowserRouter>
    )
}

export default Router