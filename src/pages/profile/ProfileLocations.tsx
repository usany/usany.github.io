import { useState, useEffect, useReducer } from 'react'
import { Button, Chip } from "@mui/material";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { dbservice } from 'src/baseApi/serverbase';

const area = {
  westSouth: { lat: 37.5927551, lng: 127.047462 },
  westNorth: { lat: 37.6010743, lng: 127.047462 },
  eastSouth: { lat: 37.5927551, lng: 127.0571999 },
  eastNorth: { lat: 37.6010743, lng: 127.0571999 },
}
const ProfileLocations = ({
  user,
  userObj,
}) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 })
  const [locationConfirmed, setLocationConfirmed] = useState(false)
  useEffect(() => {
    const confirmLocation = async () => {
      const myDoc = doc(dbservice, `members/${userObj.uid}`);
      const document = await getDoc(myDoc)
      const confirmed = document.data()?.locationConfirmed
      setLocationConfirmed(confirmed)
    }
    const onClick = () => {
      const myDoc = doc(dbservice, `members/${userObj.uid}`);
      updateDoc(myDoc, { locationConfirmed: true });
      setLocationConfirmed(true)
    }
    if (location.lat > area.westSouth.lat && location.lat < area.westNorth.lat) {
      if (location.lng > area.westSouth.lng && location.lng < area.eastSouth.lng) {
        onClick()
        confirmLocation()
      }
    }
    confirmLocation()
  }, [location, locationConfirmed])
  // const onClick = () => {
  //   const myDoc = doc(dbservice, `members/${userObj.uid}`);
  //   updateDoc(myDoc, { locationConfirmed: true });
  //   setLocationConfirmed(true)
  // }
  const onClickLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      setLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
    })
    console.log(location)
  }
  return (
    <div className='flex flex-col items-center pt-5'>
      <div>
        캠퍼스에 계세요?
      </div>
      <div>
        위치 확인으로 캠퍼스에 있음을 알리세요.
      </div>
      {locationConfirmed ? <Chip color="success" label={'캠퍼스 위치 확인'} /> : <Chip label={'캠퍼스 위치 미확인'} />}
      {user === userObj.uid && !locationConfirmed &&
        <Button onClick={onClickLocation} variant="outlined">
          캠퍼스 위치 확인
        </Button>
      }
      {!locationConfirmed && location.lat !== 0 && <div>확인 불가</div>}
    </div>
  );
}

export default ProfileLocations
