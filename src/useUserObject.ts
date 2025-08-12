import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from 'src/baseApi/serverbase'
import 'src/global.css'
import supabase from './baseApi/base'

const useUserObject = () => {
  const [userObj, setUserObj] = useState<User | null | undefined>(undefined)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user)
      const reloading = sessionStorage.getItem("reloading")
      if (user === null && !reloading) {
        sessionStorage.setItem("reloading", "true");
        location.reload()
      }
      setUserObj(user)
    })
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)
      console.log(data)
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
  }, [])
  return userObj
}
export default useUserObject
