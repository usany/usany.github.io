import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from 'src/baseApi/serverbase'
import 'src/global.css'
// import supabase from './baseApi/base'
import { useDispatch } from 'react-redux'
import { doc, getDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { changeProfileColor } from 'src/stateSlices/profileColorSlice'
import { changeProfile } from 'src/stateSlices/profileSlice'
import { changeProfileUrl } from 'src/stateSlices/profileUrlSlice'
import { useGetCurrentUserQuery } from './stateSlices/baseQuery'

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
    // const userColor = docSnap.data()?.profileColor || '#2196f3'
    // const userImage = docSnap.data()?.profileImageUrl || 'null'
    // const userProfileImage = docSnap.data()?.profileImage || false
    // const userDefaultProfile = docSnap.data()?.defaultProfile || 'null'
    // dispatch(changeProfileColor(userColor))
    // if (userProfileImage) {
    //   dispatch(changeProfileUrl(userImage))
    // } else {
    //   dispatch(changeProfileUrl(userDefaultProfile))
    // }
  }
  useEffect(() => {
    const reloading = sessionStorage.getItem('reloading')
    auth.onAuthStateChanged((user) => {
      if (user === null && !reloading) {
        sessionStorage.setItem('reloading', 'true')
        location.reload()
      }
      setProfile(user?.uid)
    })
  }, [])
}
export default useUserObject
