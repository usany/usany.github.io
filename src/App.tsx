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
  const videoSelect = document.getElementById('videoInput')
  let muted = false
  let streamOff = false
  function handleMuteClick() {
    promise.getAudioTracks().forEach(track => track.enabled = !track.enabled)
    console.log(promise.getAudioTracks())
    if (!muted) {
      muteButton.innerText = 'unmute'
      muted = true
    } else {
      muteButton.innerText = 'mute'
      muted = false
    }
  }
  function handleStreamClick() {
    promise.getVideoTracks().forEach(track => track.enabled = !track.enabled)
    console.log(promise.getVideoTracks())
    if (!streamOff) {
      streamButton.innerText = 'turn stream on'
      streamOff = true
    } else {
      streamButton.innerText = 'turn stream off'
      streamOff = false
    }
  }
  const myFace = document.getElementById('myFace')
  let promise
  async function getMedia() {
    try {
      const constraints = {
        video: true,
        audio: true,
      }
      promise = await navigator.mediaDevices.getUserMedia(constraints);
      promise.getVideoTracks().forEach(track => track.enabled = !track.enabled)
      promise.getAudioTracks().forEach(track => track.enabled = !track.enabled)
      // myFace.srcObject = promise
      getDevices()
    } catch (error) {
      console.log(error)
    }
  }
  getMedia()
  async function getDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter((device) => device.kind === 'videoinput')
      videoDevices.forEach((device) => {
        const option = document.createElement('option')
        option.value = device.deviceId
        option.innerText = device.label
        videoSelect?.appendChild(option)
      })
      console.log(videoDevices)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <button id='mute' onClick={handleMuteClick}>mute</button>
      &emsp;
      <button id='stream' onClick={handleStreamClick}>turn stream off</button>
      &emsp;
      <select id='videoInput' />
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {userObj !== undefined ? <Router userObj={userObj} /> : <Lotties />}
      </ThemeProvider>
    </>
  )
}

export default App
