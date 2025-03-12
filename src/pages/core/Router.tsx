import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Home from 'src/pages/Home'
// import Profile from 'src/pages/profile/Profile'
// import Ranking from 'src/pages/Ranking'
// import Specific from 'src/pages/Specific'
// import Contact from 'src/pages/Contact'
// import Piazza from 'src/pages/Piazza'
// import Chatting from 'src/pages/Chatting'
// import Chats from 'src/pages/Chats'
import { User } from 'firebase/auth'
import Header from 'src/navigate/Header'
import Navigations from 'src/navigate/Navigations'
import Loadings from 'src/pages/core/loadings/Loadings'

interface Props {
  userObj: User | null
}

const Router = ({ userObj }: Props) => {
  const Home = lazy(() => import('src/pages/main/Home'))
  const Profile = lazy(() => import('src/pages/profile/Profile'))
  const Ranking = lazy(() => import('src/pages/search/Ranking'))
  // const Specific = lazy(() => import("src/pages/Specific"))
  const Contact = lazy(() => import('src/pages/contact/Contact'))
  const Piazza = lazy(() => import('src/pages/piazza/Piazza'))
  // console.log('sample')
  return (
    <BrowserRouter>
      <div className="flex flex-col">
        <Header userObj={userObj} />
        <div className="">
          <Suspense fallback={<Loadings />}>
            <Routes>
              {userObj ? (
                <Route>
                  <Route
                    path="/"
                    Component={() => <Home userObj={userObj} />}
                  />
                  <Route
                    path="/add"
                    Component={() => <Home userObj={userObj} />}
                  />
                  <Route
                    path="/board"
                    Component={() => <Home userObj={userObj} />}
                  />
                  <Route
                    path="/profile"
                    element={<Profile userObj={userObj} />}
                  />
                  {/* <Route
                    path="/profile/:id"
                    element={<Profile userObj={userObj} />}
                  /> */}
                  <Route
                    path="/ranking"
                    Component={() => <Ranking userObj={userObj} />}
                  />
                  <Route
                    path="/specific"
                    Component={() => <Specific userObj={userObj} />}
                  />
                  <Route
                    path="/contact"
                    Component={() => <Contact userObj={userObj} />}
                  />
                  <Route
                    path="/piazza"
                    Component={() => <Piazza userObj={userObj} />}
                  />
                </Route>
              ) : (
                <Route>
                  <Route
                    path="/"
                    Component={() => <Home userObj={userObj} />}
                  />
                  <Route
                    path="/specific"
                    Component={() => <Specific userObj={userObj} />}
                  />
                </Route>
              )}
            </Routes>
          </Suspense>
        </div>
        {/* <div className='flex justify-center h-52 p-5'>
                    this is footer
                    administration: ahncb@khu.ac.kr
                    Made in KHU
                </div> */}
        <div className="h-[56px]">&emsp;</div>
        <Navigations userObj={userObj} />
      </div>
    </BrowserRouter>
  )
}

export default Router
