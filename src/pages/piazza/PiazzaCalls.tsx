// import { useKeyboardOffset } from 'virtual-keyboard-offset';
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import useLargeMedia from 'src/hooks/useLargeMedia'

function PiazzaCalls() {
  const [options, setOptions] = useState([])
  const [audioOn, setAudioOn] = useState(true)
  const [videoOn, setVideoOn] = useState(true)
  const [noDevice, setNoDevice] = useState('')
  const [source, setSource] = useState(null)
  const [sources, setSources] = useState(null)
  const largeMedia = useLargeMedia()
  const myScreen = document.getElementById('myScreen')
  const deviceSelect = document.getElementById('devices')
  const initialConstraints = {
    audio: true,
    video: true,
  }
  async function handleMuteClick() {
    const promise = sources
    if (promise) {
      promise
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled))
    }
    setAudioOn(!audioOn)
  }
  async function handleStreamClick() {
    const promise = sources
    if (promise) {
      promise
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled))
    }
    setVideoOn(!videoOn)
  }
  async function handleDeviceChange() {
    console.log(deviceSelect.value)
    const promise = sources
    promise.getTracks()
      .forEach(track => track.stop());
    setSource(deviceSelect.value)
    await getMedia(deviceSelect.value)
  }
  useEffect(() => {
    getMedia(source)
  }, [deviceSelect])
  async function getDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      )
      setOptions(videoDevices)
      // videoDevices.forEach((device) => {
      //   const option = document.createElement('option')
      //   option.value = device.deviceId
      //   option.innerText = device.label
      //   videoSelect?.appendChild(option)
      // })
    } catch (error) {
      console.log(error)
    }
  }
  async function getMedia(deviceId) {
    try {
      const newConstraints = {
        audio: true,
        video: { deviceId: { exact: deviceId } }
      }
      const constraints = deviceId ? newConstraints : initialConstraints
      const promise = await navigator.mediaDevices.getUserMedia(constraints)
      const promises = await navigator.mediaDevices.enumerateDevices()
      setSources(promise)
      // promise.getVideoTracks().forEach(track => track.enabled = !track.enabled)
      // promise.getAudioTracks().forEach(track => track.enabled = !track.enabled)
      // myScreen.srcObject = promise
      await getDevices()
      setNoDevice('')
      const connection = new RTCPeerConnection();

    } catch (error) {
      console.log(error)
      setNoDevice(error)
    }
  }
  return (
    <div id="myStream">
      <div className={`flex ${!largeMedia && 'flex-col'} gap-1`}>
        <video
          id="myScreen"
          width="320"
          height="240"
          controls
          autoPlay
        >
          {/* <source src={sources} /> */}
        </video>
        <video
          id="yourScreen"
          width="320"
          height="240"
          controls
          autoPlay
        ></video>
      </div>
      <div>
        <div className="flex gap-5">
          <Button onClick={handleMuteClick}>
            {audioOn ? 'unmute' : 'mute'}
          </Button>
          <Button onClick={handleStreamClick}>
            {videoOn ? 'turn stream on' : 'turn stream off'}
          </Button>
          {/* <button id='mute' onClick={handleMuteClick}>mute</button>
        <button id='stream' onClick={handleStreamClick}>turn stream off</button> */}
        </div>
        <select id="devices" onChange={handleDeviceChange}>
          {options.map((value, index) => {
            return (
              <option key={index} value={value.deviceId}>
                {value.label}
              </option>
            )
          })}
        </select>
      </div>
      {noDevice && <div>{noDevice.toString()}</div>}
    </div >
  )
}

export default PiazzaCalls
