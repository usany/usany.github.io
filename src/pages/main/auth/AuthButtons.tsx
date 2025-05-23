import Button from '@mui/material/Button';
import staticGoogle from 'src/assets/signGoogle.svg';
import staticMicrosoft from 'src/assets/signMicrosoft.svg';
import { onSocialClick, onSocialClickGoogle, onSocialClickMicrosoft } from 'src/baseApi/serverbase';

const AuthButtons = () => {
  return (
    <div className='flex flex-col items-center justify-center px-32'>
      {/* <AuthDialogs /> */}
      <Button className='colorTwo' sx={{ width: '415px', }} startIcon={<img src={staticMicrosoft} className='w-[20px]' />} variant='outlined' onClick={onSocialClickMicrosoft}>
        <div className='truncate'>
          마이크로소프트 로그인
        </div>
      </Button>
      <Button className='colorTwo' sx={{ width: '415px' }} startIcon={<img src={staticGoogle} className='w-[20px]' />} variant='outlined' name='g' onClick={onSocialClickGoogle}>
        <div className='truncate'>
          구글 로그인
        </div>
      </Button>
      {/* <Button className='signin' sx={{ width: '50%' }} variant='outlined' onClick={onSocialClickTwitter}>트위터로 로그인</Button>
      <Button sx={{ width: '50%', backgroundColor: '#2196f3' }} startIcon={<img src={staticFacebook} className='w-[20px]' />} variant='outlined' onClick={onSocialClick}>
        <div className='truncate'>
          페이스북으로 로그인
        </div>
      </Button> */}
      <Button disabled className='colorTwo' sx={{ width: '415px' }} variant='outlined' name='h' onClick={onSocialClick}>애플로 로그인</Button>
      {/* <Button sx={{width: '50%'}} startIcon={<img src={staticMicrosoft} className='w-[20px]'/>} variant='outlined' name='g' onClick={onSocialClick}>구글로 로그인</Button> */}
      {/* <Button sx={{width: '50%'}} variant='outlined' name='g' onClick={onSocialClick}>구글로 로그인</Button> */}
      {/* <Button sx={{width: '50%'}} variant='outlined' onClick={onSocialClickFacebook}>페이스북으로 로그인</Button> */}
      {/* <AuthDialogs /> */}
    </div >
  )
}

export default AuthButtons
