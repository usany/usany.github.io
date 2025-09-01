import { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import staticImage from 'src/assets/blue.png'
import { dbservice } from 'src/baseApi/serverbase'
import useLargeMedia from 'src/hooks/useLargeMedia'
import { useSelectors } from 'src/hooks/useSelectors'
import Navigation from 'src/pages/core/navigationTop/sideNavigation/Navigation'
import WeatherView from 'src/pages/core/navigationTop/weatherView/WeatherView'
import ToggleTabs from 'src/pages/core/ToggleTabs'
import { changeOnLine } from 'src/stateSlices/onLineSlice'
import { changeProfileColor } from 'src/stateSlices/profileColorSlice'
import { changeProfile } from 'src/stateSlices/profileSlice'
import { changeProfileUrl } from 'src/stateSlices/profileUrlSlice'
import useScroll from '../useScroll'
import NavigationScroll from './NavigationScroll'
import NavigationTopCards from './navigationTopCards/NavigationTopCards'
import NavigationTopLogOut from './navigationTopLogOut/NavigationTopLogOut'
import NavigationTopMessages from './navigationTopMessages/NavigationTopMessages'

interface Props {
  userObj: User | null
}

const NavigationTop = ({ userObj }: Props) => {
  const bottomNavigation = useSelectors((state) => state.bottomNavigation.value)
  const [sideNavigation, setSideNavigation] = useState(false)
  const [renderDelayed, setRenderDelayed] = useState(false)
  setTimeout(() => setRenderDelayed(true), 250)
  const handleSideNavigation = () => {
    setSideNavigation(!sideNavigation)
  }
  const scrollNavigation = useSelectors((state) => state.scrollNavigation.value)
  const userCertificated = useSelectors((state) => state.userCertificated.value)
  const dispatch = useDispatch()
  const largeMedia = useLargeMedia()
  useScroll()
  const scrollLocation =
    ['/', '/add', '/board'].indexOf(location.pathname) === -1
  useEffect(() => {
    window.addEventListener('online', () => {
      dispatch(changeOnLine(true))
    })
    return window.removeEventListener('online', () => {
      dispatch(changeOnLine(true))
    })
  })
  useEffect(() => {
    window.addEventListener('offline', () => {
      dispatch(changeOnLine(false))
    })
    return window.removeEventListener('offline', () => {
      dispatch(changeOnLine(false))
    })
  })
  return (
    <div className="shadow-md fixed z-50 bg-light-2 dark:bg-dark-2 rounded truncate">
      {renderDelayed && (
        <div className="flex justify-between w-screen items-center">
          <Navigation
            userObj={userObj}
            handleSideNavigation={handleSideNavigation}
          />
          <div className={`flex ${!largeMedia && 'flex-col'} items-center`}>
            {largeMedia && scrollNavigation && scrollLocation && (
              <NavigationScroll />
            )}
            <div>
              {bottomNavigation % 2 === 0 && <ToggleTabs />}
              {bottomNavigation === 1 && (
                <>
                  {userCertificated ? (
                    <div className="flex gap-5">
                      <NavigationTopCards />
                      <NavigationTopMessages />
                    </div>
                  ) : (
                    <NavigationTopLogOut />
                  )}
                </>
              )}
            </div>
            {!largeMedia && scrollNavigation && scrollLocation && (
              <NavigationScroll />
            )}
          </div>
          {navigator.onLine ? (
            <WeatherView />
          ) : (
            <div className="w-[145px] h-[64px] px-5"></div>
          )}
        </div>
      )}
    </div>
  )
}

export default NavigationTop
