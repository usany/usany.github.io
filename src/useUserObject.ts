import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from 'src/baseApi/serverbase'
import 'src/global.css'

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
  }, [])
  return userObj
}
export default useUserObject
