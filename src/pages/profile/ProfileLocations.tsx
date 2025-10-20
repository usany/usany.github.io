import { Button, Chip, ClickAwayListener, MenuItem, Tooltip } from '@mui/material'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import ProfileLocationsChip from './ProfileLocationsChip'
import { useDispatch } from 'react-redux'
import { changeProfile } from 'src/stateSlices/profileSlice'
import useLargeMedia from 'src/hooks/useLargeMedia'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const campuses = ['Seoul Campus', 'Global Campus', 'Gwangleung Campus']
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
    failedLocationConfirmation,
    save,
    nothingChanged,
    saved
  } = useTexts()
  const { state } = useLocation()
  const profile = useSelectors((state) => state.profile.value)
  const userUid = state?.element.uid || profile?.uid
  const locationConfirmNumber = 50000000
  const confirmed = profile?.locationConfirmed 
  const largeMedia = useLargeMedia()
  
  const locationConfirmation =
    confirmed && Date.now() - confirmed < locationConfirmNumber ? true : false
  const dispatch = useDispatch()
  let selectedCampus = profile?.campus
  const onClickSaveCampus = () => {
    if (profile?.campus !== selectedCampus) {
      dispatch(changeProfile({...profile, campus: selectedCampus }))
      const ref = doc(dbservice, `members/${profile?.uid}`)
      updateDoc(ref, { campus: selectedCampus})
      alert(saved)
    } else {
      alert(nothingChanged)
    }
  }
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
        dispatch(changeProfile({ ...profile, locationConfirmed: true }))
      }
    }
  }
  const onClickLocation = () => {
    alert('Allow location access to update on-campus status of your profile')
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
    onClick()
  }
  return (
    <div className="flex justify-center p-10">
      <div className="flex flex-col">
        <div className='flex'>
          <Select defaultValue={profile?.campus || 'Seoul Campus'} onValueChange={(newValue) => {
            selectedCampus = newValue
          }}>
            <SelectTrigger
              className="bg-light-1 dark:bg-dark-1"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-light-1 dark:bg-dark-1">
              <SelectGroup>
                {campuses.map((value, index) => {
                  return (
                    <SelectItem key={index} value={value}>
                      {value}
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button onClick={onClickSaveCampus}>{save}</Button>
        </div>
        <div className="flex justify-center items-start gap-5 p-5">
          <div className={largeMedia ? "flex justify-center" : "flex flex-col"}>
            <div className='flex justify-center'>
              <Chip
                sx={locationConfirmation ? {} : undefined}
                color={locationConfirmation ? 'success' : undefined}
                label={
                  locationConfirmation ? locationConfirmed : 
                  <div className='flex justify-center gap-1'>
                    locationUnconfirmed
                    <ProfileLocationsChip />
                  </div>
                }
              />
            </div>
            {userUid === profile?.uid && !locationConfirmation && (
              <div className='flex'>
                <Button onClick={onClickLocation} variant="outlined">
                  {campusLocationConfirmation}
                </Button>
              </div>
            )}
          </div>
        </div>
        {!locationConfirmation && location.lat !== 0 && (
          <>{failedLocationConfirmation}</>
        )}
      </div>
    </div>
  )
}

export default ProfileLocations
