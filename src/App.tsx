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

const usePreference = () => {
  const profile = useSelectors((state) => state.profile.value)
  const uid = profile?.uid
  const dispatch = useDispatch()
  useEffect(() => {
    // const mq = window.matchMedia('(prefers-color-scheme: dark)')
    // if (!localStorage.getItem('theme')) {
    //   if (mq.matches) {
    //     localStorage.setItem('theme', 'dark')
    //     dispatch(changeDark())
    //   }
    // }
    const settingLanguage = async () => {
      const ref = doc(dbservice, `members/${uid}`)
      await updateDoc(ref, { preferLanguage: 'en' })
    }
    if (!localStorage.getItem('languages')) {
      if (navigator.language.slice(0, 2) !== 'ko') {
        localStorage.setItem('languages', 'en')
        dispatch(changeEn())
        if (profile) {
          settingLanguage()
        }
      }
    }
  }, [uid])
}
if (typeof window !== 'undefined') { // Check if we're running in the browser.
   // ✅ Only runs once per app load
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  if (!localStorage.getItem('theme')) {
    if (mq.matches) {
      // localStorage.setItem('theme', 'dark')
      // dispatch(changeDark())
    }
  }
  // loadDataFromLocalStorage();
}

function App() {
  // const [count, setCount] = useState(0)
  const theme = useSelectors((state) => state.theme.value)
  const profile = useSelectors((state) => state.profile.value)
  useUserObject()
  const { lightTheme, darkTheme } = useColors()
  usePreference()
  console.log(profile)
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
