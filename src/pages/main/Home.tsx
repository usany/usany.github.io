import { doc, getDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks'
import Auth from 'src/pages/main/auth/Auth'
import Menu from 'src/pages/main/menu/Menu'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { changeUserCertificated } from 'src/stateSlices/userCertificatedSlice'

function Home() {
  const bottomNavigation = useSelectors((state) => state.bottomNavigation.value)
  const profile = useSelectors((state) => state.profile.value)
  const dispatch = useDispatch()
  useEffect(() => {
    if (bottomNavigation === 5) {
      dispatch(changeBottomNavigation(1))
    }
  }, [profile])
  useEffect(() => {
    const userCertification = async () => {
      const userRef = doc(dbservice, `members/${profile?.uid}`)
      const userDoc = await getDoc(userRef)
      const { certificated } = userDoc.data()
      dispatch(changeUserCertificated(certificated))
    }
    if (profile) {
      userCertification()
    }
  }, [profile])
  return (
    <>
      {profile?.certificated ? (
        <>
          {/* {bottomNavigation === 0 && (
            <SwipeableViews>
              <Add userObj={userObj} borrow={true} />
              <Add userObj={userObj} borrow={false} />
            </SwipeableViews>
          )} */}
          {bottomNavigation === 1 && <Menu userObj={profile} />}
          {/* {bottomNavigation === 2 && <Board userObj={userObj} borrow={true} />} */}
        </>
      ) : (
        <>
          {/* {bottomNavigation === 0 && (
            <SwipeableViews>
              <Layout borrow={true} />
              <Layout borrow={false} />
            </SwipeableViews>
          )} */}
          {bottomNavigation === 1 && <Auth userObj={profile} />}
          {/* {bottomNavigation === 2 && (
            <SwipeableViews>
              <LayoutBoard borrow={true} />
              <LayoutBoard borrow={false} />
            </SwipeableViews>
          )} */}
        </>
      )}
    </>
  )
}

export default Home
