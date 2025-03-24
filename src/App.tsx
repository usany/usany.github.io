import { ThemeProvider, createTheme } from '@mui/material/styles'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import static01 from "src/assets/blue01.png"
import static02 from "src/assets/blue02.png"
import static03 from "src/assets/blue03.png"
import { auth } from 'src/baseApi/serverbase'
import 'src/global.css'
import Lotties from 'src/lottiesAnimation/Lotties'
import Router from 'src/pages/core/Router'
import ThemeRootState from './interfaces/ThemeRootState copy'
import { changeDefaultProfile } from './stateSlices/defaultProfile'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

// interface themeRootState  {
//   theme: string
// }
function App() {
  // const [count, setCount] = useState(0)
  const [userObj, setUserObj] = useState<User | null | undefined>(undefined)
  const theme = useSelector((state: ThemeRootState) => state.theme)
  const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserObj(user)
    })
    // dispatch(changeBottomNavigation(1))
  }, [])

  const profileImageArray = [static01, static02, static03, static01, static02, static03]
  useEffect(() => {
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const letters = alpha.map((x) => String.fromCharCode(x));
    if (userObj) {
      const designatedProfile = profileImageArray[letters.indexOf(String(userObj?.uid[0]).toUpperCase()) % 6];
      dispatch(changeDefaultProfile(designatedProfile))
    }
  }, [userObj])
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
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {userObj !== undefined ? <Router userObj={userObj} /> : <Lotties />}
      </ThemeProvider>
    </>
  )
}

export default App
