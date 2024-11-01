import { useEffect, useState, useContext, useReducer } from 'react'
import Router from 'src/Router'
import Lotties from 'src/lottiesAnimation/Lotties'
import { auth } from 'src/baseApi/serverbase'
import { modeStore } from 'src/store'
import 'src/global.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  // const [count, setCount] = useState(0)
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const reducerMode = (state, action) => {
    if (action.type === 'toggle') {
      if (state.mode !== 'dark') {
        return {
          mode: 'dark'
        };
      } else {
        return {
          mode: 'light'
        };
      }
    }
    throw Error('Unknown action.');
  }
  const [stateMode, dispatchMode] = useReducer(reducerMode, { mode: localStorage.getItem('theme') });
  const [init, setInit] = useState<boolean>(false)
  const [userObj, setUserObj] = useState<{uid: string, displayName: string} | null>(null)
  const [mode, setMode] = useState<string | null>(localStorage.getItem('theme'))
  const [bottomNavigation, setBottomNavigation] = useState<number>(1);
  // const bottomNavigation = bottomNavigationStore((state) => state.bottomNavigation)
  // const setBottomNavigation = bottomNavigationStore((state) => state.setBottomNavigation)
  const modes = modeStore((state) => state.mode)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user)
      } else {
        setUserObj(null)
      }
      setBottomNavigation(1)
      setInit(true)
      console.log(user)
      // dispatchInitial({ type: 'toggle' })
    })
  }, [])

  // const handleUserObj = (newState: {uid: string, displayName: string}) => setUserObj(newState)
  const handleMode = (newState: string) => setMode(newState)
  const handleBottomNavigation = (newState: number) => setBottomNavigation(newState)
  const handleModes = () => {
    dispatchMode({ type: 'toggle' })
  }
  return (
    <>
      <ThemeProvider theme={
        modes !== 'dark' ? lightTheme : darkTheme 
      }>
        {init ? <Router userObj={userObj} stateMode={stateMode} handleModes={handleModes} setMode={handleMode} bottomNavigation={bottomNavigation} setBottomNavigation={handleBottomNavigation} /> : <Lotties/>}
      </ThemeProvider>
    </>
  )
}

export default App