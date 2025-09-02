import { alpha } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { User } from 'firebase/auth'
import { Pencil, Presentation, Umbrella } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelectors } from 'src/hooks/useSelectors'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { changePiazzaForm } from 'src/stateSlices/piazzaFormSlice'
import texts from 'src/texts.json'

interface ThemeRootState {
  theme: string
}
function Navigations() {
  const [backgroundColor, setBackgroundColor] = useState('#e2e8f0')
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const theme = useSelector((state: ThemeRootState) => state.theme.value)
  const piazzaForm = useSelector((state) => state.piazzaForm.value)
  const bottomNavigation = useSelectors((state) => state.bottomNavigation.value)
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)
  const tabs = useSelectors((state) => state.tabs.value)
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
  // console.log(window.visualViewport?.height)
  useEffect(() => {
    const listener = () => {
      const newState =
        window.screen.height - window.screen.height > 1000
          ? 500
          : 300 > (window.visualViewport?.height || window.screen.height)
      if (isKeyboardOpen !== newState) {
        setIsKeyboardOpen(newState)
        dispatch(changePiazzaForm(newState))
      }
    }
    window.addEventListener('resize', listener)
    if (typeof visualViewport !== 'undefined') {
      window.visualViewport?.addEventListener('resize', listener)
    }
    // visualViewport?.addEventListener('resize', listener)
    // if (typeof visualViewport !== 'undefined') {
    //   visualViewport?.addEventListener('resize', listener);
    // }
    return () => {
      if (typeof visualViewport !== 'undefined') {
        window.visualViewport?.removeEventListener('resize', listener)
        // visualViewport?.removeEventListener('resize', listener);
      }
    }
  }, [isKeyboardOpen])
  const navigate = useNavigate()

  return (
    <>
      {!piazzaForm && (
        <div className="w-screen border-t z-50 fixed rounded-t bottom-0 start-0 end-0">
          <BottomNavigation
            sx={{ bgcolor: alpha(backgroundColor, 0.8) }}
            showLabels
            value={bottomNavigation}
            onChange={(event, newValue) => {
              dispatch(changeBottomNavigation(newValue))
            }}
          >
            <BottomNavigationAction
              onClick={() =>
                navigate(`/add?action=${tabs ? 'lend' : 'borrow'}`)
              }
              label={texts[languages as keyof typeof texts]['register']}
              icon={<Pencil />}
            />
            <BottomNavigationAction
              onClick={() => navigate('/')}
              label={
                profile?.certificated
                  ? texts[languages as keyof typeof texts]['myStatus']
                  : texts[languages as keyof typeof texts]['logIn']
              }
              icon={<Umbrella />}
            />
            <BottomNavigationAction
              onClick={() =>
                navigate(`/board?action=${tabs ? 'lend' : 'borrow'}`)
              }
              label={texts[languages as keyof typeof texts]['board']}
              icon={<Presentation />}
            />
          </BottomNavigation>
        </div>
      )}
    </>
  )
}

export default Navigations
