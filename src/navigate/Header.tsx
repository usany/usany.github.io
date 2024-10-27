import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import WeatherView from 'src/navigate/WeatherView'
import Navigation from 'src/navigate/Navigation'
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import ToggleTabs from 'src/muiComponents/Tabs'
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Header = ({ bottomNavigation, setBottomNavigation, setScroll, userObj, setValue, check, setCheck, setMode, prevScrollPos, value, profileColor, storage }) => {
    const [profile, setProfile] = useState(null)
    useLayoutEffect(() => {
        getDownloadURL(ref(storage, 'screen.jpg'))
        .then((url) => {
            setProfile(url)
        })
        .catch((error) => {
            console.log(error)
        });
        setProfile(null)
    })
    
    return (
        <div className='flex flex-row'>
                <div id='navigationSelectorOne' className='pt-1'>
                    <Navigation setScroll={setScroll} userObj={userObj} setValue={setValue} check={check} setCheck={setCheck} setMode={setMode}/>
                    <div className='flex justify-between w-screen'>
                        <div className='px-5 pt-1'>
                            {userObj ?
                                <Avatar alt={userObj.displayName} sx={{ bgcolor: profileColor }} src='./src' onClick={() => {
                                    setCheck(!check)
                                    setScroll(prevScrollPos)
                                }} />
                                :
                                <Avatar sx={{ bgcolor: blue[500] }} onClick={() => {
                                    setCheck(!check)
                                    setScroll(prevScrollPos)
                                }} />
                            }
                        </div>
                        {/* <div>
                            <img src={profile}/>
                        </div> */}
                        <div>
                    {userObj && bottomNavigation === 0 && 
                        <ToggleTabs valuing={value} setValuing={setValue}/>
                    }
                    {userObj && bottomNavigation === 2 && 
                        <ToggleTabs valuing={value} setValuing={setValue}/>
                    }
                    {!userObj && 
                        <div className='pt-5 min-w-36' onClick={() => setBottomNavigation(1)}>로그인을 해 주세요</div>
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