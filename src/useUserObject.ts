import { useEffect } from 'react'
import { auth } from 'src/baseApi/serverbase'
import 'src/global.css'
import { useDispatch } from 'react-redux'
import { doc, getDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { changeProfile } from 'src/stateSlices/profileSlice'

const useUserObject = () => {
  const dispatch = useDispatch()
  const setProfile = async (uid) => {
    if (uid) {
      const docRef = doc(dbservice, `members/${uid}`)
      const docSnap = await getDoc(docRef)
      const userData = docSnap.data()
      const profileImage = JSON.parse(localStorage.getItem(userData.uid) || '{}')
      const newProfile = userData
      if (profileImage?.attachment && newProfile) {
        newProfile.profileImageUrl = profileImage.attachment
      }
      dispatch(changeProfile(newProfile))
    } else {
      dispatch(changeProfile(null))
    }
  }
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // const reloading = sessionStorage.getItem('reloading')
      // if (user === null && !reloading) {
      //   sessionStorage.setItem('reloading', 'true')
      //   location.reload()
      // }
      setProfile(user?.uid)
    })
  }, [])
}
export default useUserObject
