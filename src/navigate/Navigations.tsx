import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ChevronRight from '@mui/icons-material/ChevronRight'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import Checklist from '@mui/icons-material/Checklist'
import ChecklistRtl from '@mui/icons-material/ChecklistRtl'
import BeachAccess from '@mui/icons-material/BeachAccess'
// import Badges from 'src/components/Badges'
import { useSelector, useDispatch } from 'react-redux'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { User } from 'firebase/auth';
import { alpha } from "@mui/material";
import { useSelectors } from 'src/hooks/useSelectors';
import { Pencil, Presentation, Umbrella } from 'lucide-react';

interface Props {
  userObj: User | null
}
interface ThemeRootState {
  theme: string
}
function Navigations({ userObj }: Props) {
  const [backgroundColor, setBackgroundColor] = useState('#e2e8f0');
  const theme = useSelector((state: ThemeRootState) => state.theme)
  const bottomNavigation = useSelectors(state => state.bottomNavigation.value)
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
      <BottomNavigation
        sx={{ bgcolor: alpha(backgroundColor, 0.8) }}
        showLabels
        value={bottomNavigation}
        onChange={(event, newValue) => {
          dispatch(changeBottomNavigation(newValue))
        }}
      >
        <BottomNavigationAction onClick={() => navigate('/add')} label={'등록'} icon={<Pencil />} />
        <BottomNavigationAction onClick={() => navigate('/')} label={userObj ? '내 상태' : '로그인'} icon={<Umbrella />} />
        <BottomNavigationAction onClick={() => navigate('/board')} label={'게시판'} icon={<Presentation />} />
      </BottomNavigation>
    </div>
  )
}

export default Navigations
