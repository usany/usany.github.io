import { useEffect } from 'react'
import { auth, onSocialClick } from 'src/baseApi/serverbase'
import 'src/global.css'
import { useDispatch } from 'react-redux'
import { doc, getDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { changeProfile } from 'src/stateSlices/profileSlice'
import useSelectors from './useSelectors'
import { getRedirectResult } from 'firebase/auth'

const useUserObject = () => {
  const profile = useSelectors((state) => state.profile.value)
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
    if (newProfile) {
      console.log(newProfile)
      setTimeout(() => {
        dispatch(changeProfile(newProfile))
      }, 200)
    }
  }
  const onLine = useSelectors((state) => state.onLine.value)
  if (!onLine) {
    dispatch(changeProfile(null))
    return null
  }
  console.log(profile)
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth)
        console.log(result)
        if (result) {
          onSocialClick(result)
        }
        // const user = result?.user
        auth.onAuthStateChanged((user) => {
          if (user?.uid) {
            console.log(user?.uid)
                        setTimeout(() => {
            setProfile(user?.uid)
                        }, 5000)
          } else {
            setTimeout(() => {
              dispatch(changeProfile(null))
            }, 5000)
          }
        })
        // if (!result) {
        //   dispatch(changeProfile(null))
        // }
        // if (user?.uid) {
        //   await setProfile(user.uid)
        // } else {
        //   dispatch(changeProfile(null))
        // }
      } catch (error) {
        console.error('Error handling redirect result', error)
      }
    }
    if (location.hostname === 'khusan.co.kr') {
      handleRedirectResult()
    }
    auth.onAuthStateChanged((user) => {
      console.log(user)
      if (user?.uid) {
        console.log(user?.uid)
                                setTimeout(() => {
        setProfile(user?.uid)
                }, 5000)
      } else {
        setTimeout(() => {
          dispatch(changeProfile(null))
        }, 5000)
      }
    })
  }, [])
}
export default useUserObject
