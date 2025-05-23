import { User } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dbservice, messaging, storage } from 'src/baseApi/serverbase'
import { changeProfileColor } from 'src/stateSlices/profileColorSlice'
import { changeProfileUrl } from 'src/stateSlices/profileUrlSlice'
const useSetProfile = (userObj: User) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const setProfile = async () => {
      const docRef = doc(dbservice, `members/${userObj?.uid}`)
      const docSnap = await getDoc(docRef)
      const userColor = docSnap.data()?.profileColor || '#2196f3'
      const userImage = docSnap.data()?.profileImageUrl || 'null'
      const userProfileImage = docSnap.data()?.profileImage || false
      const userDefaultProfile = docSnap.data()?.defaultProfile || 'null'
      dispatch(changeProfileColor(userColor))
      if (userProfileImage) {
        dispatch(changeProfileUrl(userImage))
      } else {
        dispatch(changeProfileUrl(userDefaultProfile))
      }
    }
    setProfile()
  }, [userObj])
}
export default useSetProfile
