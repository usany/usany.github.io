import Lotties from 'src/lottiesAnimation/Lotties'
import { ThemeProvider } from '@mui/material/styles'
import Router from 'src/pages/core/router/Router'
import { useNetwork, useSelectors, useUserObject, useColors } from './hooks'
import 'src/global.css'

function App() {
  // const [count, setCount] = useState(0)
  const theme = useSelectors((state) => state.theme.value)
  const profile = useSelectors((state) => state.profile.value)
  const { lightTheme, darkTheme } = useColors()
  useUserObject()
  useNetwork()
  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {profile !== undefined ? <Router /> : <Lotties />}
      </ThemeProvider>
    </>
  )
}

export default App
