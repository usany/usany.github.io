// import { useKeyboardOffset } from 'virtual-keyboard-offset';
import { Button } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import useLargeMedia from 'src/hooks/useLargeMedia'
import { webSocket } from 'src/webSocket'

let myStream
let myPeerConnection
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
  const roomName = location.search.slice(4)
  console.log(location.search.slice(4))
  const myRef = useRef(null)
  const yourRef = useRef(null)
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
  async function handleDeviceChange() {
    console.log(deviceSelect.value)
    const promise = myStream
    promise.getTracks()
      .forEach(track => track.stop());
    setSource(deviceSelect.value)
    await getMedia(deviceSelect.value)
  }
  const handleStopClick = () => {
    const promise = myStream
    promise.getTracks()
      .forEach(track => track.stop())
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
      myStream = await navigator.mediaDevices.getUserMedia(constraints)
      const promises = await navigator.mediaDevices.enumerateDevices()
      // promise.getVideoTracks().forEach(track => track.enabled = !track.enabled)
      // promise.getAudioTracks().forEach(track => track.enabled = !track.enabled)
      myScreen.srcObject = myStream
      await getDevices()
      setNoDevice('')
      // const myPeerConnection = new RTCPeerConnection();
      // myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream))
      // const offer = await myPeerConnection.createOffer()
      // console.log(offer)
      // console.log(myStream.getTracks())
    } catch (error) {
      console.log(error)
      setNoDevice(error)
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

    myPeerConnection = new RTCPeerConnection(
      {
        iceServers: [
          {
            urls: iceServers.map((value) => {
              return (
                value.urls
              )
            })
          }
        ]
      }
    );
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
    // setMyPeerConnection(connection)
    console.log(offer)
    // if (offer) {
    // }
    webSocket.emit('offer', offer, roomName)
    // if (myPeerConnection) {
    // }
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
    <div
    // id="myStream"
    >
      <div className={`flex ${!largeMedia && 'flex-col'} gap-1`}>
        <video
          id="yourScreen"
          ref={yourRef}
          width="320"
          height="240"
          controls
          autoPlay
        ></video>
        <video
          id="myScreen"
          ref={myRef}
          width="320"
          height="240"
          controls
          autoPlay
          muted
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
          <Button onClick={handleStopClick}>
            stop
          </Button>
        </div>
        <select id="devices" onChange={handleDeviceChange}>
          {options.map((value, index) => {
            return (
              <option key={index} value={value.deviceId} selected={stream?.getVideoTracks()[0].id === value.deviceId}>
                {value.label}
              </option>
            )
          })}
        </select>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </div >
  )
}

export default PiazzaCalls
