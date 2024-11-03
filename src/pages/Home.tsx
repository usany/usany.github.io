import { useState, useEffect } from 'react'
import Menu from 'src/pages/Menu'
import Notice from 'src/pages/Notice'
import Auth from 'src/pages/Auth'
import Add from 'src/pages/Add'
import { SwipeableViews } from "src/navigate/SwipeableViews";
<<<<<<< HEAD
import { useBottomNavigationStore, useTabsStore } from 'src/store'

function Home({ userObj, counter, setCounter, tmpCounter, piazzaSwitch, newMessage, setNewMessage }) {
    const bottomNavigation = useBottomNavigationStore((state) => state.bottomNavigation)
    const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)
    const toggleTabs = useTabsStore((state) => state.toggleTabs)
    const handleToggleTabs = useTabsStore((state) => state.handleToggleTabs)
=======
import { modeStore } from 'src/store'
import { bottomNavigationStore } from 'src/store'
import { sideNavigationStore, profileColorStore, actionStore, toggleTabsStore } from 'src/store'

function Home({ userObj, value, setValue, counter, setCounter, tmpCounter, piazzaSwitch, newMessage, setNewMessage }) {
    const bottomNavigation = bottomNavigationStore((state) => state.bottomNavigation)
    const handleBottomNavigation = bottomNavigationStore((state) => state.handleBottomNavigation)
    const toggleTabs = toggleTabsStore((state) => state.bottomNavigation)
    const handleToggleTabs = toggleTabsStore((state) => state.handleBottomNavigation)
>>>>>>> a1b714eec3182d5c11ed020a7ea2666da3a5705b

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
<<<<<<< HEAD
                            <Notice userObj={userObj} counter={counter} setCounter={setCounter}/>
                        </div>
                        <div>
                            <Notice userObj={userObj} counter={counter} setCounter={setCounter}/>
=======
                            <Notice userObj={userObj} setValue={setValue} counter={counter} setCounter={setCounter}/>
                        </div>
                        <div>
                            <Notice userObj={userObj} setValue={setValue} counter={counter} setCounter={setCounter}/>
>>>>>>> a1b714eec3182d5c11ed020a7ea2666da3a5705b
                        </div>
                    </SwipeableViews>
                    </div>
                }
            </div>
            }
            {!userObj &&
                <>
                    {bottomNavigation === 0 &&
<<<<<<< HEAD
                        <Notice userObj={userObj} counter={counter} setCounter={(newState) => setCounter(newState)} />
=======
                        <Notice userObj={userObj} setValue={setValue} counter={counter} setCounter={(newState) => setCounter(newState)} />
>>>>>>> a1b714eec3182d5c11ed020a7ea2666da3a5705b
                    }
                    {bottomNavigation === 1 &&
                        <Auth />
                    }
                    {bottomNavigation === 2 &&
<<<<<<< HEAD
                        <Notice userObj={userObj} counter={counter} setCounter={(newState) => setCounter(newState)} />
=======
                        <Notice userObj={userObj} setValue={setValue} counter={counter} setCounter={(newState) => setCounter(newState)} />
>>>>>>> a1b714eec3182d5c11ed020a7ea2666da3a5705b
                    }
                </>
            }
        </div>
    )
}

export default Home