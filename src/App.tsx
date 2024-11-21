import { useEffect, useState, useContext, useReducer } from 'react'
import Router from 'src/Router'
import Lotties from 'src/lottiesAnimation/Lotties'
import { auth } from 'src/baseApi/serverbase'
import { useUserObjStore, useBottomNavigationStore, useThemeStore } from 'src/store'
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
// interface User {
//   profileColor: string,
//   setProfileColor: (newState: string) => void,
//   userObj: {uid: string, displayName: string},
//   setBottomNavigation: (newState: number) => void
// }

function App() {
  // const [count, setCount] = useState(0)
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  // const reducerMode = (state, action) => {
  //   if (action.type === 'toggle') {
  //     if (state.mode !== 'dark') {
  //       return {
  //         mode: 'dark'
  //       };
  //     } else {
  //       return {
  //         mode: 'light'
  //       };
  //     }
  //   }
  //   throw Error('Unknown action.');
  // }
  // const [stateMode, dispatchMode] = useReducer(reducerMode, { mode: localStorage.getItem('theme') });
  // const [init, setInit] = useState<boolean>(false)
  // const userReducer = (state, action) => {
  //   if (action.type === 'user') {
  //     return {
  //       user: action.user
  //     }
  //   }
  // }
  // const [userState, userDispatch] = useReducer(userReducer, { user: null })
  const [userObj, setUserObj] = useState<{uid: string, displayName: string} | null>(null)
  const initialReducer = (state: {initial: boolean} | null, action: {type: string}) => {
    if (action.type === 'initial') {
      return {
        initial: true
      }
    }
  }
  const [initialState, initialDispatch] = useReducer(initialReducer, { initial: false })
  const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)
  const theme = useThemeStore((state) => state.theme)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserObj(user)
      handleBottomNavigation(1)
      initialDispatch({ type: 'initial' })
    })
  }, [])
  
  return (
    <>
      <ThemeProvider theme={
        theme === 'light' ? lightTheme : darkTheme 
      }>
        {initialState?.initial ? <Router userObj={userObj} /> : <Lotties/>}
      </ThemeProvider>
    </>
  )
}

export default App