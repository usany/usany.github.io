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
import { useSelector, useDispatch } from 'react-redux'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { User } from 'firebase/auth';
import { alpha } from "@mui/material";

interface Props {
    userObj: User | null
}
function Navigations({ userObj }: Props) {
    const [backgroundColor, setBackgroundColor] = useState('#e2e8f0');
    const theme = useSelector(state => state.theme.value)
    const bottomNavigation = useSelector(state => state.bottomNavigation.value)
    const dispatch = useDispatch()

    useEffect(() => {
        if (theme === 'dark') {
        setBackgroundColor('#2d3848')
        } else {
        setBackgroundColor('#e2e8f0')
        }
    }, [theme])

    const navigate = useNavigate()

    return (
        <div className='w-screen fixed border border-sky-500 rounded-t bottom-0 start-0 end-0'>
            {userObj ?
                <BottomNavigation
                    sx={{bgcolor: alpha(backgroundColor, 0.8)}}    
                    showLabels
                    value={bottomNavigation}
                    onChange={(event, newValue) => {
                        dispatch(changeBottomNavigation(newValue))
                        navigate('/')
                    }}
                >
                    <BottomNavigationAction label={'등록'} icon={<ChevronLeft />}/>
                    <BottomNavigationAction label={'내 상태'} icon={<Badges />}/>
                    <BottomNavigationAction label={'게시판'} icon={<Checklist />}/>
                </BottomNavigation>
                :
                <BottomNavigation
                    sx={{bgcolor: backgroundColor}}    
                    showLabels
                    value={bottomNavigation}
                    onChange={(event, newValue) => {
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
