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
import Paper from '@mui/material/Paper'

function Navigations({ sides, counter, isLoggedIn, value, setValue, scroll, setScroll }) {
    const navigate = useNavigate()
    // const ref = useRef(counter)

    // let badge
    // useEffect(() => {
    //     badge = counter
    //     ref.current = counter
    //     console.log(ref)
    //     console.log(badge)
    // })

    return (
        // <Paper sx={{bgcolor: 'rgba(0, 0, 0, 0.1)'}} className={sides} elevation={5}>
        <div className={sides} >
            {isLoggedIn &&
                <BottomNavigation
                    // sx={{bgcolor: 'rgba(0, 0, 0, 0.1)'}}    
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                        setScroll(0)
                        navigate('/postings/')
                    }}
                >
                    <BottomNavigationAction label={'빌리기'} icon={<ChevronLeft />}/>
                    <BottomNavigationAction label={'빌려주기'} icon={<ChevronRight/>}/>
                    <BottomNavigationAction label={'내 상태'} icon={<Badges counter={counter}/>}/>
                    <BottomNavigationAction label={'빌리기 목록'} icon={<Checklist />}/>
                    <BottomNavigationAction label={'빌려주기 목록'} icon={<ChecklistRtl />}/>
                </BottomNavigation>
            }
            {!isLoggedIn && 
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                        setScroll(0)
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
