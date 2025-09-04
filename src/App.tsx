import { ThemeProvider } from '@mui/material/styles'
import 'src/global.css'
import Lotties from 'src/lottiesAnimation/Lotties'
import Router from 'src/pages/core/router/Router'
import useColors from './hooks/useColors'
import { useNetwork, useSelectors, useUserObject } from './hooks'

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
