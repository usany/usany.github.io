import { useState, useEffect } from 'react'
import Menu from 'src/pages/Menu'
import Notice from 'src/pages/Notice'
import Auth from 'src/pages/Auth'
import Add from 'src/pages/Add'
import { SwipeableViews } from "src/navigate/SwipeableViews";
import { useBottomNavigationStore } from 'src/store'

function Home({ userObj, value, setValue, counter, setCounter, tmpCounter, piazzaSwitch, newMessage, setNewMessage }) {
    const bottomNavigation = useBottomNavigationStore((state) => state.bottomNavigation)
    const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)

    useEffect(() => {
        if (bottomNavigation === 5) {
            handleBottomNavigation(1)
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
                    >
                        <div>
                            <Add userObj={userObj} action={0}/>
                        </div>
                        <div>
                            <Add userObj={userObj} action={1}/>
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
                    >
                        <div>
                            <Notice userObj={userObj} setValue={setValue} counter={counter} setCounter={setCounter}/>
                        </div>
                        <div>
                            <Notice userObj={userObj} setValue={setValue} counter={counter} setCounter={setCounter}/>
                        </div>
                    </SwipeableViews>
                    </div>
                }
            </div>
            }
            {!userObj &&
                <>
                    {bottomNavigation === 0 &&
                        <Notice userObj={userObj} setValue={setValue} counter={counter} setCounter={(newState) => setCounter(newState)} />
                    }
                    {bottomNavigation === 1 &&
                        <Auth setValue={setValue}/>
                    }
                    {bottomNavigation === 2 &&
                        <Notice userObj={userObj} setValue={setValue} counter={counter} setCounter={(newState) => setCounter(newState)} />
                    }
                </>
            }
        </div>
    )
}

export default Home