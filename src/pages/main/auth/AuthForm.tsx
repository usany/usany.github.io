import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, getDocs, query } from 'firebase/firestore'
// import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import staticMail from 'src/assets/signMail.svg'
import { auth, dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors.tsx'
import setDocUser from 'src/pages/core/setDocUser.ts'
import useTexts from 'src/useTexts.ts'
import AuthDialogs from './AuthDialogs.tsx'
import supabase from 'src/baseApi/base.tsx'

interface Props {
  signIn: boolean
  agreed: boolean
}
const AuthForm = ({ signIn, agreed }: Props) => {
  const [account, setAccount] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const languages = useSelectors((state) => state.languages.value)
  const { needToAgreeOnPrivateInformationPolicy } = useTexts()
  // const { i18n, t } = useTranslation()
  const onLine = useSelector((state) => state.onLine.value)
  const onSubmitSignIn = async (event) => {
    event.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, account.email, account.password)
      // const { error } = await supabase.auth.signInWithPassword({
      //   email: account.email,
      //   password: account.password,
      // })
      // if (String(error) === 'AuthApiError: Invalid login credentials') {
      //   const errorMessage = '로그인 실패: 계정을 확인해 주세요'
      //   setError(errorMessage)
      // }
      // .then(({ error }) => {
      //   console.log(error)
      // })
      // console.log(error)
      // location.reload()
    } catch (error) {
      console.log(error)
      const errorMessage = '로그인 실패: 계정을 확인해 주세요'
      setError(errorMessage)
      if (error.message === 'Firebase: Error (auth/invalid-credential).') {
        const errorMessage = '로그인 실패: 계정을 확인해 주세요'
        setError(errorMessage)
      }
    }
  }

  const onSubmitSignUp = async (event) => {
    event.preventDefault()
    if (agreed) {
      if (onLine) {
        try {
          const data = await createUserWithEmailAndPassword(
            auth,
            account.email,
            account.password,
          )
          // const { data, error } = await supabase.auth.signUp({
          //   email: account.email,
          //   password: account.password,
          // })
          // .then(({ error }) => {
          //   console.log(error)
          // })
          // if (String(error) === 'AuthApiError: User already registered') {
          //   const errorMessage = '회원가입 실패: 이미 가입된 계정입니다'
          //   setError(errorMessage)
          // }
          const uid = data.user.uid
          const email = data.user.email
          await supabase.storage.from('remake').update(uid, 'null')
          const docsRef = query(collection(dbservice, 'members'))
          const docs = await getDocs(docsRef)
          const docsLength = docs.docs.length
          setDocUser({
            uid: uid,
            email: email,
            ranking: docsLength,
          })
          await updateProfile(data.user, {
            displayName: data.user.email,
          }).catch((error) => {
            console.log('error')
          })
          // const user = doc(dbservice, `members/${uid}`)
          // const storageRef = ref(storage, uid)
          // uploadString(storageRef, 'null', 'raw').then((snapshot) => {
          //   console.log('Uploaded a blob or file!')
          //   getDownloadURL(storageRef)
          //     .then(async (url) => {
          //       await updateDoc(user, { profileImageUrl: url })
          //     })
          //     .catch((error) => {
          //       console.log(error)
          //     })
          // })
          // const profileImageNumber = Math.random()
          // const profileColorNumber = Math.random()
          // const profileImage = profileImageNumber < 0.5 ? 'animal' : 'plant'
          // const profileColor =
          //   profileColorNumber < 1 / 3
          //     ? 'profileRed'
          //     : profileColorNumber < 2 / 3
          //       ? 'profileBlue'
          //       : 'profileGold'
          // if (profileColorNumber < 1 / 3) {
          //   profileColor = 'profileRed'
          // } else if (profileColorNumber < 2 / 3) {
          //   profileColor = 'profileBlue'
          // } else {
          //   profileColor = 'profileGold'
          // }
          // if (profileImageNumber < 0.5) {
          //   profileImage = 'animal'
          // } else {
          //   profileImage = 'plant'
          // }
          // const reference = ref(storage, `${profileImage}${profileColor}.png`)
          // console.log(reference)
          // const docRef = doc(dbservice, `members/${uid}`)
          // updateDoc(docRef, {
          //   profileImage: false,
          //   profileColor: profileColor,
          //   defaultProfile: `https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/${profileImage}${profileColor}.png`,
          // })
          // getDownloadURL(reference).then((url) => {
          //   console.log(url)
          // })
          // setTimeout(() => {
          //   location.reload()
          // }, 1000)
        } catch (error) {
          console.log(error)
          // console.log(error.message)
          // setError(errorMessage)
          if (error.message === 'Firebase: Error (auth/invalid-credential).') {
            const errorMessage = '로그인 실패: 계정을 확인해 주세요'
            setError(errorMessage)
          } else if (
            error.message === 'Firebase: Error (auth/email-already-in-use).'
          ) {
            const errorMessage = '회원가입 실패: 이미 가입된 계정입니다'
            setError(errorMessage)
          } else if (
            error.message === 'Firebase: Error (auth/invalid-email).'
          ) {
            const errorMessage = '회원가입 실패: 계정을 확인해 주세요'
            setError(errorMessage)
          } else {
            console.log(error.message)
            setError(errorMessage)
          }
          console.log(error.message)
          setError(errorMessage)
        }
      } else {
        alert('네트워크 연결이 필요합니다')
      }
    }
  }

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event
    if (name === 'email') {
      setAccount({ email: value, password: account.password })
    } else if (name === 'password') {
      setAccount({ ...account, password: value })
    }
  }
  return (
    <div className="flex justify-center p-5">
      <div className="flex flex-col border border-solid w-[470px] rounded-lg pt-5">
        <form
          id={signIn ? 'auth' : 'signUp'}
          className="pt-3"
          onSubmit={signIn ? onSubmitSignIn : onSubmitSignUp}
        >
          <div className="flex justify-center px-3">
            <TextField
              label={languages === 'ko' ? '이메일' : 'email'}
              value={account.email}
              onChange={onChange}
              variant="outlined"
              name="email"
              type="email"
              fullWidth
              required
            />
          </div>
          <div className="flex justify-center px-3">
            <TextField
              label={languages === 'ko' ? '비밀번호' : 'password'}
              value={account.password}
              onChange={onChange}
              variant="outlined"
              name="password"
              type="password"
              fullWidth
              required
            />
          </div>
          <div className="flex flex-col justify-center p-3">
            {!signIn && !agreed ? (
              <Button
                variant="outlined"
                startIcon={<img src={staticMail} className="w-[20px]" />}
                form={signIn ? 'auth' : 'signUp'}
                // type="submit"
                disabled
              >
                {signIn
                  ? languages === 'ko'
                    ? '로그인'
                    : 'Sign in'
                  : languages === 'ko'
                    ? '회원가입'
                    : 'Register'}
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<img src={staticMail} className="w-[20px]" />}
                form={signIn ? 'auth' : 'signUp'}
                type="submit"
              >
                {signIn
                  ? languages === 'ko'
                    ? '로그인'
                    : 'Sign in'
                  : languages === 'ko'
                    ? '회원가입'
                    : 'Register'}
              </Button>
            )}
            {!signIn && !agreed && (
              <div>{needToAgreeOnPrivateInformationPolicy}</div>
            )}
            <span>{error}</span>
          </div>
        </form>
        {signIn && <AuthDialogs />}
      </div>
    </div>
  )
}

export default AuthForm
