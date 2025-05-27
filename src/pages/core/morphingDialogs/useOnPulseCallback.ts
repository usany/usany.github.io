import { useEffect } from 'react'
import { webSocket } from 'src/webSocket'

export const useOnPulseCallback = ({
  userObj,
  round,
  changeOnPulse,
  message,
}) => {
  useEffect(() => {
    if (!webSocket) return
    function sOnPulseCallback(res) {
      if (res.choose === 1) {
        if (res.creatorId === userObj.uid) {
          if (round === 1 || round === 2) {
            changeOnPulse(true)
          } else {
            changeOnPulse(false)
          }
        } else if (res.connectedId === userObj.uid) {
          if (round === 4) {
            changeOnPulse(true)
          } else {
            changeOnPulse(false)
          }
        }
      } else {
        if (res.creatorId === userObj.uid) {
          if (round === 2 || round === 4) {
            changeOnPulse(true)
          } else {
            changeOnPulse(false)
          }
        } else if (res.connectedId === userObj.uid) {
          if (round === 3) {
            changeOnPulse(true)
          } else {
            changeOnPulse(false)
          }
        }
      }
    }
    webSocket.on(`sOnPulse${message.id}`, sOnPulseCallback)
    return () => {
      webSocket.off(`sOnPulse${message.id}`, sOnPulseCallback)
    }
  })
}
