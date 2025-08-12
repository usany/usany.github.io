import { ThemeProvider } from '@mui/material/styles'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import 'src/global.css'
import Lotties from 'src/lottiesAnimation/Lotties'
import Router from 'src/pages/core/router/Router'
import { dbservice } from './baseApi/serverbase'
import { Toaster } from './components/ui/toaster'
import useColors from './hooks/useColors'
import { useSelectors } from './hooks/useSelectors'
import { changeDefaultProfile } from './stateSlices/defaultProfileSlice'
import { changeEn } from './stateSlices/languagesSlice'
import { changeProfileImage } from './stateSlices/profileImageSlice'
import { changeProfileImageUrl } from './stateSlices/profileImageUrlSlice'
import { changeDark } from './stateSlices/themeSlice'
import { changeUserCertificated } from './stateSlices/userCertificatedSlice'
import useUserObject from './useUserObject'

function App() {
  // const [count, setCount] = useState(0)
  // const [userObj, setUserObj] = useState<User | null | undefined>(undefined)
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     setUserObj(user)
  //   })
  // }, [])
  const theme = useSelectors((state) => state.theme.value)
  const userObj = useUserObject()
  const { lightTheme, darkTheme } = useColors()
  const dispatch = useDispatch()
  useEffect(() => {
    if (userObj) {
      const initialProfile = async () => {
        const docRef = doc(dbservice, `members/${userObj.uid}`)
        const docSnap = await getDoc(docRef)
        const userData = docSnap.data()
        console.log(userData)
        dispatch(changeProfileImage(userData?.profileImage))
        dispatch(changeDefaultProfile(userData?.defaultProfile))
        dispatch(changeProfileImageUrl(userData?.profileImageUrl))
        dispatch(changeUserCertificated(userData?.certificated))
      }
      initialProfile()
    }
  }, [userObj])
  useEffect(() => {
    const mq = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    if (!localStorage.getItem('theme')) {
      if (mq.matches) {
        localStorage.setItem('theme', 'dark')
        dispatch(changeDark())
      }
    }
    const settingLanguage = async () => {
      const ref = doc(dbservice, `members/${userObj?.uid}`)
      await updateDoc(ref, { preferLanguage: 'en' });
    }
    if (!localStorage.getItem('languages')) {
      if (navigator.language.slice(0, 2) !== 'ko') {
        localStorage.setItem('languages', 'en')
        dispatch(changeEn())
        if (userObj) {
          settingLanguage()
        }
      }
    }
    // This callback will fire if the perferred color scheme changes without a reload
    // mq.addEventListener("change", (evt) => setIsDark(evt.matches));
  }, []);

  return (
    <>
      {/* <button id='mute' onClick={handleMuteClick}>mute</button>
      &emsp;
      <button id='stream' onClick={handleStreamClick}>turn stream off</button>
      &emsp;
      <select id='videoInput' /> */}
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <Toaster />
        {/* <MyComponent /> */}
        {userObj !== undefined ? <Router userObj={userObj} /> : <Lotties />}
      </ThemeProvider>
    </>
  )
}

export default App
