import { auth, onSocialClick, dbservice, onSocialClickMicrosoft, onSocialClickTwitter, onSocialClickFacebook } from 'src/baseApi/serverbase'
import Button from '@mui/material/Button';
import AuthDialogs from 'src/components/auth/AuthDialogs';
import { OAuthProvider, signInWithPopup } from 'firebase/auth';

const AuthButtons = () => {
  const onClickMicrosoft = () => {
    const providerMicrosoft = new OAuthProvider('microsoft.com');
    signInWithPopup(auth, providerMicrosoft).then((result) => {
            console.log(result)
            // const credential = OAuthProvider.credentialFromResult(result);
            // const accessToken = credential.accessToken;
            // const idToken = credential.idToken;
            console.log(accessToken)
            console.log(idToken)
        }).catch((error) => {
            console.log(error)
        })
  }
  return (
    <div className='flex flex-col w-screen items-center justify-center px-20'>
        <Button sx={{width: '50%'}} variant='outlined' name='g' onClick={onSocialClick}>구글로 로그인</Button>
        <Button sx={{width: '50%'}} variant='outlined' onClick={onSocialClickMicrosoft}>마이크로소프트로 로그인</Button>
        <Button sx={{width: '50%'}} variant='outlined' name='h' onClick={onSocialClick}>애플로 로그인</Button>
        <Button sx={{width: '50%'}} variant='outlined' onClick={onSocialClickFacebook}>페이스북으로 로그인</Button>
        <Button sx={{width: '50%'}} variant='outlined' onClick={onSocialClickTwitter}>트위터로 로그인</Button>
      <AuthDialogs />
    </div>
  )
}

export default AuthButtons