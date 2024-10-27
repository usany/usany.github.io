import { useEffect, useState, useContext } from 'react'
import Router from 'src/Router'
import Lotties from 'src/lottiesAnimation/Lotties'
import { auth } from 'src/baseApi/serverbase'
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
  const [init, setInit] = useState<boolean>(false)
  const [userObj, setUserObj] = useState<{uid: string} | null>(null)
  const [mode, setMode] = useState<string | null>(localStorage.getItem('theme'))
  const [bottomNavigation, setBottomNavigation] = useState<number>(1);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user)
      } else {
        setUserObj(null)
      }
      setBottomNavigation(1)
      setInit(true)
    })
  }, [])

  const handleUserObj = (newState: {uid: string}) => setUserObj(newState)
  const handleMode = (newState: string) => setMode(newState)
  const handleBottomNavigation = (newState: number) => setBottomNavigation(newState)
  
  return (
    <>
      <ThemeProvider theme={
        mode !== 'dark' ? lightTheme : darkTheme 
      }>
        {init ? <Router userObj={userObj} setUserObj={handleUserObj} setMode={handleMode} bottomNavigation={bottomNavigation} setBottomNavigation={handleBottomNavigation} /> : <Lotties/>}
      </ThemeProvider>
    </>
  )
}

export default App