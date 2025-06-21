import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from 'src/baseApi/serverbase'
import 'src/global.css'
import { useSelectors } from './hooks/useSelectors'
import { changeChangingUser } from './stateSlices/changingUserSlice'

const useUserObject = () => {
  const [userObj, setUserObj] = useState<User | null | undefined>(undefined)
  const changingUser = useSelectors(state => state.changingUser.value)
  const dispatch = useDispatch()
  console.log(changingUser)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user)
      setUserObj(user)
      dispatch(changeChangingUser(false))
    })
    if (changingUser) {
    }
  }, [])
  return userObj
}
export default useUserObject
