import { useMemo } from 'react';
import { useSelectors } from 'src/hooks/useSelectors';
// import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
// import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from 'firebase/firestore';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialogs from 'src/components/Dialogs';
import PageTitle from 'src/pages/core/pageTitle/PageTitle';
import AuthButtons from 'src/pages/main/auth/AuthButtons';
import AuthForm from 'src/pages/main/auth/AuthForm';
import Motions from 'src/pages/main/auth/Motions';

function Auth() {
  const motions = useMemo(() => <Motions />, [])
  const languages = useSelectors((state) => state.languages.value)
  return (
    <div>
      <PageTitle title={languages === 'ko' ? '로그인' : 'Sign in'} />
      <div className='flex justify-center p-5'>{languages === 'ko' ? '반갑습니다. 캠퍼스 우산 공유 서비스 쿠우산입니다.' : 'Welcome. This is usan sharing service khusan'}</div>
      <AuthForm signIn={true} />
      <AuthButtons />
      <div className='flex justify-center pt-5 px-5'>{languages === 'ko' ? '날씨 플레이리스트도 준비되어 있어요.' : 'Weather playlist is also available for you.'}</div>
      {motions}
    </div>
  )
}

export default Auth
