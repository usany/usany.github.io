import { ThemeProvider } from '@mui/material/styles'
import 'src/global.css'
import Lotties from 'src/lottiesAnimation/Lotties'
import Router from 'src/pages/core/router/Router'
import { Toaster } from './components/ui/toaster'
import useColors from './hooks/useColors'
import { useSelectors } from './hooks/useSelectors'
import useUserObject from './useUserObject'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { changeOnLine } from './stateSlices/onLineSlice'

const useNetwork = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    window.addEventListener('online', () => {
      dispatch(changeOnLine(true))
    })
    window.addEventListener('offline', () => {
      dispatch(changeOnLine(false))
    })
    return (() => {
      window.removeEventListener('online', () => {
        dispatch(changeOnLine(true))
      })
      window.removeEventListener('offline', () => {
        dispatch(changeOnLine(false))
      })
    })
  }, [])
}

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
