import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useSelectors } from 'src/hooks/useSelectors';
import PageTitle from 'src/pages/core/pageTitle/PageTitle';
import AuthButtons from 'src/pages/main/auth/AuthButtons';
import AuthForm from 'src/pages/main/auth/AuthForm';
import Motions from 'src/pages/main/auth/Motions';

function Auth({ userObj }) {
  const [numberString, setNumberString] = useState('')
  const [mailSent, setMailSent] = useState(false)
  const [createdNumber, setCreatedNumber] = useState(null)
  const languages = useSelectors((state) => state.languages.value)
  const userCertificated = useSelectors((state) => state.userCertificated.value)
  const handleNumberString = (event) => {
    const {
      target: { value }
    } = event
    setNumberString(value)
  }
  const sendMail = async () => {
    const number = Math.floor(Math.random() * 1000000)
    setCreatedNumber(number)
    setMailSent(true)
    await fetch('/mail', (res) => {

    })
  }
  return (
    <div>
      {userObj ?
        <div>
          <PageTitle title={languages === 'ko' ? '메일 확인' : 'Confirming mail'} />
          {mailSent ?
            <div>{userObj.email}로 메일을 보냈어요. 번호를 입력해주세요.</div>
            :
            <div>{userObj.email}로 확인 메일을 보낼게요. 번호를 확인해주세요.</div>
          }
          {mailSent && <TextField label='numbers' value={numberString} onChange={handleNumberString} />}
          <Button onClick={sendMail}>
            {mailSent ? '메일 다시 받기' : '메일 받기'}
          </Button>
          {numberString.length === 6 &&
            <Button>
              완료
            </Button>
          }
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
