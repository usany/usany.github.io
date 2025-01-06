import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
import Button from '@mui/material/Button';
import SignUpDialogs from 'src/muiComponents/SignUpDialogs';

const AuthButtons = () => {
  return (
    <div className='flex flex-col justify-center px-20'>
      <div>
        <Button sx={{width: '50%'}} variant='outlined' name='g' onClick={onSocialClick}>구글로 로그인</Button>
        <Button sx={{width: '50%'}} variant='outlined' name='h' onClick={onSocialClick}>깃허브로 로그인</Button>
      </div>
      <SignUpDialogs />
    </div>
  )
}

export default AuthButtons