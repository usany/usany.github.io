import { Chip } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { deleteUser, User } from 'firebase/auth'
import { deleteDoc, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks'
import { useTexts } from 'src/hooks'

const ProfileMembersDrawersContent = () => {
  const [confirmEmail, setConfirmEmail] = useState(false)
  const [process, setProcess] = useState(false)
  const {
    mail,
    deleteAccount,
    noProcessingCard,
    processingCard,
    toDeleteAccountInputMail,
    canDeleteAccountWhenYouHaveNoProcessingBorrwingOrLendingCard,
  } = useTexts()
  const navigate = useNavigate()
  const profile = useSelectors((state) => state.profile.value)
  const {state} = useLocation()
  const user = state?.element || profile

  const onChange = (event) => {
    const {
      target: { value },
    } = event
    if (value === profile?.email) {
      setConfirmEmail(true)
    } else {
      setConfirmEmail(false)
    }
  }
  const delist = async () => {
    if (process && confirmEmail) {
      await deleteDoc(doc(dbservice, `members/${profile?.uid}`))
      deleteUser(user)
        .then(() => {
          console.log(user)
          // User deleted.
        })
        .catch((error) => {
          console.log(error)
          // An error ocurred
          // ...
        })
      navigate('/')
    } else {
      alert('Cannot delete')
    }
  }
  useEffect(() => {
    const createdCards = user.userData?.createdCards
    const connectedCards = user.userData?.connectedCards
    const createdNumber = createdCards?.length || 0
    const connectedNumber = connectedCards?.length || 0
    if (createdNumber === 0 && connectedNumber === 0) {
      setProcess(true)
    } else {
      setProcess(false)
    }
  }, [user])

  return (
    <>
      <div className="p-5">
        {canDeleteAccountWhenYouHaveNoProcessingBorrwingOrLendingCard}
        <div className="flex justify-center">
          <Chip
            label={process ? noProcessingCard : processingCard}
            sx={{ bgcolor: process ? '#7fc4bc' : '#e76e50', color: 'white' }}
          />
        </div>
        <div>{toDeleteAccountInputMail}</div>
      </div>
      <div className="flex flex-col justify-center p-5 gap-5">
        <TextField label={mail} onChange={onChange} />
        {process && confirmEmail ? (
          <Button variant="outlined" onClick={delist}>
            {deleteAccount}
          </Button>
        ) : (
          <Button variant="outlined" disabled>
            {deleteAccount}
          </Button>
        )}
      </div>
    </>
  )
}

export default ProfileMembersDrawersContent
