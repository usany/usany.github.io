import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { doc, setDoc } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import { storage } from "src/baseApi/serverbase";
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";

interface Props {
  handleClose: () => void
}

const SignUpForm = ({ handleClose }: Props) => {
  const [account, setAccount] = useState({email: '', password: ''})
  const [error, setError] = useState('')
  // async function signInWithEmail(email, password) {
  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email: email,
  //     password: password,
  //   })
  //   console.log(data)
  // }  
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      let data: object;
      data = await createUserWithEmailAndPassword(auth, account.email, account.password)
      await setDoc(doc(dbservice, 'members', `${data.user.uid}`), {
        uid: data.user.uid,
        displayName: data.user.uid,
        points: 0,
        profileColor: '#2196f3',
        profileImage: null,
        profileImageUrl: null,
        followerNum: 0,
        followingNum: 0,
        followers: [],
        followings: [],
        messagingToken: null,
      })
      await updateProfile(data.user, {
        displayName: data.user.uid
      }).catch((error) => {
        console.log('error')
      })
      
      const storageRef = ref(storage, data.user.uid);
      uploadString(storageRef, 'null', 'raw').then((snapshot) => {
          console.log('Uploaded a blob or file!');
      });
      // if (newAccount.account) {
      // } else {
      // }
      // await createUserWithEmailAndPassword(auth, account.email, account.password)
    } catch (error) {
      if (error.message === 'Firebase: Error (auth/invalid-credential).') {
        const errorMessage = '로그인 실패: 계정을 확인해 주세요'
        setError(errorMessage)
      } else if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        const errorMessage = '회원가입 실패: 이미 가입된 계정입니다'
        setError(errorMessage)
      } else {
        console.log(error.message)
      }
    }
    // setValue(2)
    // signInWithEmail(email, password)
  }

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event
    if (name === 'email') {
      setAccount({email: value, password: account.password})
    } else if (name === 'password') {
      setAccount({...account, password: value})
    }
  }
  
  return (
    <form id='signUp' className='pt-3' onSubmit={onSubmit}>
      <div className='flex justify-center'>
          <TextField label="이메일" value={account.email} onChange={onChange} variant="outlined" name='email' type='email' fullWidth required />
      </div>
      <div className='flex justify-center'>
          <TextField label="비밀번호" value={account.password} onChange={onChange} variant="outlined" name='password' type='password' fullWidth required />
      </div>
      <div className='flex justify-center pt-3'>
          <Button variant='outlined' form='signUp' type='submit'>회원가입</Button>
          {/* <Button variant='outlined' onClick={handleClose}>
            닫기
          </Button> */}
      </div>
      <span>{error}</span>
    </form>
  )
}

export default SignUpForm