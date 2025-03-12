import { useState, useEffect, useReducer } from 'react'
import { Button, Chip } from "@mui/material";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { dbservice } from 'src/baseApi/serverbase';

const ProfileLocations = ({
  user,
  userObj,
}) => {
  const [locationConfirmed, setLocationConfirmed] = useState(false)
  useEffect(() => {
    const confirmLocation = async () => {
      const myDoc = doc(dbservice, `members/${userObj.uid}`);
      const document = await getDoc(myDoc)
      const confirmed = document.data()?.locationConfirmed
      setLocationConfirmed(confirmed)
    }
    confirmLocation()
  }, [])
  const onClick = () => {
    const myDoc = doc(dbservice, `members/${userObj.uid}`);
    updateDoc(myDoc, { locationConfirmed: true });
    setLocationConfirmed(true)
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
        <Button onClick={onClick} variant="outlined">
          캠퍼스 위치 확인
        </Button>
      }
    </div>
  );
}

export default ProfileLocations
