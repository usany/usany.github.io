import { auth, onSocialClick, dbservice, onSocialClickMicrosoft, onSocialClickTwitter, onSocialClickFacebook } from 'src/baseApi/serverbase'
import Button from '@mui/material/Button';
import AuthDialogs from 'src/components/auth/AuthDialogs';
import staticMail from 'src/assets/signMail.svg'
import staticGoogle from 'src/assets/signGoogle.svg'
import staticMicrosoft from 'src/assets/signMicrosoft.svg'
import staticFacebook from 'src/assets/signFacebook.svg'
import { OAuthProvider, signInWithPopup } from 'firebase/auth';

const AuthButtons = () => {
  return (
    <div className='flex flex-col w-screen items-center justify-center px-20'>
        <Button sx={{width: '50%'}} startIcon={<img src={staticMicrosoft} className='w-[20px]'/>} variant='outlined' onClick={onSocialClickMicrosoft}>
          <div className='truncate'>
            마이크로소프트 로그인
          </div>
        </Button>
        <Button sx={{width: '50%'}} startIcon={<img src={staticGoogle} className='w-[20px]'/>} variant='outlined' name='g' onClick={onSocialClick}>
          <div className='truncate'>
          구글 로그인
          </div>
        </Button>
        <Button sx={{width: '50%', backgroundColor: '#2196f3'}} startIcon={<img src={staticFacebook} className='w-[20px]'/>} variant='outlined' onClick={onSocialClick}>
          <div className='truncate'>
            페이스북으로 로그인
          </div>
        </Button>
        {/* <Button sx={{width: '50%'}} startIcon={<img src={staticMicrosoft} className='w-[20px]'/>} variant='outlined' name='g' onClick={onSocialClick}>구글로 로그인</Button> */}
        <Button sx={{width: '50%'}} variant='outlined' name='g' onClick={onSocialClick}>구글로 로그인</Button>
        <Button sx={{width: '50%'}} variant='outlined' name='h' onClick={onSocialClick}>애플로 로그인</Button>
        <Button sx={{width: '50%'}} variant='outlined' onClick={onSocialClickFacebook}>페이스북으로 로그인</Button>
        <Button sx={{width: '50%'}} variant='outlined' onClick={onSocialClickTwitter}>트위터로 로그인</Button>
      <AuthDialogs />
    </div>
  )
}

export default AuthButtons