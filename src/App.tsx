import { ThemeProvider } from '@mui/material/styles'
import { doc, updateDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import 'src/global.css'
import Lotties from 'src/lottiesAnimation/Lotties'
import Router from 'src/pages/core/router/Router'
import { dbservice } from './baseApi/serverbase'
import { Toaster } from './components/ui/toaster'
import useColors from './hooks/useColors'
import { useSelectors } from './hooks/useSelectors'
import { changeEn } from './stateSlices/languagesSlice'
import { changeDark } from './stateSlices/themeSlice'
import useUserObject from './useUserObject'
import { useGetCurrentUserQuery } from './stateSlices/baseQuery'

// const usePreference = () => {
//   const profile = useSelectors((state) => state.profile.value)
//   const uid = profile?.uid
//   const dispatch = useDispatch()
// }

function App() {
  // const [count, setCount] = useState(0)
  const theme = useSelectors((state) => state.theme.value)
  const profile = useSelectors((state) => state.profile.value)
  useUserObject()
  const { lightTheme, darkTheme } = useColors()
  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <Toaster />
        {profile !== undefined ? <Router /> : <Lotties />}
      </ThemeProvider>
    </>
  )
}

export default App
