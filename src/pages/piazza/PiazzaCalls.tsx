// import { useKeyboardOffset } from 'virtual-keyboard-offset';
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import useLargeMedia from 'src/hooks/useLargeMedia'
import { webSocket } from 'src/webSocket'

let myStream
let myPeerConnection
function PiazzaCalls() {
  const [options, setOptions] = useState([])
  const [audioOn, setAudioOn] = useState(true)
  const [videoOn, setVideoOn] = useState(true)
  const [error, setError] = useState('')
  // const [source, setSource] = useState(null)
  // const [sources, setSources] = useState(null)
  const [selected, setSelected] = useState(null)
  const largeMedia = useLargeMedia()
  const myScreen = document.getElementById('myScreen')
  const deviceSelect = document.getElementById('devices')
  const initialConstraints = {
    audio: true,
    video: true,
  }
  const roomName = location.search.slice(4)
  console.log(location.search.slice(4))
  async function handleMuteClick() {
    const promise = myStream
    if (promise) {
      promise
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled))
    }
    setAudioOn(!audioOn)
  }
  async function handleStreamClick() {
    const promise = myStream
    if (promise) {
      promise
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled))
    }
    setVideoOn(!videoOn)
  }
  async function handleDeviceChange(event) {
    console.log(deviceSelect.value)
    const promise = myStream
    promise.getTracks()
      .forEach(track => track.stop());
    // setSource(deviceSelect.value)
    // await getMedia(deviceSelect.value)
    setSelected(event.target.value)
    // console.log(event.target.value)
    if (myPeerConnection) {
      console.log(myPeerConnection.getSenders())
      const videoTrack = myStream.getVideoTracks()[0]
      const videoSender = myPeerConnection.getSenders().find((sender) => sender.track.kind === 'video')
      videoSender.replaceTrack(videoTrack)
    }
  }
  useEffect(() => {
    if (myStream) {
      myStream.getTracks()
        .forEach(track => track.stop());
      setTimeout(() => getMedia(selected), 1000)
    } else {
      getMedia(selected)
    }
    if (noDevice) {
      setTimeout(() => getMedia(selected), 1000)
    }
  }, [deviceSelect, selected])
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
      if (myStream) {
        myStream.getTracks()
          .forEach(track => track.stop());
      }
      myStream = await navigator.mediaDevices.getUserMedia(constraints)
      const promises = await navigator.mediaDevices.enumerateDevices()
      // promise.getVideoTracks().forEach(track => track.enabled = !track.enabled)
      // promise.getAudioTracks().forEach(track => track.enabled = !track.enabled)
      myScreen.srcObject = myStream
      await getDevices()
      setError('')
      console.log(myStream.getVideoTracks()[0].label)
      // const myPeerConnection = new RTCPeerConnection();
      // myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream))
      // const offer = await myPeerConnection.createOffer()
      // console.log(offer)
      // console.log(myStream.getTracks())
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }
  function handleIce(data) {
    console.log('icecandidate')
    console.log(data)
    webSocket.emit('ice', data.candidate, roomName)
  }
  function handleAddStream(data) {
    console.log('got a stream from peer')
    console.log('Peer Stream', data.stream)
    console.log('My Stream', myStream)
    const yourScreen = document.getElementById('yourScreen')
    yourScreen.srcObject = data.stream
  }
  function makeConnection() {
    const iceServers = [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun.l.google.com:5349" },
      { urls: "stun:stun1.l.google.com:3478" },
      { urls: "stun:stun1.l.google.com:5349" },
      { urls: "stun:stun2.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:5349" },
      { urls: "stun:stun3.l.google.com:3478" },
      { urls: "stun:stun3.l.google.com:5349" },
      { urls: "stun:stun4.l.google.com:19302" },
      { urls: "stun:stun4.l.google.com:5349" }
    ];

    myPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: iceServers.map((value) => {
            return (
              value.urls
            )
          })
        }
      ]
    });
    myPeerConnection.addEventListener('icecandidate', handleIce)
    myPeerConnection.addEventListener('addstream', handleAddStream)
    if (myStream) {
      myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream))
    }
    // const offer = await myPeerConnection.createOffer()
    // console.log(offer)
  }
  async function initCall() {
    await getMedia(null)
    makeConnection()
  }
  async function handleWelcome() {
    await initCall()
    webSocket.emit('joinRoom', roomName, initCall)
  }
  useEffect(() => {
    handleWelcome()
  }, [])
  const welcome = async () => {
    console.log('sent the offer')
    console.log(myPeerConnection)
    const offer = await myPeerConnection.createOffer()
    myPeerConnection.setLocalDescription(offer)
    console.log(offer)
    webSocket.emit('offer', offer, roomName)
  }
  useEffect(() => {
    if (!webSocket) return
    webSocket.on('welcome', welcome)
    return () => {
      webSocket.off('welcome', welcome)
    }
  })
  const offer = async (offer) => {
    console.log('received the offer')
    myPeerConnection.setRemoteDescription(offer)
    const answer = await myPeerConnection.createAnswer()
    console.log('sent the answer')
    myPeerConnection.setLocalDescription(answer)
    webSocket.emit('answer', answer, roomName)
  }
  useEffect(() => {
    if (!webSocket) return
    webSocket.on('offer', offer)
    return () => {
      webSocket.off('offer', offer)
    }
  })
  const answer = (answer) => {
    console.log('received the answer')
    myPeerConnection.setRemoteDescription(answer)
  }
  useEffect(() => {
    if (!webSocket) return
    webSocket.on('answer', answer)
    return () => {
      webSocket.off('answer', answer)
    }
  })
  const ice = (ice) => {
    console.log('received candidate')
    myPeerConnection.addIceCandidate(ice)
  }
  useEffect(() => {
    if (!webSocket) return
    webSocket.on('ice', ice)
    return () => {
      webSocket.off('ice', ice)
    }
  })

  return (
    <div id="myStream">
      <div className={`flex ${!largeMedia && 'flex-col'} gap-1`}>
        <video
          id="myScreen"
          width="320"
          height="240"
          controls
          autoPlay
          muted
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
              <option key={index} value={value.deviceId} selected={myStream?.getVideoTracks()[0].id === value.deviceId}>
                {value.label}
              </option>
            )
          })}
        </select>
      </div>
      {error && <div>{error.toString()}</div>}
    </div >
  )
}

export default PiazzaCalls
