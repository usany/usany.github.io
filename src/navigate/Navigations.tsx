import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ChevronRight from '@mui/icons-material/ChevronRight'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import Checklist from '@mui/icons-material/Checklist'
import ChecklistRtl from '@mui/icons-material/ChecklistRtl'
import BeachAccess from '@mui/icons-material/BeachAccess'
import Badges from 'src/muiComponents/Badges'

function Navigations({ bottomNavigation, setBottomNavigation, counter, userObj, setScroll, tmpCounter }) {
    // const [colors, setColors] = useState(localStorage.getItem("theme"));
    // const [color, setColor] = useState('#e2e8f0');
    const [backgroundColor, setBackgroundColor] = useState('#e2e8f0');
      
    useEffect(() => {
        if (localStorage.getItem("theme") === 'dark') {
        setBackgroundColor('#2d3848')
        } else {
        setBackgroundColor('#e2e8f0')
        }
    })

    const navigate = useNavigate()

    return (
        <div className='w-screen fixed border border-sky-500 rounded-t bottom-0 start-0 end-0'>
            {userObj &&
                <BottomNavigation
                    sx={{bgcolor: {backgroundColor}}}    
                    showLabels
                    value={bottomNavigation}
                    onChange={(event, newValue) => {
                        setBottomNavigation(newValue)
                        setScroll(0)
                        navigate('/')
                    }}
                >
                    <BottomNavigationAction label={'등록'} icon={<ChevronLeft />}/>
                    {/* <BottomNavigationAction label={'빌리기'} icon={<ChevronLeft />}/>
                    <BottomNavigationAction label={'빌려주기'} icon={<ChevronRight/>}/> */}
                    <BottomNavigationAction label={'내 상태'} icon={<Badges counter={counter} tmpCounter={tmpCounter}/>}/>
                    <BottomNavigationAction label={'게시판'} icon={<Checklist />}/>
                    {/* <BottomNavigationAction label={'빌리기 목록'} icon={<Checklist />}/>
                    <BottomNavigationAction label={'빌려주기 목록'} icon={<ChecklistRtl />}/> */}
                </BottomNavigation>
            }
            {!userObj && 
                <BottomNavigation
                    sx={{bgcolor: backgroundColor}}    
                    showLabels
                    value={bottomNavigation}
                    onChange={(event, newValue) => {
                        setBottomNavigation(newValue)
                        setScroll(0)
                        navigate('/')
                    }}
                >
                    <BottomNavigationAction label={'빌리기 목록'} icon={<Checklist />}/>
                    <BottomNavigationAction label={'로그인'} icon={<BeachAccess />}/>
                    <BottomNavigationAction label={'빌려주기 목록'} icon={<ChecklistRtl />}/>
                </BottomNavigation>
            }
        </div>
    )
}

export default Navigations
