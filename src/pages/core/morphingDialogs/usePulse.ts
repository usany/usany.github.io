import { useEffect, useState } from 'react'

export const usePulse = ({ message, round, userObj }) => {
  const [onPulse, setOnPulse] = useState(false)
  const changeOnPulse = (newValue) => setOnPulse(newValue)
  useEffect(() => {
    if (message.text.choose === 1) {
      if (message.creatorId === userObj?.uid) {
        if (round === 2 || round === 3) {
          changeOnPulse(true)
        } else {
          changeOnPulse(false)
        }
      } else if (message.connectedId === userObj?.uid) {
        if (round === 4) {
          changeOnPulse(true)
        } else {
          changeOnPulse(false)
        }
      }
    } else {
      if (message.creatorId === userObj.uid) {
        if (round === 2 || round === 4) {
          changeOnPulse(true)
        } else {
          changeOnPulse(false)
        }
      } else if (message.connectedId === userObj.uid) {
        if (round === 3) {
          changeOnPulse(true)
        } else {
          changeOnPulse(false)
        }
      }
    }
  }, [round])
  return { onPulse: onPulse, changeOnPulse: changeOnPulse }
}
