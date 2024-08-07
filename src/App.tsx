import { useEffect, useState } from 'react'
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
  const [init, setInit] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userObj, setUserObj] = useState(null)
  const [newAccount, setNewAccount] = useState<object>({account: false, round: 0})
  const [mode, setMode] = useState(localStorage.getItem('theme'))

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
        setUserObj(null)
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      <ThemeProvider theme={
        mode !== 'dark' ? lightTheme : darkTheme 
      }>
        {init ? <Router isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} newAccount={newAccount} setNewAccount={setNewAccount} setMode={setMode}/> : <Lotties/>}
      </ThemeProvider>
    </>
  )
}

export default App