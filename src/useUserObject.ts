import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from 'src/baseApi/serverbase'
import 'src/global.css'
import { useSelectors } from './hooks/useSelectors'
import { changeChangingUser } from './stateSlices/changingUserSlice'

const useUserObject = () => {
  const [userObj, setUserObj] = useState<User | null | undefined>(undefined)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserObj(user)
    })
  }, [])
  return userObj
}
export default useUserObject
