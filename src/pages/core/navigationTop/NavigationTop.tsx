import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useLargeMedia from 'src/hooks/useLargeMedia'
import { useSelectors } from 'src/hooks'
import Navigation from 'src/pages/core/navigationTop/sideNavigation/Navigation'
import WeatherView from 'src/pages/core/navigationTop/weatherView/WeatherView'
import ToggleTabs from 'src/pages/core/ToggleTabs'
import { changeOnLine } from 'src/stateSlices/onLineSlice'
import useScroll from '../useScroll'
import NavigationScroll from './NavigationScroll'
import NavigationTopCards from './navigationTopCards/NavigationTopCards'
import NavigationTopLogOut from './navigationTopLogOut/NavigationTopLogOut'
import NavigationTopMessages from './navigationTopMessages/NavigationTopMessages'

const NavigationTop = () => {
  const bottomNavigation = useSelectors((state) => state.bottomNavigation.value)
  const [sideNavigation, setSideNavigation] = useState(false)
  const [renderDelayed, setRenderDelayed] = useState(false)
  setTimeout(() => setRenderDelayed(true), 250)
  const handleSideNavigation = () => {
    setSideNavigation(!sideNavigation)
  }
  const scrollNavigation = useSelectors((state) => state.scrollNavigation.value)
  const profile = useSelectors((state) => state.profile.value)
  const largeMedia = useLargeMedia()
  useScroll()
  const scrollLocation =
    ['/', '/add', '/board'].indexOf(location.pathname) === -1
  return (
    <div className="shadow-md fixed z-50 bg-light-2 dark:bg-dark-2 rounded truncate">
      {renderDelayed && (
        <div className="flex justify-between w-screen items-center">
          <Navigation handleSideNavigation={handleSideNavigation} />
          <div className={`flex ${!largeMedia && 'flex-col'} items-center`}>
            {scrollNavigation && scrollLocation && <NavigationScroll />}
            <div>
              {bottomNavigation % 2 === 0 && <ToggleTabs />}
              {bottomNavigation === 1 && (
                <>
                  {profile?.certificated ? (
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
