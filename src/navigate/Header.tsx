import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import WeatherView from 'src/navigate/WeatherView'
import Navigation from 'src/navigate/Navigation'
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import ToggleTabs from 'src/muiComponents/ToggleTabs'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useSideNavigationStore, useCardAccordionStore, useMessageAccordionStore, useBottomNavigationStore, useAvatarColorStore, useAvatarImageStore, useProfileUrlStore } from 'src/store'
import { doc, getDoc } from 'firebase/firestore';
import { auth, dbservice } from 'src/baseApi/serverbase'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom'
import { CreditCard } from 'lucide-react';
import { MessageCircle } from "lucide-react"
import { Minimize2 } from 'lucide-react';
import { Maximize2 } from 'lucide-react';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux'
import { cardAccordionReducer, change } from 'src/stateSlices/cardAccordionSlice'
import { User } from 'firebase/auth';

const Puller = styled('div')(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: grey[300],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
    ...theme.applyStyles('dark', {
      backgroundColor: grey[900],
    }),
  }));
  
interface Props {
    userObj: User | null
}

const Header = ({ userObj }: Props) => {
    const bottomNavigation = useBottomNavigationStore((state) => state.bottomNavigation)
    const avatarColor = useAvatarColorStore((state) => state.avatarColor)
    const handleAvatarColor = useAvatarColorStore((state) => state.handleAvatarColor)
    const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)
    const avatarImage = useAvatarImageStore((state) => state.avatarImage)
    const handleAvatarImage = useAvatarImageStore((state) => state.handleAvatarImage)
    const {profileUrl, handleProfileUrl} = useProfileUrlStore()
    // const cardAccordion = useCardAccordionStore((state) => state.cardAccordion)
    // const handleCardAccordion = useCardAccordionStore((state) => state.handleCardAccordion)
    const messageAccordion = useMessageAccordionStore((state) => state.messageAccordion)
    const handleMessageAccordion = useMessageAccordionStore((state) => state.handleMessageAccordion)
    const [sideNavigation, setSideNavigation] = useState(false)
    const handleSideNavigation = () => {
        setSideNavigation(!sideNavigation)
    }
    const storage = getStorage();
    // const storageRef = ref(storage, 'screen.jpg'); 
    const [scroll, setScroll] = useState('')
    const cardAccordion = useSelector(state => state.cardAccordion.value)
    const dispatch = useDispatch()
  
    let prevScrollPos = window.scrollY;
    window.addEventListener('scroll', function () {
        // current scroll position
        const currentScrollPos = window.scrollY;
        if (prevScrollPos >= currentScrollPos) {
            // user has scrolled up
            // document.querySelector('#navigationSelectorOne')?.classList.add('overflow-hidden fixed top-0 z-20 bg-light-3 dark:bg-dark-3')
            setScroll('overflow-hidden h-28 fixed top-0 z-20 bg-light-3 dark:bg-dark-3')
            // document.querySelector('#navigationSelectorTwo')?.classList.add('fixed', 'top-0', 'z-10', 'bg-light-3', 'dark:bg-dark-3')
            // document.querySelector('#contentSelector')?.classList.add('pt-16')
        } else {
            // user has scrolled down
            // document.querySelector('#navigationSelectorOne')?.classList.remove('overflow-hidden', 'fixed', 'top-0', 'z-20', 'bg-light-3', 'dark:bg-dark-3')
            setScroll('')
            // document.querySelector('#navigationSelectorTwo')?.classList.remove('fixed', 'top-0', 'z-10', 'bg-light-3', 'dark:bg-dark-3')
            // document.querySelector('#contentSelector')?.classList.remove('pt-16')
        }
        // update previous scroll position
        prevScrollPos = currentScrollPos;
    });
    useEffect(() => {
        getDownloadURL(ref(storage, `${userObj?.uid}`))
        .then((url) => {
            if (!profileUrl) {
                handleAvatarImage(url)
            }
            handleProfileUrl(url)
        })
        .catch((error) => {
            console.log(error)
        });
    }, [userObj])
    
    useEffect(() => {
        const setAvatarColor = async () => {
            const docRef = doc(dbservice, `members/${userObj?.uid}`)
            const docSnap = await getDoc(docRef)
            const userColor = docSnap.data()?.profileColor || '#2196f3'
            handleAvatarColor(userColor)
        }
        setAvatarColor()
    }, [userObj])
    // console.log(avatarImage)
    return (
        <div className='h-28 overflow-hidden'>
            <div 
                // id='navigationSelectorOne' 
                className={scroll}
            >
                <Navigation userObj={userObj} handleSideNavigation={handleSideNavigation} sideNavigation={sideNavigation} />
                <div className='flex justify-between w-screen'>
                    <div className='px-5 pt-1'>
                        {userObj ?
                            <Avatar alt={userObj?.displayName} sx={{ bgcolor: avatarColor || blue[500] }} src={avatarImage || './src'} onClick={() => {
                                handleSideNavigation()
                            }} variant="rounded" />
                            :
                            <Avatar sx={{ bgcolor: blue[500] }} onClick={() => {
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
                                                    onClick={handleMessageAccordion}
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
                                    <div className='pt-5 min-w-36' onClick={() => handleBottomNavigation(1)}>로그인을 해 주세요</div>
                                </Link>
                                <Divider sx={{width: '100%'}} />
                            </div>
                        }
                    </div>
                    <div>
                        <WeatherView />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header