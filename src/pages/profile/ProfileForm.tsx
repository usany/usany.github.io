import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { updateProfile, User } from "firebase/auth";
import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { dbservice } from 'src/baseApi/serverbase';
import useCardsBackground from 'src/hooks/useCardsBackground';
import { useSelectors } from 'src/hooks/useSelectors';

interface Props {
  userObj: User
}

const ProfileForm = ({ userObj, }: Props) => {
  const [profileChangeConfirmed, setProfileChangeConfirmed] = useState(false)
  const [newDisplayName, setNewDisplayName] = useState('')
  const languages = useSelectors((state) => state.languages.value)
  const { colorOne, colorTwo } = useCardsBackground()
  useEffect(() => {
    if (userObj?.displayName) {
      setNewDisplayName(
        userObj.displayName
      )
    }
  }, [])
  const onSubmit = async (event) => {
    event.preventDefault()
    if (newDisplayName === '') {
      alert('입력이 필요합니다')
    } else {
      const tmp = query(collection(dbservice, `members`))
      const querySnapshot = await getDocs(tmp);
      let profileConfirmed = true
      querySnapshot.forEach((doc) => {
        if (newDisplayName === doc.data().displayName) {
          alert('중복 확인이 필요합니다')
          profileConfirmed = false
        }
      });
      if (!profileConfirmed) {
        alert('중복 확인을 완료해 주세요')
      } else {
        const data = await doc(dbservice, `members/${userObj.uid}`)
        await updateDoc(data, { displayName: newDisplayName });
        await updateProfile(userObj, {
          displayName: newDisplayName
        }).then(() => {
          alert('교체 완료')
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
  const onChange = async (event) => {
    const {
      target: { value },
    } = event
    setNewDisplayName(value)
    const tmp = query(collection(dbservice, `members`))
    const querySnapshot = await getDocs(tmp);
    let profileConfirmed = true
    querySnapshot.forEach((doc) => {
      if (value === doc.data().displayName) {
        profileConfirmed = false
      }
    });
    if (profileConfirmed && value) {
      setProfileChangeConfirmed(true)
    } else {
      setProfileChangeConfirmed(false)
    }
  }

  return (
    <form id='profile' onSubmit={onSubmit}>
      <div className='flex justify-center pt-10'>
        <div className='flex flex-col'>
          <TextField sx={{ bgcolor: colorOne, borderRadius: '5px' }} label={languages === 'ko' ? '유저 이름 바꾸기' : 'Change user name'} placeholder='유저 이름 바꾸기' value={newDisplayName} type='text' onChange={onChange} />
          <div className='flex justify-start'>
            {profileChangeConfirmed ?
              <div className='flex'>
                <div className='pt-1'>{languages === 'ko' ? '다행히 중복되지 않네요' : 'Do not overlap'}</div>
              </div>
              :
              <div className='flex'>
                {newDisplayName ?
                  <div>
                    {newDisplayName === userObj.displayName ?
                      <div className='pt-1'>{languages === 'ko' ? '현재 이름이네요' : 'Current name'}</div>
                      :
                      <div className='pt-1'>{languages === 'ko' ? '아쉽게도 중복되네요' : 'Overlapping name'}</div>
                    }
                  </div>
                  :
                  <div className='pt-1'>{languages === 'ko' ? '이름 입력이 필요해요' : 'Need a name input'}</div>
                }
              </div>
            }
          </div>
        </div>
        <Button sx={{ bgcolor: colorTwo, height: '56px' }} variant='outlined' form='profile' type='submit' disabled={!profileChangeConfirmed}>{languages === 'ko' ? '바꾸기' : 'Change'}</Button>
      </div>
    </form>
  )
}

export default ProfileForm
