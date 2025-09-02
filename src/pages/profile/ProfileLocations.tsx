import { Button, Chip, ClickAwayListener, Tooltip } from '@mui/material'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors'
import useTexts from 'src/useTexts'

const area = {
  westSouth: { lat: 37.5927551, lng: 127.047462 },
  westNorth: { lat: 37.6010743, lng: 127.047462 },
  eastSouth: { lat: 37.5927551, lng: 127.0571999 },
  eastNorth: { lat: 37.6010743, lng: 127.0571999 },
}
const ProfileLocations = ({ user }) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 })
  const [locationConfirmed, setLocationConfirmed] = useState(false)
  const [open, setOpen] = useState(false)
  const {
    areYouInCampus,
    letOthersKnowYouAreInCampusByLocationConfirmation,
    locationConfirmationLastsUntilTheNextDay,
  } = useTexts()
  const handleTooltipClose = () => {
    setOpen(false)
  }
  const handleTooltipOpen = () => {
    setOpen(true)
  }
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)

  const confirmLocation = async () => {
    const myDoc = doc(dbservice, `members/${user}`)
    const document = await getDoc(myDoc)
    const confirmed = document.data()?.locationConfirmed
    const locationConfirmNumber = 50000000
    if (confirmed && Date.now() - confirmed < locationConfirmNumber) {
      setLocationConfirmed(true)
    }
  }
  useEffect(() => {
    confirmLocation()
  }, [location, locationConfirmed, user])

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
        setLocationConfirmed(true)
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
            {locationConfirmed ? (
              <Chip
                sx={{}}
                color="success"
                label={
                  languages === 'ko' ? '캠퍼스 위치 확인' : 'Location confirmed'
                }
              />
            ) : (
              <Chip
                label={
                  languages === 'ko'
                    ? '캠퍼스 위치 미확인'
                    : 'Location unconfirmed'
                }
              />
            )}
            {user === profile?.uid && !locationConfirmed && (
              <Button onClick={onClickLocation} variant="outlined">
                {languages === 'ko'
                  ? '캠퍼스 위치 확인'
                  : 'Campus location confirm'}
              </Button>
            )}
          </div>
          {profile?.uid === user && (
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <div className="flex">
                <Tooltip
                  onClose={handleTooltipClose}
                  open={open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={
                    <div className="text-xl">
                      <div>{areYouInCampus}</div>
                      <div>
                        {letOthersKnowYouAreInCampusByLocationConfirmation}
                      </div>
                      <div>{locationConfirmationLastsUntilTheNextDay}</div>
                    </div>
                  }
                  slotProps={{
                    popper: {
                      disablePortal: true,
                    },
                  }}
                >
                  <div
                    className="rounded-xl border border-solid px-1 bg-light-2 dark:bg-dark-2"
                    onClick={handleTooltipOpen}
                  >
                    ?
                  </div>
                </Tooltip>
              </div>
            </ClickAwayListener>
          )}
        </div>
        {!locationConfirmed && location.lat !== 0 && (
          <div>{languages === 'ko' ? '확인 불가' : 'Confirm fail'}</div>
        )}
      </div>
    </div>
  )
}

export default ProfileLocations
