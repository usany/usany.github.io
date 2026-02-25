import { alpha } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Pencil, Presentation, Umbrella } from 'lucide-react'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import useCardsBackground from 'src/hooks/useCardsBackground'
import useSelectors from 'src/hooks/useSelectors'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { changePiazzaForm } from 'src/stateSlices/piazzaFormSlice'
import texts from 'src/texts.json'

function Navigations() {
  const { colorTwo } = useCardsBackground()
  const piazzaForm = useSelectors((state) => state.piazzaForm.value)
  const bottomNavigation = useSelectors((state) => state.bottomNavigation.value)
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)
  const tabs = useSelectors((state) => state.tabs.value)
  const dispatch = useDispatch()
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  // const [backgroundColor, setBackgroundColor] = useState('#e2e8f0')
  // const theme = useSelectors((state) => state.theme.value)
  // useEffect(() => {
  //   if (theme === 'dark') {
  //     setBackgroundColor('#2d3848')
  //   } else {
  //     setBackgroundColor('#e2e8f0')
  //   }
  // }, [theme])
  const location = useLocation()
  useEffect(() => {
    const checkSize = () => setIsLargeScreen(window.innerWidth >= 768)
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])
  useEffect(() => {
    if (location.pathname === '/add') {
      dispatch(changeBottomNavigation(0))
    } else if (location.pathname === '/') {
      dispatch(changeBottomNavigation(1))
    } else if (location.pathname === '/board') {
      dispatch(changeBottomNavigation(2))
    } else {
      dispatch(changeBottomNavigation(5))
    }
  })
  useEffect(() => {
    const listener = (event) => {
      const minKeyboardHeight = 400
      const newState = window.screen.height - minKeyboardHeight > (window.visualViewport?.height || window.screen.height)
      // const height = event?.target.height ? event?.target.height.toFixed(0) : 0
      // console.log(height)
      // const newState =
      //   window.screen.height - minKeyboardHeight > 1000
      //     ? 500
      //     : 300 > (window.visualViewport?.height || window.screen.height)
      // console.log(window.screen.height)
      // console.log(window.visualViewport?.height)
      if (piazzaForm !== newState) {
        // setIsKeyboardOpen(newState)
        // dispatch(changeScreenHeight(height))
        dispatch(changePiazzaForm(newState))
        document.body.style.height = `${event?.target.height}px`
      }
    }
    window.addEventListener('resize', (event) => listener(event))
    if (typeof visualViewport !== 'undefined') {
      window.visualViewport?.addEventListener('resize', (event) => listener(event))
    }
    return () => {
      if (typeof visualViewport !== 'undefined') {
        window.visualViewport?.removeEventListener('resize', (event) => listener(event))
      }
    }
  }, [piazzaForm])
  const navigate = useNavigate()
  // console.log(window.screen.height)
  // console.log(window.visualViewport?.height)
  return (
    <>
      <div className="w-full z-50 fixed bottom-0 start-0 end-0">
        {(!piazzaForm || location.pathname !== '/piazza') && (
          <div className={isLargeScreen ? "z-50 fixed bottom-4 left-1/2 transform -translate-x-1/2" : "w-full z-50 fixed bottom-0 start-0 end-0"}>
            <BottomNavigation
              sx={{
                bgcolor: alpha(colorTwo, 0.8),
                borderRadius: isLargeScreen ? '20px' : '10px',
                ...(isLargeScreen ? {} : { borderTop: '1px solid' }),
                width: isLargeScreen ? 'auto' : '100%',
                maxWidth: isLargeScreen ? '300px' : 'none'
              }}
              showLabels={!isLargeScreen}
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
          </div>)
        }
      </div>
    </>
  )
}

export default Navigations
