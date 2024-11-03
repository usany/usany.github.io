import { useState, useEffect } from 'react'
import Menu from 'src/pages/Menu'
import Notice from 'src/pages/Notice'
import Auth from 'src/pages/Auth'
import Add from 'src/pages/Add'
import { SwipeableViews } from "src/navigate/SwipeableViews";
import { useBottomNavigationStore, useTabsStore } from 'src/store'

function Home({ userObj, counter, setCounter, tmpCounter, piazzaSwitch, newMessage, setNewMessage }) {
    const bottomNavigation = useBottomNavigationStore((state) => state.bottomNavigation)
    const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)
    const toggleTabs = useTabsStore((state) => state.toggleTabs)
    const handleToggleTabs = useTabsStore((state) => state.handleToggleTabs)

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
                    <Menu userObj={userObj} counter={counter} setCounter={setCounter} tmpCounter={tmpCounter} piazzaSwitch={piazzaSwitch} newMessage={newMessage} setNewMessage={setNewMessage} />
                }
                {[0].indexOf(bottomNavigation) !== -1 && 
                    <div>
                    <SwipeableViews
                        index={toggleTabs}
                        onIndexChange={handleToggleTabs}
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
                        index={toggleTabs}
                        onIndexChange={handleToggleTabs}
                        num={1}
                    >
                        <div>
                            <Notice userObj={userObj} counter={counter} setCounter={setCounter}/>
                        </div>
                        <div>
                            <Notice userObj={userObj} counter={counter} setCounter={setCounter}/>
                        </div>
                    </SwipeableViews>
                    </div>
                }
            </div>
            }
            {!userObj &&
                <>
                    {bottomNavigation === 0 &&
                        <Notice userObj={userObj} counter={counter} setCounter={(newState) => setCounter(newState)} />
                    }
                    {bottomNavigation === 1 &&
                        <Auth />
                    }
                    {bottomNavigation === 2 &&
                        <Notice userObj={userObj} counter={counter} setCounter={(newState) => setCounter(newState)} />
                    }
                </>
            }
        </div>
    )
}

export default Home