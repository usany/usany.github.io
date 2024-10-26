import { useState, useEffect, useRef, useMemo, useLayoutEffect, useContext } from 'react'
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

const tmpCounter: [] = []
const Router = ({ isLoggedIn, userObj, setUserObj, setMode, bottomNavigation, setBottomNavigation }: {
    isLoggedIn: boolean,
    userObj: {uid: string} | null,
    setUserObj: (newState: {uid: string}) => void,
    setMode: (newState: string) => void,
    bottomNavigation: number,
    setBottomNavigation: (newState: number) => void
}) => {
    const [counter, setCounter] = useState<number[]>([]);
    const [value, setValue] = useState<number>(0);
    const [check, setCheck] = useState<boolean>(false)
    const [scroll, setScroll] = useState<number>(0)
    const [profileColor, setProfileColor] = useState<string | null>(null)
    const piazzaSwitch = useRef<string | null>(localStorage.getItem('piazza'))
    const [newMessage, setNewMessage] = useState<boolean>(false)
    
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
        }
    })
    console.log(profileColor)
    useLayoutEffect(() => {
        const setProfile = async () => {
            const docRef = doc(dbservice, `members/${userObj?.uid}`)
            const docSnap = await getDoc(docRef)
            const userColor = docSnap.data()?.profileColor || '#2196f3'
            setProfileColor(userColor)
        }
        if (userObj) {
            setProfile()
        }
    }, [])
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
    // const [counter, setCounter] = useState<number[]>([]);
    // const [value, setValue] = useState<number>(0);
    // const [check, setCheck] = useState<boolean>(false)
    // const [scroll, setScroll] = useState<number>(0)
    // const [profileColor, setProfileColor] = useState<string | null>(null)
    // const piazzaSwitch = useRef<string | null>(localStorage.getItem('piazza'))
    // const [newMessage, setNewMessage] = useState<boolean>(false)
    // const returnInArray = <T,>(value: T): T[] => {
    //     return [value];
    // };
      
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
                    bottomNavigation={bottomNavigation}
                    scroll={scroll}
                    setScroll={setScroll}
                    isLoggedIn={isLoggedIn}
                    userObj={userObj}
                    setUserObj={setUserObj}
                    setValue={setValue}
                    check={check} setCheck={setCheck} setMode={setMode} prevScrollPos={prevScrollPos} value={value}
                    profileColor={profileColor}
                    storage={storage}
                    storageRef={storageRef}
                />
                <div
                    id='contentSelector'
                >
                    <Routes>
                        {
                            isLoggedIn ? (
                                <Route>
                                    <Route path='/' Component={() => <Home isLoggedIn={isLoggedIn} userObj={userObj} value={value} setValue={(newState: number) => setValue(newState)} counter={counter} setCounter={setCounter} tmpCounter={tmpCounter} bottomNavigation={bottomNavigation} setBottomNavigation={setBottomNavigation} piazzaSwitch={piazzaSwitch} newMessage={newMessage} setNewMessage={setNewMessage} />} />
                                    <Route path='/profile' Component={() => <Profile userObj={userObj} setBottomNavigation={setBottomNavigation} profileColor={profileColor} setProfileColor={setProfileColor} />} />
                                    <Route path='/ranking' Component={() => <Ranking userObj={userObj} setBottomNavigation={setBottomNavigation} />} />
                                    <Route path='/specific' Component={() => <Specific isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} />} />
                                    <Route path='/actions' Component={() => <Actions isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    <Route path='/allies' Component={() => <Allies isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    <Route path='/points' Component={() => <Points isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    <Route path='/contact' Component={() => <Contact displayName={userObj.displayName} isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
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
                <Navigations profileColor={profileColor} bottomNavigation={bottomNavigation} setBottomNavigation={setBottomNavigation} scroll={scroll} setScroll={setScroll} counter={counter} isLoggedIn={isLoggedIn} value={value} setValue={setValue} tmpCounter={tmpCounter} />
            </div>
        </BrowserRouter>
    )
}

export default Router