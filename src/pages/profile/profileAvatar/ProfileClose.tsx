import Button from '@mui/material/Button'
import { decode } from 'base64-arraybuffer'
import { User } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import supabase from 'src/baseApi/base'
import { dbservice } from 'src/baseApi/serverbase'
import { changeProfile } from 'src/stateSlices/profileSlice'
import { changeProfileUrl } from 'src/stateSlices/profileUrlSlice'
import useTexts from 'src/useTexts'

interface Props {
  userObj: User
  changedImage: object
  handleChangedImage: () => void
  attachment: string
}
const ProfileClose = ({
  userObj,
  changedImage,
  handleChangedImage,
  attachment,
}: Props) => {
  const profile = useSelector((state) => state.profile.value)
  const dispatch = useDispatch()
  const { save } = useTexts()
  const onClick = async () => {
    const docRef = doc(dbservice, `members/${userObj.uid}`)
    // const storage = getStorage()
    // const storageRef = ref(storage, userObj.uid)
    if (attachment) {
      dispatch(changeProfileUrl(attachment))
      dispatch(
        changeProfile({
          ...profile,
          profileImage: true,
          profileImageUrl: attachment,
        }),
      )
      localStorage.setItem('profileImage', JSON.stringify({uid: profile.uid, attachment: attachment}))
      if (attachment.slice(0, 5) === 'data:') {
        // uploadString(storageRef, attachment, 'data_url').then((snapshot) => {
        //   console.log('Uploaded a blob or file!')
        // })
        updateDoc(docRef, { profileImage: true })
        const splitedArray = attachment.split(';base64,')
        const content = splitedArray[0].slice(5)
        const base64 = splitedArray[1]
        console.log(decode(base64))
        const { data, error } = await supabase.storage
          .from('remake')
          .update(userObj.uid, decode(base64), {
            contentType: content,
            cacheControl: '1',
            upsert: true
          })
        if (data) {
          console.log(data)
        } else {
          console.log(error)
        }
      }
    } else {
      // uploadString(storageRef, 'null', 'raw').then((snapshot) => {
      //   console.log('Uploaded a blob or file!')
      // })
      updateDoc(docRef, {
        profileImage: false,
        profileColor: changedImage.profileColor,
        defaultProfile: changedImage.defaultProfile,
      })
      const { data, error } = await supabase.storage
        .from('remake')
        .update(userObj.uid, 'null', {
          upsert: true
        })
      if (data) {
        console.log(data)
      } else {
        console.log(error)
      }
      dispatch(
        changeProfile({
          ...profile,
          profileImage: false,
          defaultProfile: changedImage.defaultProfile,
          profileImageUrl: changedImage.profileImageUrl,
        }),
      )
    }
  }

  return (
    <div>
      {changedImage.changed && (
        <Button
          variant="outlined"
          onClick={() => {
            handleChangedImage({ ...changedImage, changed: false })
            onClick()
          }}
        >
          {save}
        </Button>
      )}
    </div>
  )
}

export default ProfileClose
