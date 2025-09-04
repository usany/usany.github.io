import { ThemeProvider } from '@mui/material/styles'
import 'src/global.css'
import Lotties from 'src/lottiesAnimation/Lotties'
import Router from 'src/pages/core/router/Router'
import { Toaster } from './components/ui/toaster'
import useColors from './hooks/useColors'
import { useNetwork, useSelectors, useUserObject } from './hooks'

function App() {
  // const [count, setCount] = useState(0)
  const theme = useSelectors((state) => state.theme.value)
  const profile = useSelectors((state) => state.profile.value)
  useUserObject()
  useNetwork()
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
