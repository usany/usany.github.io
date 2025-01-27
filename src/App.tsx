import { useEffect, useState, useContext, useReducer } from 'react'
import Router from 'src/Router'
import Lotties from 'src/lottiesAnimation/Lotties'
import { auth } from 'src/baseApi/serverbase'
import 'src/global.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { User } from 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux'
import ThemeRootState from './interfaces/ThemeRootState copy'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { useQuery } from '@tanstack/react-query'

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
// interface themeRootState  {
//   theme: string
// }
function App() {
  // const [count, setCount] = useState(0)
  // const [initial, setInitial] = useState(false)
  const [userObj, setUserObj] = useState<User | null | undefined>(undefined)
  const theme = useSelector((state: ThemeRootState) => state.theme)
  // const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserObj(user)
    })
    // dispatch(changeBottomNavigation(1))
  }, [])

  // const onAuthQuery = () => {
  //   const onAuth = {userObj: undefined}
  //   auth.onAuthStateChanged((user) => {
  //     onAuth.userObj = user
  //     // setUserObj(user)
  //     // setInitial(true)
  //     setUserObj(user)
  //   })
  //   dispatch(changeBottomNavigation(1))
  //   return onAuth
  // }
  // const {status, data, error} = useQuery({queryKey: ['onAuth'], queryFn: onAuthQuery, suspense: true})
  // console.log(data)
  // if (userObj === undefined) {
  //   return <Lotties />
  // }
  // if (status === 'error') {
  //   return <Lotties />
  // }
  // const piazza = async () => {
  //   const piazzaRef = collection(dbservice, 'chats_group')
  //   const piazzaCollection = query(piazzaRef, orderBy('messageClockNumber', 'desc'), limit(1))
  //   const piazzaMessages = await getDocs(piazzaCollection)
  //   return piazzaMessages
  // }
  // const piazzaSwitch = useSelector<boolean>(state => state.piazzaSwitch.value)

  // const messages = useQuery({queryKey: ['messages'], queryFn: piazza, suspense: true})
  
  return (
    <>
      <ThemeProvider theme={
        theme === 'light' ? lightTheme : darkTheme 
      }>
        {userObj !== undefined ? <Router userObj={userObj} /> : <Lotties />}
      </ThemeProvider>
    </>
  )
}

export default App