// import { useKeyboardOffset } from 'virtual-keyboard-offset';

import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import useLargeMedia from "src/hooks/useLargeMedia";

function PiazzaCalls() {
  const [options, setOptions] = useState([])
  const largeMedia = useLargeMedia()
  const myFace = document.getElementById('myFace')
  const muteButton = document.getElementById('mute')
  const streamButton = document.getElementById('stream')
  const videoSelect = document.getElementById('videoInput')
  const constraints = {
    audio: true,
    video: true
  }
  let promise
  let muted = false
  let streamOff = false
  async function handleMuteClick() {
    promise = await navigator.mediaDevices.getUserMedia(constraints);

    promise.getAudioTracks().forEach(track => track.enabled = !track.enabled)

    if (!muted) {
      muteButton.innerText = 'unmute'
      muted = true
    } else {
      muteButton.innerText = 'mute'
      muted = false
    }
  }
  async function handleStreamClick() {
    promise = await navigator.mediaDevices.getUserMedia(constraints);

    promise.getVideoTracks().forEach(track => track.enabled = !track.enabled)

    if (!streamOff) {
      streamButton.innerText = 'turn stream on'
      streamOff = true
    } else {
      streamButton.innerText = 'turn stream off'
      streamOff = false
    }
  }
  // muteButton.addEventListener('click', () => console.log('practices'))
  // streamButton.addEventListener('click', handleStreamClick)
  useEffect(() => {
    async function getMedia() {
      try {
        const constraints = {
          audio: true,
          video: true
        }
        promise = await navigator.mediaDevices.getUserMedia(constraints);
        const promises = await navigator.mediaDevices.enumerateDevices()
        // promise.getVideoTracks().forEach(track => track.enabled = !track.enabled)
        // promise.getAudioTracks().forEach(track => track.enabled = !track.enabled)
        getDevices()
        // myFace.srcObject = promise
      } catch (error) {
        console.log(error)
      }
    }
    async function getDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter((device) => device.kind === 'videoinput')
        setOptions(videoDevices)
        // videoDevices.forEach((device) => {
        //   const option = document.createElement('option')
        //   option.value = device.deviceId
        //   option.innerText = device.label
        //   videoSelect?.appendChild(option)
        // })
        console.log(videoDevices)
      } catch (error) {
        console.log(error)
      }
    }
    getMedia()
  }, [videoSelect])
  return (
    <div id='myStream'>
      <div className={`flex ${!largeMedia && 'flex-col'} gap-1`}>
        <video id='myFace' width="320" height="240" controls autoPlay>
        </video>
        <video id='myFace' width="320" height="240" controls autoPlay>
        </video>
      </div>
      <div className="flex gap-5">
        <Button onClick={handleMuteClick}>mute</Button>
        <Button onClick={handleStreamClick}>turn stream off</Button>
        {/* <button id='mute' onClick={handleMuteClick}>mute</button>
        <button id='stream' onClick={handleStreamClick}>turn stream off</button> */}
      </div>
      <select>
        {options.map((value, index) => {
          return (
            <option key={index} value={value.deviceId}>{value.label}</option>
          )
        })}
      </select>
    </div>
  );
}

export default PiazzaCalls;
