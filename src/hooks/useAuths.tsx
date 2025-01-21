import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from 'src/baseApi/serverbase'
import { User } from 'firebase/auth'
// import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'

export default function useObj() {
  const [userObj, setUserObj] = useState<User | null>(null)
  const [initial, setInitial] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
      auth.onAuthStateChanged((user) => {
        setUserObj(user)
        // dispatch(changeBottomNavigation(1))
        setInitial(true)
      })
  }, [])
  
  return ({userObj, initial})
}
