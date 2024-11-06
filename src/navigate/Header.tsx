import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import WeatherView from 'src/navigate/WeatherView'
import Navigation from 'src/navigate/Navigation'
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import ToggleTabs from 'src/muiComponents/ToggleTabs'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useSideNavigationStore, useBottomNavigationStore, useAvatarColorStore } from 'src/store'
import { doc, getDoc } from 'firebase/firestore';
import { auth, dbservice } from 'src/baseApi/serverbase'

const Header = ({ userObj, storage }: 
    {
        userObj: {uid: string, displayName: string} | null,
        storage: {}
    }
) => {
    const [profileImage, setProfileImage] = useState(null)
    const bottomNavigation = useBottomNavigationStore((state) => state.bottomNavigation)
    const profileColor = useAvatarColorStore((state) => state.profileColor)
    const handleProfileColor = useAvatarColorStore((state) => state.handleProfileColor)
    const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)
    // const sideNavigation = useRef<boolean>(false)
    // const handleSideNavigation = () => {
    //     sideNavigation.current = !sideNavigation.current
    //     console.log(sideNavigation.current)
    // }
    // const handleSideNavigation = useSideNavigationStore((state) => state.handleSideNavigation)
    const [sideNavigation, setSideNavigation] = useState(false)
    const handleSideNavigation = () => {
        setSideNavigation(!sideNavigation)
    }
    
    useLayoutEffect(() => {
        getDownloadURL(ref(storage, 'screen.jpg'))
        .then((url) => {
            setProfileImage(url)
        })
        .catch((error) => {
            console.log(error)
        });
        setProfileImage(null)
    })
    
    useEffect(() => {
        const setProfile = async () => {
            const docRef = doc(dbservice, `members/${userObj?.uid}`)
            const docSnap = await getDoc(docRef)
            const userColor = docSnap.data()?.profileColor
            handleProfileColor(userColor)
        }
        setProfile()
    }, [])
    
    return (
        <div className='flex flex-row'>
                <div id='navigationSelectorOne' className='pt-1'>
                    <Navigation userObj={userObj} handleSideNavigation={handleSideNavigation} sideNavigation={sideNavigation} />
                    <div className='flex justify-between w-screen'>
                        <div className='px-5 pt-1'>
                            {userObj ?
                                <Avatar alt={userObj.displayName} sx={{ bgcolor: profileColor }} src='./src' onClick={() => {
                                    // setCheck(!check)
                                    // setScroll(prevScrollPos)
                                    // sideNavigation.current = true
                                    handleSideNavigation()
                                    // handleSideNav()
                                }} />
                                :
                                <Avatar sx={{ bgcolor: blue[500] }} onClick={() => {
                                    // setCheck(!check)
                                    // setScroll(prevScrollPos)
                                    // sideNavigation.current = true
                                    handleSideNavigation()
                                    // handleSideNav()
                                }} />
                            }
                        </div>
                        {/* <div>
                            <img src={profile}/>
                        </div> */}
                        <div>
                            {userObj && bottomNavigation === 0 && 
                                <ToggleTabs />
                            }
                            {userObj && bottomNavigation === 2 && 
                                <ToggleTabs />
                            }
                            {!userObj && 
                                <div className='pt-5 min-w-36' onClick={() => handleBottomNavigation(1)}>로그인을 해 주세요</div>
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