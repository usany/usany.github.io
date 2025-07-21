import { Button, TextField } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dbservice } from 'src/baseApi/serverbase';
import { useSelectors } from 'src/hooks/useSelectors';
import PageTitle from 'src/pages/core/pageTitle/PageTitle';
import AuthButtons from 'src/pages/main/auth/AuthButtons';
import AuthForm from 'src/pages/main/auth/AuthForm';
import Motions from 'src/pages/main/auth/Motions';
import { changeUserCertificated } from 'src/stateSlices/userCertificatedSlice';

function Auth({ userObj }) {
  const [numberString, setNumberString] = useState('')
  const [mailSent, setMailSent] = useState(false)
  const [createdNumber, setCreatedNumber] = useState('')
  const languages = useSelectors((state) => state.languages.value)
  const dispatch = useDispatch()
  const handleNumberString = (event) => {
    const {
      target: { value }
    } = event
    setNumberString(value)
  }
  const sendMail = async () => {
    let number = Math.floor(Math.random() * 1000000).toString()
    for (let index = 0; 6 - number.length; index++) {
      number = '0' + number
    }
    setCreatedNumber(number)
    setMailSent(true)
    // await fetch('https://service-ceni.onrender.com/mail', {
    await fetch('http://localhost:5000/mail', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: userObj?.email,
        author: number
      })
    })
  }
  const confirmNumber = async () => {
    if (numberString === createdNumber) {
      const userDocRef = doc(dbservice, `members/${userObj.uid}`)
      await updateDoc(userDocRef, { certificated: true })
      dispatch(changeUserCertificated(true))
    } else {
      alert('번호를 확인해주세요.')
    }
  }
  return (
    <div>
      {userObj ?
        <div>
          <PageTitle title={languages === 'ko' ? '메일 확인' : 'Confirming mail'} />
          <div className='flex flex-col gap-5 items-center'>
            {mailSent ?
              <div>{userObj.email}로 메일을 보냈어요. 번호를 입력해주세요.</div>
              :
              <div>{userObj.email}로 확인 메일을 보낼게요. 번호를 확인해주세요.</div>
            }
            <div className='flex gap-5'>
              {mailSent && <TextField label='numbers' value={numberString} onChange={handleNumberString} />}
              {numberString.length === 6 &&
                <Button onClick={confirmNumber}>
                  완료
                </Button>
              }
            </div>
            <Button onClick={sendMail}>
              {mailSent ? '메일 다시 받기' : '메일 받기'}
            </Button>
          </div>
        </div>
        :
        <div>
          <PageTitle title={languages === 'ko' ? '로그인' : 'Sign in'} />
          <div className='flex justify-center p-5'>{languages === 'ko' ? '반갑습니다. 캠퍼스 우산 공유 서비스 쿠우산입니다.' : 'Welcome. This is usan sharing service khusan'}</div>
          <AuthForm signIn={true} />
          <AuthButtons />
          <div className='flex justify-center pt-5 px-5'>{languages === 'ko' ? '날씨 플레이리스트도 준비되어 있어요.' : 'Weather playlist is also available for you.'}</div>
          <Motions />
        </div>
      }
    </div>
  )
}

export default Auth
