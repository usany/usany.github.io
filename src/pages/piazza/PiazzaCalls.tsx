// import { useKeyboardOffset } from 'virtual-keyboard-offset';

function PiazzaCalls() {
// const myFace = document.getElementById('myFace')
    // const muteButton = document.getElementById('mute')
    // const streamButton = document.getElementById('stream')
    // const videoSelect = document.getElementById('videoInput')
    // let promise
    // let muted = false
    // let streamOff = false
    // function handleMuteClick() {
    //   if (!muted) {
    //     muteButton.innerText = 'unmute'
    //     muted = true
    //     console.log(muteButton)
    //   } else {
    //     muteButton.innerText = 'mute'
    //     muted = false
    //   }
    // }
    // function handleStreamClick() {
    //   if (!streamOff) {
    //     streamButton.innerText = 'turn stream on'
    //     streamOff = true
    //   } else {
    //     streamButton.innerText = 'turn stream off'
    //     streamOff = false
    //   }
    // }
    // muteButton.addEventListener('click', () => console.log('practices'))
    // streamButton.addEventListener('click', handleStreamClick)
    // async function getMedia() {
    //   try {
    //     const constraints = {
    //       audio: true,
    //       video: true
    //     }
    //     promise = await navigator.mediaDevices.getUserMedia(constraints);
    //     const promises = await navigator.mediaDevices.enumerateDevices()
    //     promise.getAudioTracks().forEach(track => track.enabled = !track.enabled)

    // myFace.srcObject = promise
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // getMedia()
  return (
    <div id='myStream'>
      <video id='myFace' width="320" height="240" controls autoPlay>
      </video>
    </div >
  );
}

export default PiazzaCalls;
