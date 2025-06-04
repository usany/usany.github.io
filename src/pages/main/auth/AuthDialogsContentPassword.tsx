import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useSelector } from "react-redux";
import staticMail from 'src/assets/signMail.svg';
import { auth } from 'src/baseApi/serverbase';
import { useSelectors } from "src/hooks/useSelectors";

function AuthDialogsContentPassword({ userObj }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const theme = useSelector((state) => state.theme.value);
  const languages = useSelectors((state) => state.languages.value)
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event
    setEmail(value)
  }
  const passwordEmail = () => {
    sendPasswordResetEmail(auth, userObj.email)
      .then(() => {
        console.log('sent')
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        setError(error)
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  return (
    <div className='flex justify-center p-5'>
      <div className="flex flex-col border border-solid w-[470px] rounded-lg pt-5">
        <div className="flex p-3">
          {languages === 'ko' ?
            <div>비밀번호 재설정 메일을 보내드릴게요</div>
            :
            <div>We will send you a password reset email</div>
          }
        </div>
        <form
          id={'password'}
          className="pt-3"
          onSubmit={passwordEmail}
        >
          <div className="flex justify-center px-3">
            <TextField
              label={languages === 'ko' ? '이메일' : 'email'}
              value={email}
              onChange={onChange}
              variant="outlined"
              name="email"
              type="email"
              fullWidth
              required
            />
          </div>
          <div className="flex flex-col justify-center p-3">
            <Button
              variant="outlined"
              startIcon={<img src={staticMail} className="w-[20px]" />}
              form={'password'}
              type="submit"
            >
              {languages === 'ko'
                ? '메일 전송'
                : 'Send Mail'}
            </Button>
            {error && <span>{languages === 'ko' ? '전송에 실패했습니다' : 'Failed sending'}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthDialogsContentPassword;
