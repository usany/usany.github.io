import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button, Chip } from '@mui/material'
import { doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import useLargeMedia from 'src/hooks/useLargeMedia'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import { changeProfile } from 'src/stateSlices/profileSlice'
import ProfileLocationsChip from './ProfileLocationsChip'

const campuses = {
  ko: ['서울캠퍼스', '국제캠퍼스', '광릉캠퍼스'],
  en: ['Seoul Campus', 'Global Campus', 'Gwangneung Campus']
}
const area = {
  westSouth: { lat: 37.5927551, lng: 127.047462 },
  westNorth: { lat: 37.6010743, lng: 127.047462 },
  eastSouth: { lat: 37.5927551, lng: 127.0571999 },
  eastNorth: { lat: 37.6010743, lng: 127.0571999 },
}
const areas = {
  'Seoul': {
    westSouth: { lat: 37.5927551, lng: 127.047462 },
    westNorth: { lat: 37.6010743, lng: 127.047462 },
    eastSouth: { lat: 37.5927551, lng: 127.0571999 },
    eastNorth: { lat: 37.6010743, lng: 127.0571999 },
  },
  'Global': {
    westSouth: { lat: 37.750293, lng: 127.187882 },
    westNorth: { lat: 37.750293, lng: 127.184942 },
    eastSouth: { lat: 37.747550, lng: 127.187882 },
    eastNorth: { lat: 37.747550, lng: 127.184942 },
  },
  'Gwangneung': {
    westSouth: { lat: 37.750293, lng: 127.187882 },
    westNorth: { lat: 37.750293, lng: 127.184942 },
    eastSouth: { lat: 37.747550, lng: 127.187882 },
    eastNorth: { lat: 37.747550, lng: 127.184942 },
  }
}

const ProfileLocations = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 })
  const {
    locationConfirmed,
    locationUnconfirmed,
    // campusLocationConfirmation,
    failedLocationConfirmation,
    save,
    nothingChanged,
    saved
  } = useTexts()
  const { state } = useLocation()
  const profile = useSelectors((state) => state.profile.value)
  const userUid = state?.element.uid || profile?.uid
  const userCampus = state?.element.campus || profile?.campus
  const locationConfirmNumber = 50000000
  const confirmed = profile?.locationConfirmed
  const largeMedia = useLargeMedia()
  const languages = useSelectors((state) => state.languages.value)
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
  const onLocationBoundary = () => {
    const myDoc = doc(dbservice, `members/${profile?.uid}`)
    const key = profile?.campus.slice(0, profile?.campus.indexOf(' ')) || 'Seoul'
    if (
      location.lat > areas[key].westSouth.lat &&
      location.lat < areas[key].westNorth.lat
    ) {
      if (
        location.lng > areas[key].westSouth.lng &&
        location.lng < areas[key].eastSouth.lng
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
      <div className={`flex ${!largeMedia && 'flex-col'} items-center gap-1`}>
        {userUid === profile?.uid ?
          <div className='flex items-center'>
            <Select defaultValue={campuses.en[campuses.en.indexOf(profile?.campus || 'Seoul Campus')]} onValueChange={(newValue) => {
              selectedCampus = newValue
            }}>
              <SelectTrigger
                className="w-52 bg-light-1 dark:bg-dark-1"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-light-1 dark:bg-dark-1">
                <SelectGroup>
                  {campuses[languages].map((value, index) => {
                    return (
                      <SelectItem key={index} value={campuses.en[index]}>
                        {value}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button onClick={onClickSaveCampus}>{save}</Button>
          </div>
        :
          <div className='flex justify-center'>{campuses[languages][campuses.en.indexOf(userCampus || 'Seoul Campus')]}</div>
        }
        <Chip
          sx={locationConfirmation ? {} : undefined}
          color={locationConfirmation ? 'success' : undefined}
          label={
            locationConfirmation ? locationConfirmed : userUid === profile?.uid ?
            <button className='flex justify-center gap-1' onClick={onClickLocation}>
              {locationUnconfirmed}
              <ProfileLocationsChip />
            </button>
            :
            locationUnconfirmed
          }
        />
        {!locationConfirmation && location.lat !== 0 && (
          <>{failedLocationConfirmation}</>
        )}
      </div>
    </div>
  )
}

export default ProfileLocations
