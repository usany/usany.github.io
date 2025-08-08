import { User } from 'firebase/auth'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelectors } from 'src/hooks/useSelectors'
import Navigations from 'src/pages/core/Navigations'
import NavigationTop from 'src/pages/core/navigationTop/NavigationTop'
import Home from 'src/pages/main/Home'
import Piazza from 'src/pages/piazza/Piazza'
import Profile from 'src/pages/profile/Profile'
import Adds from '../../add/Adds'
import Board from '../../board/Board'
import Loadings from './loadings/Loadings'
interface Props {
  userObj: User | null
}

const Router = ({ userObj }: Props) => {
  // const Home = lazy(() => import('src/pages/main/Home'))
  // const Profile = lazy(() => import('src/pages/profile/Profile'))
  const Ranking = lazy(() => import('src/pages/search/Ranking'))
  const Contact = lazy(() => import('src/pages/contact/Contact'))
  // const Piazza = lazy(() => import('src/pages/piazza/Piazza'))
  const Collection = lazy(() => import('src/pages/collection/Collection'))
  const userCertificated = useSelectors((state) => state.userCertificated.value)
  return (
    <BrowserRouter basename="/">
      <div className="flex flex-col">
        <NavigationTop userObj={userObj} />
        <div className="pt-16 pb-14">
          <Suspense fallback={<Loadings />}>
            <Routes>
              <Route path="/" element={<Home userObj={userObj} />} />
              <Route path="/add" element={<Adds userObj={userObj} />} />
              <Route path="/board" element={<Board userObj={userObj} />} />
              <Route path="/contact" element={<Contact userObj={userObj} />} />
              {userObj && userCertificated && (
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
                  <Route
                    path="/collection"
                    element={<Collection userObj={userObj} />}
                  />
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
