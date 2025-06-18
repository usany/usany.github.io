// import { useKeyboardOffset } from 'virtual-keyboard-offset';

import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import useLargeMedia from "src/hooks/useLargeMedia";

function PiazzaCalls() {
  const [options, setOptions] = useState([])
  const [audioOn, setAudioOn] = useState(true)
  const [videoOn, setVideoOn] = useState(true)
  const largeMedia = useLargeMedia()
  const myScreen = document.getElementById('myScreen')
  const videoSelect = document.getElementById('videoInput')
  const constraints = {
    audio: true,
    video: true
  }
  let promise
  async function handleMuteClick() {
    promise = await navigator.mediaDevices.getUserMedia(constraints);
    promise.getAudioTracks().forEach(track => track.enabled = !track.enabled)
    setAudioOn(!audioOn)
  }
  async function handleStreamClick() {
    promise = await navigator.mediaDevices.getUserMedia(constraints);
    promise.getVideoTracks().forEach(track => track.enabled = !track.enabled)
    setVideoOn(!videoOn)
  }
  useEffect(() => {
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
        // myFace.srcObject = promise
        await getDevices()
      } catch (error) {
        console.log(error)
      }
    }
    getMedia()
  }, [videoSelect])
  return (
    <div id='myStream'>
      <div className={`flex ${!largeMedia && 'flex-col'} gap-1`}>
        <video id='myScreen' width="320" height="240" controls autoPlay>
        </video>
        <video id='yourScreen' width="320" height="240" controls autoPlay>
        </video>
      </div>
      <div className="flex gap-5">
        <Button onClick={handleMuteClick}>{audioOn ? 'unmute' : 'mute'}</Button>
        <Button onClick={handleStreamClick}>{videoOn ? 'turn stream on' : 'turn stream off'}</Button>
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
