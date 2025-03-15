import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import { useQueryState } from 'nuqs'
import { NuqsAdapter } from 'nuqs/adapters/react'

interface Props {
  userObj: string
}

const ProfileForm = ({ userObj, }) => {
  const [profileChangeConfirmed, setProfileChangeConfirmed] = useState(false)
  const [newDisplayName, setNewDisplayName] = useState('')
  // const [name, setName] = useQueryState('name')
  useEffect(() => {
    setNewDisplayName(
      userObj.displayName
    )
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
        await updateDoc(data, {displayName: newDisplayName});
        await updateProfile(userObj, {
          displayName: newDisplayName
        }).then(() => {
          alert('교체 완료')
        }).catch((error) => {
          console.log('error')
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
        {/* <div className='flex pt-5 px-3'>유저 이름 바꾸기:</div> */}
        <div className='flex flex-col'>
          <TextField label='유저 이름 바꾸기' placeholder='유저 이름 바꾸기' value={newDisplayName} type='text' onChange={onChange} />
          <div className='flex justify-start'>
            {profileChangeConfirmed ?
              <div className='flex'>
                <div className='pt-1'>다행히 중복되지 않네요</div>
                {/* <Button variant='outlined' form='profile' type='submit'>바꾸기</Button> */}
              </div>
              :
              <div className='flex'>
                {newDisplayName ?
                  <div>
                    {newDisplayName === userObj.displayName ?
                      <div className='pt-1'>현재 이름이네요</div>
                      :
                      <div className='pt-1'>아쉽게도 중복되네요</div>
                    }
                  </div>
                  :
                  <div className='pt-1'>이름 입력이 필요해요</div>
                }
                {/* <Button variant='outlined' form='profile' type='submit' disabled>바꾸기</Button> */}
              </div>
            }
          </div>
        </div>
        {profileChangeConfirmed ?
          <Button sx={{height: '56px'}} variant='outlined' form='profile' type='submit'>바꾸기</Button>
          :
          <Button sx={{height: '56px'}} variant='outlined' form='profile' type='submit' disabled>바꾸기</Button>
        }
        </div>
    </form>
  )
}

export default ProfileForm
