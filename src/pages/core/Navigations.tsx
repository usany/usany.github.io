import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import Badges from 'src/components/Badges'
import { alpha } from "@mui/material";
import { User } from 'firebase/auth';
import { Pencil, Presentation, Umbrella } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useSelectors } from 'src/hooks/useSelectors';
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice';

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
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/add') {
      dispatch(changeBottomNavigation(0))
    } else if (location.pathname === '/') {
      dispatch(changeBottomNavigation(1))
    } else if (location.pathname === '/board') {
      dispatch(changeBottomNavigation(2))
    }
  })
  const navigate = useNavigate()

  return (
    <div className='z-50 fixed rounded-t bottom-0 start-0 end-0'>
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
