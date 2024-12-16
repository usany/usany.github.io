import { useState, useEffect, useRef, useLayoutEffect, Suspense, lazy } from 'react'
import WeatherView from 'src/navigate/WeatherView'
import Navigation from 'src/navigate/Navigation'
import Avatar from '@mui/material/Avatar';
import ToggleTabs from 'src/muiComponents/ToggleTabs'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from 'firebase/firestore';
import { auth, dbservice } from 'src/baseApi/serverbase'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom'
import { CreditCard } from 'lucide-react';
import { MessageCircle, Minimize2, Maximize2 } from "lucide-react"
import { useSelector, useDispatch } from 'react-redux'
import { cardAccordionReducer, change } from 'src/stateSlices/cardAccordionSlice'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { changeMessageAccordion } from 'src/stateSlices/messageAccordionSlice'
import { changeProfileUrl } from 'src/stateSlices/profileUrlSlice'
import { changeProfileColor } from 'src/stateSlices/profileColorSlice'
import { changeProfileImage } from 'src/stateSlices/profileImageSlice'
import { User } from 'firebase/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// const Puller = styled('div')(({ theme }) => ({
//     width: 30,
//     height: 6,
//     backgroundColor: grey[300],
//     borderRadius: 3,
//     position: 'absolute',
//     top: 8,
//     left: 'calc(50% - 15px)',
//     ...theme.applyStyles('dark', {
//       backgroundColor: grey[900],
//     }),
//   }));
  
interface Props {
    userObj: User | null
}
const cli = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
        },
    }
})
const Header = ({ userObj }: Props) => {
    const bottomNavigation = useSelector(state => state.bottomNavigation.value)
    const profileUrl = useSelector(state => state.profileUrl.value)
    const profileColor = useSelector(state => state.profileColor.value)
    const profileImage = useSelector(state => state.profileImage.value)
    const [sideNavigation, setSideNavigation] = useState(false)
    const handleSideNavigation = () => {
        setSideNavigation(!sideNavigation)
    }
    const storage = getStorage();
    const [scroll, setScroll] = useState('')
    const cardAccordion = useSelector(state => state.cardAccordion.value)
    const messageAccordion = useSelector(state => state.messageAccordion.value)
    const dispatch = useDispatch()
    let prevScrollPos = window.scrollY;
    window.addEventListener('scroll', function () {
        // current scroll position
        const currentScrollPos = window.scrollY;
        if (prevScrollPos >= currentScrollPos) {
            setScroll('overflow-hidden h-28 fixed top-0 z-20 bg-light-3 dark:bg-dark-3')
            // user has scrolled up
            // document.querySelector('#navigationSelectorOne')?.classList.add('overflow-hidden fixed top-0 z-20 bg-light-3 dark:bg-dark-3')
            // document.querySelector('#navigationSelectorTwo')?.classList.add('fixed', 'top-0', 'z-10', 'bg-light-3', 'dark:bg-dark-3')
            // document.querySelector('#contentSelector')?.classList.add('pt-16')
        } else {
            setScroll('')
            // user has scrolled down
            // document.querySelector('#navigationSelectorOne')?.classList.remove('overflow-hidden', 'fixed', 'top-0', 'z-20', 'bg-light-3', 'dark:bg-dark-3')
            // document.querySelector('#navigationSelectorTwo')?.classList.remove('fixed', 'top-0', 'z-10', 'bg-light-3', 'dark:bg-dark-3')
            // document.querySelector('#contentSelector')?.classList.remove('pt-16')
        }
        // update previous scroll position
        prevScrollPos = currentScrollPos;
    });
    useEffect(() => {
        if (userObj) {
            getDownloadURL(ref(storage, `${userObj?.uid}`))
            .then((url) => {
                if (!profileUrl) {
                    if (url) {
                        dispatch(changeProfileImage(url))
                    } else {
                        dispatch(changeProfileImage('null'))
                    }
                }
                if (url) {
                    dispatch(changeProfileUrl(url))
                } else {
                    dispatch(changeProfileUrl(''))
                }
            })
            .catch((error) => {
                console.log(error)
            });
        }
    }, [userObj])
    
    useEffect(() => {
        const setAvatarColor = async () => {
            const docRef = doc(dbservice, `members/${userObj?.uid}`)
            const docSnap = await getDoc(docRef)
            const userColor = docSnap.data()?.profileColor || '#2196f3'
            dispatch(changeProfileColor(userColor))
        }
        setAvatarColor()
    }, [userObj])
    
    return (
        <div className='h-24 overflow-hidden'>
            <div className={scroll}>
                <Navigation userObj={userObj} handleSideNavigation={handleSideNavigation} sideNavigation={sideNavigation} />
                <div className='flex justify-between w-screen'>
                    <div className='px-5 pt-1'>
                        {userObj ?
                            <Avatar alt={userObj.displayName || ''} sx={{ bgcolor: profileColor || '#2196f3' }} src={profileImage || './src'} onClick={() => {
                                handleSideNavigation()
                            }} variant="rounded" />
                            :
                            <Avatar sx={{ bgcolor: '#2196f3' }} onClick={() => {
                                handleSideNavigation()
                            }} variant="rounded" />
                        }
                    </div>
                    <div>
                        {userObj && bottomNavigation === 0 && 
                            <ToggleTabs />
                        }
                        {userObj && bottomNavigation === 1 &&
                            <FormGroup>
                                <div className='flex w-1/2'>
                                    <div className='flex flex-col'>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={cardAccordion}
                                                    onClick={() => dispatch(change())}
                                                />
                                            } 
                                            // label="카드" 
                                            label={<CreditCard/>} 
                                        />
                                        <Divider sx={{width: '100%'}} />
                                    </div>
                                    <div className='px-1'></div>
                                    <div className='flex flex-col'>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={messageAccordion}
                                                    onClick={() => dispatch(changeMessageAccordion())}
                                                />
                                            } 
                                            // label="메세지" 
                                            label={<MessageCircle/>} 
                                        />
                                        <Divider sx={{width: '100%'}} />
                                    </div>
                                </div>
                            </FormGroup>
                        }
                        {userObj && bottomNavigation === 2 && 
                            <ToggleTabs />
                        }
                        {!userObj && 
                            <div>
                                <Link to='/'>
                                    <div className='pt-5 min-w-36' onClick={() => dispatch(changeBottomNavigation(1))}>로그인을 해 주세요</div>
                                </Link>
                                <Divider sx={{width: '100%'}} />
                            </div>
                        }
                    </div>
                    <div>
                        <QueryClientProvider client={new QueryClient({
                            defaultOptions: {
                                queries: {
                                    suspense: true,
                                },
                            },
                        })}>
                            <Suspense fallback={<div>loading</div>}>
                                <WeatherView />
                            </Suspense>
                        </QueryClientProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header