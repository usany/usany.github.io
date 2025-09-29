import { Button } from '@mui/material'
import { deleteUser, getAuth, User } from 'firebase/auth'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import AuthButtons from 'src/pages/main/auth/AuthButtons'
import AuthForm from 'src/pages/main/auth/AuthForm'
import Motions from 'src/pages/main/auth/Motions'
import { useTexts } from 'src/hooks'
import AuthPassword from './AuthPassword'
import { changeProfile } from 'src/stateSlices/profileSlice'

function Auth() {
  const [numberString, setNumberString] = useState('')
  const [mailSent, setMailSent] = useState(false)
  const [createdNumber, setCreatedNumber] = useState('')
  const profile = useSelectors((state) => state.profile.value)
  const languages = useSelectors((state) => state.languages.value)
  const dispatch = useDispatch()
  const {
    checkTheNumber,
    weWillSendYouAConfirmingMailTo,
    sentAConfirmingMail,
    inputTheNumber,
    confirm,
    sendMail,
    sendMailAgain,
    cancelRegistration,
    confirmingMail,
    signIn,
    welcomeToKhusan,
    playlistReadyForYouToGetRidOfBoredom
  } = useTexts()
  const handleNumberString = (newValue) => {
    setNumberString(newValue)
  }
  const sendNumberMail = async () => {
    let number = Math.floor(Math.random() * 1000000).toString()
    for (let index = 0; 6 - number.length; index++) {
      number = '0' + number
    }
    setCreatedNumber(number)
    setMailSent(true)
    await fetch('https://service-ceni.onrender.com/mail', {
      // await fetch('http://localhost:5000/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: profile?.email,
        number: number,
        language: localStorage.getItem('languages') || 'ko',
      }),
    })
  }
  const confirmNumber = async () => {
    if (numberString === createdNumber) {
      const userDocRef = doc(dbservice, `members/${profile?.uid}`)
      await updateDoc(userDocRef, { certificated: true })
      dispatch(changeProfile({ ...profile, certificated: true }))
    } else {
      alert(checkTheNumber)
    }
  }
  const cancelUserRegistration = async () => {
    await deleteDoc(doc(dbservice, `members/${profile?.uid}`))
    const auth = getAuth()
    if (auth) {
      deleteUser(auth.currentUser)
        .then(() => {
          location.reload()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  return (
    <>
      <PageTitle
        title={profile ? confirmingMail : signIn}
      />
      {profile ? (
        <div className="flex flex-col gap-5 items-center">
          {mailSent ? (
            <>
              {languages === 'en' && sentAConfirmingMail} {profile.email}
              {languages === 'ko' && sentAConfirmingMail}. {inputTheNumber}.
            </>
          ) : (
            <>
              {languages === 'en' && weWillSendYouAConfirmingMailTo}{' '}
              {profile.email}
              {languages === 'ko' && weWillSendYouAConfirmingMailTo}.{' '}
              {checkTheNumber}.
            </>
          )}
          {mailSent && (
            <AuthPassword
              numberString={numberString}
              handleNumberString={handleNumberString}
            />
          )}
          <div className="flex gap-5">
            {numberString.length === 6 && (
              <Button onClick={confirmNumber}>{confirm}</Button>
            )}
            <Button onClick={sendNumberMail}>
              {mailSent ? sendMailAgain : sendMail}
            </Button>
          </div>
          <Button onClick={cancelUserRegistration}>
            {cancelRegistration}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-center p-5">
            {welcomeToKhusan}
          </div>
          <AuthForm signIn={true} agreed={true} />
          <AuthButtons />
          <div className="flex justify-center pt-5 px-5">
            {playlistReadyForYouToGetRidOfBoredom}
          </div>
          <Motions />
        </>
      )}
    </>
  )
}

export default Auth
