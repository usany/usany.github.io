import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import WeatherView from 'src/navigate/WeatherView'
import Navigation from 'src/navigate/Navigation'
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import ToggleTabs from 'src/muiComponents/Tabs'
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Header = ({ bottomNavigation, setBottomNavigation, setScroll, userObj, setValue, check, setCheck, setMode, prevScrollPos, value, profileColor, storage, stateMode, handleModes, handleSideNavigation }: 
    {
        bottomNavigation: number,
        setBottomNavigation: (newState: number) => void,
        setScroll: (newState: number) => void,
        userObj: {uid: string, displayName: string} | null,
        setValue: (newState: number) => void,
        check: boolean,
        setCheck: (newState: boolean) => void,
        setMode: (newState: string) => void,
        prevScrollPos: number,
        value: number, 
        profileColor: string, 
        storage: {}
    }
) => {
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
                    <Navigation setScroll={(newState: number) => setScroll(newState)} userObj={userObj} setValue={(newState: number) => setValue(newState)} check={check} setCheck={(newState: boolean) => setCheck(newState)} setMode={(newState: string) => setMode(newState)} stateMode={stateMode} handleModes={handleModes} handleSideNavigation={handleSideNavigation} />
                    <div className='flex justify-between w-screen'>
                        <div className='px-5 pt-1'>
                            {userObj ?
                                <Avatar alt={userObj.displayName} sx={{ bgcolor: profileColor }} src='./src' onClick={() => {
                                    setCheck(!check)
                                    setScroll(prevScrollPos)
                                    handleSideNavigation()
                                }} />
                                :
                                <Avatar sx={{ bgcolor: blue[500] }} onClick={() => {
                                    setCheck(!check)
                                    setScroll(prevScrollPos)
                                    handleSideNavigation()
                                }} />
                            }
                        </div>
                        {/* <div>
                            <img src={profile}/>
                        </div> */}
                        <div>
                    {userObj && bottomNavigation === 0 && 
                        <ToggleTabs valuing={value} setValuing={(newState: number) => setValue(newState)}/>
                    }
                    {userObj && bottomNavigation === 2 && 
                        <ToggleTabs valuing={value} setValuing={(newState: number) => setValue(newState)}/>
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