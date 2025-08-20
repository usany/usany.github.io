import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from 'src/baseApi/serverbase'
import 'src/global.css'
<<<<<<< HEAD
import supabase from './baseApi/base'
=======
// import supabase from './baseApi/base'
import { useDispatch } from 'react-redux'
import { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { dbservice } from 'src/baseApi/serverbase'
import { changeProfileColor } from 'src/stateSlices/profileColorSlice'
import { changeProfile } from 'src/stateSlices/profileSlice'
import { changeProfileUrl } from 'src/stateSlices/profileUrlSlice'
>>>>>>> main

const useUserObject = () => {
  const [userObj, setUserObj] = useState<User | null | undefined>(undefined)
  const dispatch = useDispatch()
  const setProfile = async (uid) => {
    const docRef = doc(dbservice, `members/${uid}`)
    const docSnap = await getDoc(docRef)
    const userData = docSnap.data()
    dispatch(changeProfile(userData))
    const userColor = docSnap.data()?.profileColor || '#2196f3'
    const userImage = docSnap.data()?.profileImageUrl || 'null'
    const userProfileImage = docSnap.data()?.profileImage || false
    const userDefaultProfile = docSnap.data()?.defaultProfile || 'null'
    dispatch(changeProfileColor(userColor))
    console.log(uid)
    if (userProfileImage) {
      dispatch(changeProfileUrl(userImage))
    } else {
      dispatch(changeProfileUrl(userDefaultProfile))
    }
    setUserObj(userData !== undefined ? userData : null)
  }
  useEffect(() => {
    const reloading = sessionStorage.getItem('reloading')
    auth.onAuthStateChanged((user) => {
<<<<<<< HEAD
      console.log(user)
      const reloading = sessionStorage.getItem('reloading')
=======
      // const reloading = sessionStorage.getItem('reloading')
>>>>>>> main
      if (user === null && !reloading) {
        sessionStorage.setItem('reloading', 'true')
        location.reload()
      }
      setProfile(user?.uid)
      console.log(user)
      setUserObj(user)
    })
<<<<<<< HEAD
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)
      const user = { uid: data.subscription.id }
      setUserObj(user)
      console.log(data.subscription.id)
      if (event === 'INITIAL_SESSION') {
        // handle initial session
      } else if (event === 'SIGNED_IN') {
        // handle sign in event
      } else if (event === 'SIGNED_OUT') {
        // handle sign out event
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
      }
    })
=======
    // const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
    //   console.log(event, session)
    //   console.log(data)
    //   if (event === 'PASSWORD_RECOVERY') {
    //     const newPassword = prompt(
    //       'What would you like your new password to be?',
    //     )
    //     const { data, error } = await supabase.auth.updateUser({
    //       password: newPassword,
    //     })
    //     if (data) alert('Password updated successfully!')
    //     if (error) alert('There was an error updating your password.')
    //   }
    //   const user = { uid: session.user.id }
    //   if (data === null && !reloading) {
    //     sessionStorage.setItem('reloading', 'true')
    //     location.reload()
    //   }
    //   setProfile(user?.uid)
    // })
>>>>>>> main
  }, [])
  return userObj
}
export default useUserObject
