import Button from '@mui/material/Button'
import staticGoogle from 'src/assets/signGoogle.svg'
import staticMicrosoft from 'src/assets/signMicrosoft.svg'
import {
  onSocialClick,
  onSocialClickGoogle,
  onSocialClickMicrosoft,
} from 'src/baseApi/serverbase'

const AuthButtons = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center w-[250px]">
        {/* <AuthDialogs /> */}
        <div className="flex flex-col">
          <Button
            className="colorTwo"
            startIcon={<img src={staticMicrosoft} className="w-[20px]" />}
            variant="outlined"
            onClick={onSocialClickMicrosoft}
          >
            마이크로소프트 로그인
            {/* <div className='truncate'>
          </div> */}
          </Button>
          <Button
            className="colorTwo"
            startIcon={<img src={staticGoogle} className="w-[20px]" />}
            variant="outlined"
            name="g"
            onClick={onSocialClickGoogle}
          >
            구글 로그인
            {/* <div className='truncate'>
          </div> */}
          </Button>
          {/* <Button className='signin' sx={{ width: '50%' }} variant='outlined' onClick={onSocialClickTwitter}>트위터로 로그인</Button>
      <Button sx={{ width: '50%', backgroundColor: '#2196f3' }} startIcon={<img src={staticFacebook} className='w-[20px]' />} variant='outlined' onClick={onSocialClick}>
        <div className='truncate'>
          페이스북으로 로그인
        </div>
      </Button> */}
          <Button
            disabled
            className="colorTwo"
            variant="outlined"
            name="h"
            onClick={onSocialClick}
          >
            곧 애플로 뵐게요
          </Button>
          {/* <Button sx={{width: '50%'}} startIcon={<img src={staticMicrosoft} className='w-[20px]'/>} variant='outlined' name='g' onClick={onSocialClick}>구글로 로그인</Button> */}
          {/* <Button sx={{width: '50%'}} variant='outlined' name='g' onClick={onSocialClick}>구글로 로그인</Button> */}
          {/* <Button sx={{width: '50%'}} variant='outlined' onClick={onSocialClickFacebook}>페이스북으로 로그인</Button> */}
          {/* <AuthDialogs /> */}
        </div>
      </div>
    </div>
  )
}

export default AuthButtons
