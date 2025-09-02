import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelectors } from 'src/hooks/useSelectors'
import Navigations from 'src/pages/core/Navigations'
import NavigationTop from 'src/pages/core/navigationTop/NavigationTop'
import Home from 'src/pages/main/Home'
import Piazza from 'src/pages/piazza/Piazza'
import Profile from 'src/pages/profile/Profile'
import Adds from '../../add/Adds'
import Loadings from './loadings/Loadings'
import Boards from 'src/pages/board/Boards'

const Router = () => {
  // const Home = lazy(() => import('src/pages/main/Home'))
  // const Profile = lazy(() => import('src/pages/profile/Profile'))
  const Ranking = lazy(() => import('src/pages/search/Ranking'))
  const Contact = lazy(() => import('src/pages/contact/Contact'))
  // const Piazza = lazy(() => import('src/pages/piazza/Piazza'))
  const Collection = lazy(() => import('src/pages/collection/Collection'))
  const profile = useSelectors((state) => state.profile.value)
  const userObj = profile
  return (
    <BrowserRouter basename="/">
      <div className="flex flex-col">
        <NavigationTop />
        <div className="pt-16 pb-14">
          <Suspense fallback={<Loadings />}>
            <Routes>
              <Route path="/" element={<Home userObj={userObj} />} />
              <Route path="/add" element={<Adds />} />
              <Route path="/board" element={<Boards />} />
              <Route path="/contact" element={<Contact />} />
              {profile?.certificated && (
                <>
                  <Route
                    path="/profile"
                    element={<Profile userObj={userObj} />}
                  />
                  <Route
                    path="/ranking"
                    element={<Ranking userObj={userObj} />}
                  />
                  <Route
                    path="/contact"
                    element={<Contact userObj={userObj} />}
                  />
                  <Route
                    path="/piazza"
                    element={<Piazza userObj={userObj} />}
                  />
                  <Route path="/collection" element={<Collection />} />
                </>
              )}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
        <Navigations />
      </div>
    </BrowserRouter>
  )
}

export default Router
