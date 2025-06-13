import { Button, Chip, ClickAwayListener, Tooltip } from '@mui/material'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors'

const area = {
  westSouth: { lat: 37.5927551, lng: 127.047462 },
  westNorth: { lat: 37.6010743, lng: 127.047462 },
  eastSouth: { lat: 37.5927551, lng: 127.0571999 },
  eastNorth: { lat: 37.6010743, lng: 127.0571999 },
}
const ProfileLocations = ({ user, userObj }) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 })
  const [locationConfirmed, setLocationConfirmed] = useState(false)
  const [open, setOpen] = useState(false)
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const languages = useSelectors((state) => state.languages.value)

  useEffect(() => {
    const confirmLocation = async () => {
      const myDoc = doc(dbservice, `members/${user}`)
      const document = await getDoc(myDoc)
      const confirmed = document.data()?.locationConfirmed
      setLocationConfirmed(confirmed)
      console.log(user)
    }
    const onClick = () => {
      const myDoc = doc(dbservice, `members/${userObj.uid}`)
      updateDoc(myDoc, { locationConfirmed: true })
      setLocationConfirmed(true)
    }
    if (
      location.lat > area.westSouth.lat &&
      location.lat < area.westNorth.lat
    ) {
      if (
        location.lng > area.westSouth.lng &&
        location.lng < area.eastSouth.lng
      ) {
        onClick()
        confirmLocation()
      }
    }
    confirmLocation()
  }, [location, locationConfirmed, user])
  // const onClick = () => {
  //   const myDoc = doc(dbservice, `members/${userObj.uid}`);
  //   updateDoc(myDoc, { locationConfirmed: true });
  //   setLocationConfirmed(true)
  // }
  const onClickLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
    console.log(location)
  }
  // console.log(user)
  return (
    <div className="flex flex-col justify-center items-center">
      {/* {userObj.uid === user && (
        <div>
          {languages === 'ko' ? (
            <div>
              <div>캠퍼스에 계세요?</div>
              <div>위치 확인으로 캠퍼스에 있음을 알리세요.</div>
              <div>위치 확인은 다음날까지 지속됩니다.</div>
            </div>
          ) : (
            <div>
              <div>Are you in campus?</div>
              <div>Let others know you are in campus by location confirm.</div>
              <div>Location confirm will last till next day.</div>
            </div>
          )}
        </div>
      )} */}
      <div className='flex justify-center'>
        {
          locationConfirmed ? (
            <Chip
              sx={{}}
              color='success'
              label={
                languages === 'ko' ? '캠퍼스 위치 확인' : 'Location confirmed'
              }
            />
          ) : (
            // <Chips label={'캠퍼스 위치 확인'} className='bg-profile-green' />
            <Chip
              label={
                languages === 'ko' ? '캠퍼스 위치 미확인' : 'Location unconfirmed'
              }
            />
          ) // <Chips label={'캠퍼스 위치 미확인'} />
        }
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div className='flex justify-center items-center'>
            <Tooltip
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={<div className='text-xl'>
                <div>캠퍼스에 계세요?</div>
                <div>위치 확인으로 캠퍼스에 있음을 알리세요.</div>
                <div>위치 확인은 다음날까지 지속됩니다.</div>
              </div>}
              slotProps={{
                popper: {
                  disablePortal: true,
                },
              }}
            >
              <div className='rounded-xl border border-solid px-1 bg-light-2 dark:bg-dark-2' onClick={handleTooltipOpen}>?</div>
            </Tooltip>
          </div>
        </ClickAwayListener>
      </div>
      {user === userObj.uid && !locationConfirmed && (
        <Button onClick={onClickLocation} variant="outlined">
          {languages === 'ko' ? '캠퍼스 위치 확인' : 'Campus location confirm'}
        </Button>
      )}
      {!locationConfirmed && location.lat !== 0 && (
        <div>{languages === 'ko' ? '확인 불가' : 'Confirm fail'}</div>
      )}
    </div>
  )
}

export default ProfileLocations
