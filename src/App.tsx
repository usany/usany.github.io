import { ThemeProvider } from '@mui/material/styles'
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
  const muteButton = document.getElementById('mute')
  const streamButton = document.getElementById('stream')
  let muted = false
  let streamOff = false
  function handleMuteClick() {
    if (!muted) {
      muteButton.innerText = 'unmute'
      muted = true
      console.log(muteButton)
    } else {
      muteButton.innerText = 'mute'
      muted = false
    }
  }
  function handleStreamClick() {
    if (!streamOff) {
      streamButton.innerText = 'turn stream on'
      streamOff = true
    } else {
      streamButton.innerText = 'turn stream off'
      streamOff = false
    }
  }
  const myFace = document.getElementById('myFace')

  async function getMedia() {
    try {
      const constraints = {
        audio: true,
        video: true
      }
      const promise = await navigator.mediaDevices.getUserMedia(constraints);
      promise.getVideoTracks().forEach(track => track.enabled = !track.enabled)
      promise.getAudioTracks().forEach(track => track.enabled = !track.enabled)

      myFace.srcObject = promise
    } catch (error) {
      console.log(error)
    }
  }
  getMedia()
  return (
    <>
      <button id='mute' onClick={handleMuteClick}>mute</button>
      &emsp;
      <button id='stream' onClick={handleStreamClick}>turn stream off</button>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {userObj !== undefined ? <Router userObj={userObj} /> : <Lotties />}
      </ThemeProvider>
    </>
  )
}

export default App
