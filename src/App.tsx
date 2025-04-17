import { ThemeProvider } from '@mui/material/styles'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { auth } from 'src/baseApi/serverbase'
import 'src/global.css'
import Lotties from 'src/lottiesAnimation/Lotties'
import Router from 'src/pages/core/Router'
import useColors from './hooks/useColors'
import ThemeRootState from './interfaces/ThemeRootState copy'

// const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//   },
//   components: {
//     MuiButton: {
//       defaultProps: {
//         // Name of the slot
//         sx: {
//           // Some CSS
//           bgcolor: 'blue',
//           ":hover": {
//             bgcolor: 'blue'
//           }
//         },
//       },
//     }
//   }
// })
// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// })

// interface themeRootState  {
//   theme: string
// }
function App() {
  // const [count, setCount] = useState(0)
  const [userObj, setUserObj] = useState<User | null | undefined>(undefined)
  const theme = useSelector((state: ThemeRootState) => state.theme)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserObj(user)
    })
  }, [])
  const { lightTheme, darkTheme } = useColors()
  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {userObj !== undefined ? <Router userObj={userObj} /> : <Lotties />}
      </ThemeProvider>
    </>
  )
}

export default App
