import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loadings from 'src/pages/core/loadings/Loadings'
import Header from 'src/navigate/Header'
import Navigations from 'src/navigate/Navigations'
import { User } from 'firebase/auth'

interface Props {
    userObj: User | null,
}

const Router = ({ userObj }: Props) => {
    const Home = lazy(() => import("src/pages/main/Home"))
    const Profile = lazy(() => import("src/pages/profile/Profile"))
    const Ranking = lazy(() => import("src/pages/search/Ranking"))
    const Contact = lazy(() => import("src/pages/contact/Contact"))
    const Piazza = lazy(() => import("src/pages/piazza/Piazza"))
    
    return (
        <BrowserRouter>
            <div className='flex flex-col'>
                <Header userObj={userObj} />
                <div>
                    <Suspense fallback={<Loadings />}>
                        <Routes>
                            {userObj ? 
                                <Route>
                                    <Route path='/' Component={() => <Home userObj={userObj} />} />
                                    <Route path='/profile' Component={() => <Profile userObj={userObj}/>} />
                                    <Route path='/ranking' Component={() => <Ranking userObj={userObj}/>} />
                                    <Route path='/contact' Component={() => <Contact userObj={userObj} />} />
                                    <Route path='/piazza' Component={() => <Piazza userObj={userObj} />} />
                                </Route>
                                : 
                                <Route>
                                    <Route path='/' Component={() => <Home userObj={userObj} />} />
                                </Route>
                            }
                        </Routes>
                    </Suspense>
                </div>
                <div className='h-[56px]'>&emsp;</div>
                <Navigations userObj={userObj} />
            </div>
        </BrowserRouter>
    )
}

export default Router