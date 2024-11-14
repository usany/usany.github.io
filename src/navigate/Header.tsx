import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import WeatherView from 'src/navigate/WeatherView'
import Navigation from 'src/navigate/Navigation'
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import ToggleTabs from 'src/muiComponents/ToggleTabs'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useSideNavigationStore, useCardAccordionStore, useMessageAccordionStore, useBottomNavigationStore, useAvatarColorStore, useAvatarImageStore } from 'src/store'
import { doc, getDoc } from 'firebase/firestore';
import { auth, dbservice } from 'src/baseApi/serverbase'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom'

interface Props {
    userObj: {uid: string, displayName: string} | null
}

const Header = ({ userObj }: Props) => {
    const bottomNavigation = useBottomNavigationStore((state) => state.bottomNavigation)
    const avatarColor = useAvatarColorStore((state) => state.avatarColor)
    const handleAvatarColor = useAvatarColorStore((state) => state.handleAvatarColor)
    const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)
    const avatarImage = useAvatarImageStore((state) => state.avatarImage)
    const handleAvatarImage = useAvatarImageStore((state) => state.handleAvatarImage)
    const cardAccordion = useCardAccordionStore((state) => state.cardAccordion)
    const handleCardAccordion = useCardAccordionStore((state) => state.handleCardAccordion)
    const messageAccordion = useMessageAccordionStore((state) => state.messageAccordion)
    const handleMessageAccordion = useMessageAccordionStore((state) => state.handleMessageAccordion)
    const [sideNavigation, setSideNavigation] = useState(false)
    const handleSideNavigation = () => {
        setSideNavigation(!sideNavigation)
    }
    const storage = getStorage();
    // const storageRef = ref(storage, 'screen.jpg'); 

    useEffect(() => {
        getDownloadURL(ref(storage, 'screen.jpg'))
        .then((url) => {
            handleAvatarImage(url)
        })
        .catch((error) => {
            console.log(error)
        });
    }, [])
    
    useEffect(() => {
        const setAvatarColor = async () => {
            const docRef = doc(dbservice, `members/${userObj?.uid}`)
            const docSnap = await getDoc(docRef)
            const userColor = docSnap.data()?.avatarColor
            handleAvatarColor(userColor)
        }
        setAvatarColor()
    }, [])

    return (
        <div className='flex flex-row'>
            <div id='navigationSelectorOne' className='pt-1'>
                <Navigation userObj={userObj} handleSideNavigation={handleSideNavigation} sideNavigation={sideNavigation} />
                <div className='flex justify-between w-screen'>
                    <div className='px-5 pt-1'>
                        {userObj ?
                            <Avatar alt={userObj?.displayName} sx={{ bgcolor: avatarColor || blue[500] }} src={avatarImage || undefined} onClick={() => {
                                handleSideNavigation()
                            }} />
                            :
                            <Avatar sx={{ bgcolor: blue[500] }} onClick={() => {
                                handleSideNavigation()
                            }} />
                        }
                    </div>
                    <div>
                        {userObj && bottomNavigation === 0 && 
                            <ToggleTabs />
                        }
                        {userObj && bottomNavigation === 1 &&
                            <FormGroup>
                                <div className='flex'>
                                    <div className='flex flex-col'>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={cardAccordion}
                                                    onClick={handleCardAccordion}
                                                />
                                            } 
                                            label="카드" 
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
                                            label="메세지" 
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