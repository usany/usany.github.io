import { useState, useEffect, useRef, useMemo, useLayoutEffect, useContext, useReducer } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'src/pages/Home'
import Profile from 'src/pages/Profile'
import Ranking from 'src/pages/Ranking'
import Specific from 'src/pages/Specific'
import Contact from 'src/pages/Contact'
import Piazza from 'src/pages/Piazza'
import Chatting from 'src/pages/Chatting'
import Chats from 'src/pages/Chats'
import Header from 'src/navigate/Header'
import Navigations from 'src/navigate/Navigations'
import { User } from 'firebase/auth'

interface Props {
    userObj: User | null,
}
  
const Router = ({ userObj }: Props) => {

    return (
        <BrowserRouter>
            <div className='flex flex-col'>
                <Header userObj={userObj} />
                <div>
                    <Routes>
                        {userObj ? 
                            <Route>
                                <Route path='/' Component={() => <Home userObj={userObj} />} />
                                <Route path='/profile' Component={() => <Profile userObj={userObj} />} />
                                <Route path='/ranking' Component={() => <Ranking userObj={userObj}/>} />
                                <Route path='/specific' Component={() => <Specific userObj={userObj} />} />
                                <Route path='/contact' Component={() => <Contact userObj={userObj} />} />
                                <Route path='/piazza' Component={() => <Piazza userObj={userObj} />} />
                                <Route path='/chatting' Component={() => <Chatting userObj={userObj} />} />
                                {/* <Route path='/actions' Component={() => <Actions userObj={userObj} />} />
                                <Route path='/allies' Component={() => <Allies />} />
                                <Route path='/points' Component={() => <Points />} /> */}
                                <Route path='/chats' Component={() => <Chats userObj={userObj} />} />
                            </Route>
                            : 
                            <Route>
                                <Route path='/' Component={() => <Home userObj={userObj} />} />
                                <Route path='/specific' Component={() => <Specific userObj={userObj} />} />
                            </Route>
                        }
                    </Routes>
                </div>
                <div className='flex justify-center h-52 p-5'>
                    this is footer
                    administration: ahncb@khu.ac.kr
                    Made in KHU
                </div>
                <Navigations userObj={userObj} />
            </div>
        </BrowserRouter>
    )
}

export default Router