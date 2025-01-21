import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ChevronRight from '@mui/icons-material/ChevronRight'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import Checklist from '@mui/icons-material/Checklist'
import ChecklistRtl from '@mui/icons-material/ChecklistRtl'
import BeachAccess from '@mui/icons-material/BeachAccess'
import Badges from 'src/muiComponents/Badges'
import { useSelector, useDispatch } from 'react-redux'
import { selectBottomNavigation, changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { User } from 'firebase/auth';
import { alpha } from "@mui/material";

interface Props {
    userObj: User | null
}
interface ThemeRootState  {
    theme: string
}
interface BottomNavigationRootState  {
    bottomNavigation: number
}
function Navigations({ userObj }: Props) {
    const [backgroundColor, setBackgroundColor] = useState('#e2e8f0');
    const theme = useSelector((state: ThemeRootState) => state.theme)
    const bottomNavigation = useSelector(selectBottomNavigation)
    const dispatch = useDispatch()
    const location = useLocation();
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
                        if (location.pathname !== '/') {
                            navigate('/')
                        }
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
                        dispatch(changeBottomNavigation(newValue))
                        if (location.pathname !== '/') {
                            navigate('/')
                        }
                    }}
                >
                    <BottomNavigationAction label={'등록'} icon={<Checklist />}/>
                    <BottomNavigationAction label={'로그인'} icon={<BeachAccess />}/>
                    <BottomNavigationAction label={'게시판'} icon={<ChecklistRtl />}/>
                </BottomNavigation>
            }
        </div>
    )
}

export default Navigations
