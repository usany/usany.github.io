import { TextField } from '@mui/material';
import { useState } from 'react';
import { useSelectors } from 'src/hooks/useSelectors';
import PageTitle from 'src/pages/core/pageTitle/PageTitle';
import AuthButtons from 'src/pages/main/auth/AuthButtons';
import AuthForm from 'src/pages/main/auth/AuthForm';
import Motions from 'src/pages/main/auth/Motions';

function Auth({ userObj, userCertificated }) {
  const [numberString, setNumberString] = useState('')
  const languages = useSelectors((state) => state.languages.value)
  return (
    <div>
      {userObj ?
        <div>
          <PageTitle title={languages === 'ko' ? '메일 확인' : 'Confirming mail'} />
          <TextField label='numbers' value={numberString} />
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
