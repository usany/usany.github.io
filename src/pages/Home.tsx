import { useState, useEffect } from 'react'
import Menu from 'src/pages/Menu'
import Notice from 'src/pages/Notice'
import Auth from 'src/pages/Auth'
import Add from 'src/pages/Add'
// import Navigations from 'src/navigate/Navigations'
// import Avatars from 'src/muiComponents/Avatars'
// import { dbservice } from 'src/baseApi/serverbase'
// import Navigation from 'src/navigate/Navigation'
import { SwipeableViews } from "src/navigate/SwipeableViews";

function Home({ isLoggedIn, userObj, value, setValue, counter, setCounter, tmpCounter, bottomNavigation, setBottomNavigation, piazzaSwitch, newMessage, setNewMessage }) {
    // const [childStyle, setChildStyle] = useState<React.CSSProperties>({});
    // const [points, setPoints] = useState<number>(0)
    // const checking = () => {
    //     setCheck(!check)
    // }
    
    // useEffect(() => {
    //     onSnapshot(query(doc(dbservice, `members/${userObj.uid}`)), (snapshot) => {
    //         if (isLoggedIn) {
    //             const number = snapshot.data().points
    //             setPoints(number)
    //         }
    //     })
    // }, [])
    useEffect(() => {
        if (bottomNavigation === 5) {
            setBottomNavigation(1)
        }
    })

    return (
        <div>
            {userObj && 
            <div>
                {bottomNavigation === 1 && 
                    <Menu userObj={userObj} counter={counter} setCounter={setCounter} setValue={setValue} tmpCounter={tmpCounter} piazzaSwitch={piazzaSwitch} newMessage={newMessage} setNewMessage={setNewMessage} />
                }
                {[0].indexOf(bottomNavigation) !== -1 && 
                    <div>
                    <SwipeableViews
                        index={value}
                        onIndexChange={setValue}
                        num={1}
                        // initial={[0, 4]}
                        // setInitial={setInitial}
                    >
                        <div>
                            <Add userObj={userObj} valuing={0}/>
                        </div>
                        <div>
                            <Add userObj={userObj} valuing={1}/>
                        </div>
                    </SwipeableViews>
                    </div>
                }
                {[2].indexOf(bottomNavigation) !== -1 && 
                    <div>
                    <SwipeableViews
                        index={value}
                        onIndexChange={setValue}
                        num={1}
                        // initial={[1, 3]}
                    >
                        <div>
                            <Notice userObj={userObj} valuing={1} setValue={setValue} counter={counter} setCounter={setCounter}/>
                        </div>
                        <div>
                            <Notice userObj={userObj} valuing={3} setValue={setValue} counter={counter} setCounter={setCounter}/>
                        </div>
                    </SwipeableViews>
                    </div>
                }
            </div>
            }
            {!userObj &&
                <>
                    {bottomNavigation === 0 &&
                        <Notice userObj={userObj} valuing={1} setValue={setValue} counter={counter} setCounter={(newState) => setCounter(newState)} />
                    }
                    {bottomNavigation === 1 &&
                        <Auth setValue={setValue}/>
                    }
                    {bottomNavigation === 2 &&
                        <Notice userObj={userObj} valuing={4} setValue={setValue} counter={counter} setCounter={(newState) => setCounter(newState)} />
                    }
                </>
            }
        </div>
    )
}

export default Home