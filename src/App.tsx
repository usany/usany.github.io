import { useEffect, useState, useContext, useReducer } from 'react'
import Router from 'src/Router'
import Lotties from 'src/lottiesAnimation/Lotties'
import { auth } from 'src/baseApi/serverbase'
// import { useBottomNavigationStore, useThemeStore } from 'src/store'
import 'src/global.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { User } from 'firebase/auth'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { useSelector, useDispatch } from 'react-redux'

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
  const [userObj, setUserObj] = useState<User | null>(null)
  const theme = useSelector(state => state.theme.value)
  const dispatch = useDispatch()

  // const initialReducer = (state: {initial: boolean} | null, action: {type: string}) => {
  //   if (action.type === 'initial') {
  //     return {
  //       initial: true
  //     }
  //   }
  // }
  // const [initialState, initialDispatch] = useReducer(initialReducer, { initial: false })
  const [initial, setInitial] = useState<boolean>(false)
  // const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)
  // const theme = useThemeStore((state) => state.theme)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserObj(user)
      dispatch(changeBottomNavigation(1))
      setInitial(true)
      // handleBottomNavigation(1)
      // initialDispatch({ type: 'initial' })
    })
  }, [])
  
  return (
    <>
      <ThemeProvider theme={
        theme === 'light' ? lightTheme : darkTheme 
      }>
        {initial ? <Router userObj={userObj} /> : <Lotties/>}
      </ThemeProvider>
    </>
  )
}

export default App