import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import useCardsBackground from 'src/hooks/useCardsBackground'
import { useSelectors, useTexts } from 'src/hooks'

const ProfileForm = () => {
  const [profileChangeConfirmed, setProfileChangeConfirmed] = useState(false)
  const [newDisplayName, setNewDisplayName] = useState('')
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)
  const { colorOne, colorTwo } = useCardsBackground()
  const {changeUserName, readyToChange, currentName, existingName, needAnInput, change} = useTexts()

  useEffect(() => {
    if (profile?.displayName) {
      setNewDisplayName(profile.displayName)
    }
  }, [])
  const onSubmit = async (event) => {
    event.preventDefault()
    if (newDisplayName === '') {
      alert('입력이 필요합니다')
    } else {
      const tmp = query(collection(dbservice, `members`))
      const querySnapshot = await getDocs(tmp)
      let profileConfirmed = true
      querySnapshot.forEach((doc) => {
        if (newDisplayName === doc.data().displayName) {
          alert('중복 확인이 필요합니다')
          profileConfirmed = false
        }
      })
      if (!profileConfirmed) {
        alert('중복 확인을 완료해 주세요')
      } else {
        const data = doc(dbservice, `members/${profile?.uid}`)
        await updateDoc(data, { displayName: newDisplayName })
          .then(() => {
            alert('교체 완료')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
  const onChange = async (event) => {
    const {
      target: { value },
    } = event
    setNewDisplayName(value)
    const tmp = query(collection(dbservice, `members`))
    const querySnapshot = await getDocs(tmp)
    let profileConfirmed = true
    querySnapshot.forEach((doc) => {
      if (value === doc.data().displayName) {
        profileConfirmed = false
      }
    })
    if (profileConfirmed && value) {
      setProfileChangeConfirmed(true)
    } else {
      setProfileChangeConfirmed(false)
    }
  }

  return (
    <form id="profile" onSubmit={onSubmit}>
      <div className="flex justify-center pt-10">
        <div className="flex flex-col">
          <TextField
            sx={{ bgcolor: colorOne, borderRadius: '5px' }}
            label={changeUserName}
            placeholder="유저 이름 바꾸기"
            value={newDisplayName}
            type="text"
            onChange={onChange}
          />
          <div className="flex justify-start">
            {profileChangeConfirmed ? (
              <div className="flex">
                <div className="pt-1">
                  {readyToChange}
                </div>
              </div>
            ) : (
              <div className="flex pt-1">
                {newDisplayName ? (
                  <>
                    {newDisplayName === profile?.displayName ? currentName : existingName}
                  </>
                ) : (
                  <div className="flex pt-1">
                    {needAnInput}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Button
          sx={{ bgcolor: colorTwo, height: '56px' }}
          variant="outlined"
          form="profile"
          type="submit"
          disabled={!profileChangeConfirmed}
        >
          {change}
        </Button>
      </div>
    </form>
  )
}

export default ProfileForm
