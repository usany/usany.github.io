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
import { getStorage, ref } from "firebase/storage";
import { auth, dbservice } from 'src/baseApi/serverbase'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { sideNavigationStore, profileColorStore } from 'src/store'

const tmpCounter: [] = []
const Router = ({ userObj }: {
    userObj: {uid: string, displayName: string} | null,
}) => {
    const [counter, setCounter] = useState<number[]>([]);
    const [value, setValue] = useState<number>(0);
    // const [check, setCheck] = useState<boolean>(false)
    const [scroll, setScroll] = useState<number>(0)
    // const [profileColor, setProfileColor] = useState<string>('#2196f3')
    const piazzaSwitch = useRef<string | null>(localStorage.getItem('piazza'))
    const [newMessage, setNewMessage] = useState<boolean>(false)
    const sideNavigation = sideNavigationStore((state) => state.sideNavigation)
    const handleProfileColor = profileColorStore((state) => state.handleProfileColor)
    // const handleSideNavigation = sideNavigationStore((state) => state.handleSideNavigationStore)
    
    // const reducerSideNavigation = (state, action) => {
    //     if (action.type === 'toggle') {
    //         return {
    //             sideNavigation: !state.sideNavigation
    //         }
    //     }
    // }
    // const [stateSideNavigation, dispatchSideNavigation] = useReducer(reducerSideNavigation, {sideNavigation: false})
    const reducerNewMessage = (state, action) => {
        if (action.type === 'toggle') {
            return {
                newMessage: !state.newMessage
            }
        }
    }
    const [stateNewMessage, dispatchNewMessage] = useReducer(reducerNewMessage, {newMessage: false})

    // const handleSideNavigation = () => {
    //     dispatchSideNavigation({type: 'toggle'})
    // }
    const handleNewMessage = () => {
        dispatchNewMessage({type: 'toggle'})
    }
    useEffect(() => {
        if (!sideNavigation) {
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
        }
    })
    
    useEffect(() => {
        const setProfile = async () => {
            const docRef = doc(dbservice, `members/${userObj?.uid}`)
            const docSnap = await getDoc(docRef)
            const userColor = docSnap.data()?.profileColor
            handleProfileColor(userColor)
        }
        if (userObj) {
            setProfile()
        }
    }, [])
    // const sides = []
    // if (check === false) {
    // } else {
    //     sides.push(
    //         'fixed'
    //     )
    // }

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
                    setValue={(newState: number) => setValue(newState)}
                    // check={check} 
                    // setCheck={(newState: boolean) => setCheck(newState)} 
                    prevScrollPos={prevScrollPos} 
                    value={value}
                    storage={storage}
                    setScroll={(newState: number) => setScroll(newState)}
                    handleSideNavigation={() => dispatchSideNavigation({type: 'toggle'})}
                />
                <div
                    id='contentSelector'
                >
                    <Routes>
                        {
                            userObj ? (
                                <Route>
                                    <Route path='/' Component={() => <Home userObj={userObj} value={value} setValue={(newState: number) => setValue(newState)} counter={counter} setCounter={(newState: number[]) => setCounter(newState)} tmpCounter={tmpCounter} piazzaSwitch={piazzaSwitch} newMessage={newMessage} setNewMessage={(newMessage: boolean) => setNewMessage(newMessage)} />} />
                                    <Route path='/profile' Component={() => <Profile userObj={userObj} />} />
                                    <Route path='/ranking' Component={() => <Ranking userObj={userObj}/>} />
                                    <Route path='/specific' Component={() => <Specific userObj={userObj} value={value} setValue={(newState: number) => setValue(newState)} counter={counter} setCounter={(newState: number[]) => setCounter(newState)} />} />
                                    <Route path='/actions' Component={() => <Actions userObj={userObj} counter={counter} setCounter={(newState: number[]) => setCounter(newState)} setValue={(newState: number) => setValue(newState)} />} />
                                    <Route path='/allies' Component={() => <Allies />} />
                                    <Route path='/points' Component={() => <Points />} />
                                    <Route path='/contact' Component={() => <Contact displayName={userObj?.displayName} userObj={userObj} />} />
                                    <Route path='/piazza' Component={() => <Piazza userObj={userObj} piazzaSwitch={piazzaSwitch} />} />
                                    <Route path='/chatting' Component={() => <Chatting userObj={userObj} setNewMessage={(newState: boolean) => setNewMessage(newState)} />} />
                                </Route>
                            ) : (
                                <Route>
                                    <Route path='/' Component={() => <Home userObj={userObj} value={value} setValue={(newState: number) => setValue(newState)} counter={counter} setCounter={(newState: number[]) => setCounter(newState)} tmpCounter={tmpCounter} piazzaSwitch={piazzaSwitch} newMessage={newMessage} setNewMessage={(newMessage: boolean) => setNewMessage(newMessage)} />} />
                                    <Route path='/specific' Component={() => <Specific userObj={userObj} value={value} setValue={(newState: number) => setValue(newState)} counter={counter} setCounter={(newState: number[]) => setCounter(newState)} />} />
                                </Route>
                            )
                        }
                    </Routes>
                </div>
                <Navigations userObj={userObj} counter={counter} tmpCounter={tmpCounter} setScroll={(newState: number) => setScroll(newState)} />
            </div>
        </BrowserRouter>
    )
}

export default Router