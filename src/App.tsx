import { ThemeProvider } from '@mui/material/styles'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import 'src/global.css'
import Lotties from 'src/lottiesAnimation/Lotties'
import Router from 'src/pages/core/router/Router'
import { dbservice } from './baseApi/serverbase'
import useColors from './hooks/useColors'
import { useSelectors } from './hooks/useSelectors'
import { changeDefaultProfile } from './stateSlices/defaultProfileSlice'
import { changeProfileImage } from './stateSlices/profileImageSlice'
import { changeProfileImageUrl } from './stateSlices/profileImageUrlSlice'
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
  const [userCertificated, setUserCertificated] = useState(false)

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
        setUserCertificated(userData?.certificated)
      }
      initialProfile()
    }
  }, [userObj])

  function MyComponent() {
    const { t, i18n } = useTranslation();
    return <h1 onClick={() => {
      if (i18n.language === 'ko') {
        i18n.changeLanguage('en');
      } else {
        i18n.changeLanguage('ko');
      }
    }}>{t('Welcome to React')}</h1>
  }

  return (
    <>
      {/* <button id='mute' onClick={handleMuteClick}>mute</button>
      &emsp;
      <button id='stream' onClick={handleStreamClick}>turn stream off</button>
      &emsp;
      <select id='videoInput' /> */}
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {/* <MyComponent /> */}
        {userObj !== undefined ? <Router userObj={userObj} /> : <Lotties />}
      </ThemeProvider>
    </>
  )
}

export default App
