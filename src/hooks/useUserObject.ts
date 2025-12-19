import { useEffect, useRef } from 'react'
import { auth } from 'src/baseApi/serverbase'
import 'src/global.css'
import { useDispatch } from 'react-redux'
import { doc, getDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { changeProfile } from 'src/stateSlices/profileSlice'
import useSelectors from './useSelectors'
import { getRedirectResult } from 'firebase/auth'
import { onSocialClick } from 'src/baseApi/serverbase'

// Global flag to ensure getRedirectResult is only called once across all component instances
let redirectResultHandled = false

const useUserObject = () => {
  const dispatch = useDispatch()
  const hasCheckedRedirect = useRef(false)
  const onLine = useSelectors((state) => state.onLine.value)
  
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

  useEffect(() => {
    // Handle redirect result from OAuth providers - only once per page load
    // This MUST run regardless of online status to capture the redirect
    if (!hasCheckedRedirect.current && !redirectResultHandled) {
      hasCheckedRedirect.current = true
      redirectResultHandled = true
      
      console.log('=== REDIRECT CHECK START ===')
      console.log('Current URL:', window.location.href)
      console.log('URL has "code" param?', window.location.href.includes('code='))
      console.log('URL has "state" param?', window.location.href.includes('state='))
      console.log('Auth instance:', auth)
      
      getRedirectResult(auth)
        .then(async (result) => {
          console.log('Redirect result:', result)
          console.log('Result user:', result?.user)
          console.log('Result credential:', result?.user ? 'User exists' : 'No user')
          
          if (result?.user) {
            console.log('Processing redirect result for user:', result.user.uid)
            await onSocialClick(result)
            setProfile(result.user.uid)
          } else {
            console.log('No redirect result found (this is normal if not redirecting)')
          }
        })
        .catch((error) => {
          console.error('Error code:', error.code)
          console.error('Error message:', error.message)
        })
    }

    // Only set up auth listener if online
    if (!onLine) {
      dispatch(changeProfile(null))
      return
    }
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Auth state changed:', user)
      if (user?.uid) {
        setProfile(user?.uid)
      } else {
        dispatch(changeProfile(null))
      }
    })

    return () => unsubscribe()
  }, [onLine])
}
export default useUserObject
