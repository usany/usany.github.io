import { ThemeProvider } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import 'src/global.css'
import Lotties from 'src/lottiesAnimation/Lotties'
import Router from 'src/pages/core/router/Router'
import useColors from './hooks/useColors'
import { useSelectors } from './hooks/useSelectors'
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
