import { useEffect } from 'react'
import { auth } from 'src/baseApi/serverbase'
import 'src/global.css'
import { useDispatch } from 'react-redux'
import { doc, getDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { changeProfile } from 'src/stateSlices/profileSlice'
import useSelectors from './useSelectors'
import { getRedirectResult } from 'firebase/auth'

const useUserObject = () => {
  const dispatch = useDispatch()
  const setProfile = async (uid: string) => {
    const docRef = doc(dbservice, `members/${uid}`)
    const docSnap = await getDoc(docRef)
    const userData = docSnap.data()
    const profileImage = JSON.parse(localStorage.getItem(userData?.uid) || '{}')
    const newProfile = userData
    if (profileImage?.attachment && newProfile) {
      newProfile.profileImageUrl = profileImage.attachment
    }
    setTimeout(() => {
      dispatch(changeProfile(newProfile))
    }, 200)
  }
  const onLine = useSelectors((state) => state.onLine.value)
  if (!onLine) {
    dispatch(changeProfile(null))
    return null
  }
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth)
        const user = result?.user
        if (user?.uid) {
          await setProfile(user.uid)
        } else {
          dispatch(changeProfile(null))
        }
      } catch (error) {
        console.error('Error handling redirect result', error)
      }
    }
    handleRedirectResult()
    // auth.onAuthStateChanged((user) => {
    //   const reloading = sessionStorage.getItem('reloading')
    //   if (user === null && !reloading) {
    //     sessionStorage.setItem('reloading', 'true')
    //     location.reload()
    //   }
    //   if (user?.uid) {
    //     setProfile(user?.uid)
    //   } else {
    //     dispatch(changeProfile(null))
    //   }
    // })
  }, [])
}
export default useUserObject
