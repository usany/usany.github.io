import { Button, Chip, ClickAwayListener, Tooltip } from '@mui/material'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks'
import { useTexts } from 'src/hooks'
import ProfileLocationsChip from './ProfileLocationsChip'
import { useDispatch } from 'react-redux'
import { changeProfile } from 'src/stateSlices/profileSlice'

const area = {
  westSouth: { lat: 37.5927551, lng: 127.047462 },
  westNorth: { lat: 37.6010743, lng: 127.047462 },
  eastSouth: { lat: 37.5927551, lng: 127.0571999 },
  eastNorth: { lat: 37.6010743, lng: 127.0571999 },
}
const ProfileLocations = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 })
  const {
    locationConfirmed,
    locationUnconfirmed,
    campusLocationConfirmation,
    failedLocationConfirmation
  } = useTexts()
  const {state} = useLocation()
  const profile = useSelectors((state) => state.profile.value)
  const user = state?.element.uid || profile?.uid
  const locationConfirmNumber = 50000000
  const confirmed = profile?.locationConfirmed
  const locationConfirmation = confirmed && Date.now() - confirmed < locationConfirmNumber ? true : false
  const dispatch = useDispatch()

  const onClick = () => {
    const myDoc = doc(dbservice, `members/${profile?.uid}`)
    if (
      location.lat > area.westSouth.lat &&
      location.lat < area.westNorth.lat
    ) {
      if (
        location.lng > area.westSouth.lng &&
        location.lng < area.eastSouth.lng
      ) {
        updateDoc(myDoc, { locationConfirmed: Date.now() })
        dispatch(changeProfile({...profile, locationConfirmed: true}))
      }
    }
  }
  const onClickLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
    onClick()
  }
  return (
    <div className="flex justify-center gap-5 p-5">
      <div className="flex flex-col">
        <div className="flex justify-center items-start gap-5 p-5">
          <div className="flex flex-col justify-center">
            <Chip
              sx={locationConfirmation ? {} : undefined}
              color={locationConfirmation ? "success" : undefined}
              label={locationConfirmation ? locationConfirmed : locationUnconfirmed}
            />
            {user === profile?.uid && !locationConfirmation && (
              <Button onClick={onClickLocation} variant="outlined">
                {campusLocationConfirmation}
              </Button>
            )}
          </div>
          {profile?.uid === user && (
            <ProfileLocationsChip />
          )}
        </div>
        {!locationConfirmation && location.lat !== 0 && (
          <div>{failedLocationConfirmation}</div>
        )}
      </div>
    </div>
  )
}

export default ProfileLocations
