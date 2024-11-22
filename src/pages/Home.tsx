import { useState, useEffect } from 'react'
import Menu from 'src/pages/Menu'
import Notice from 'src/pages/Notice'
import Auth from 'src/pages/Auth'
import Add from 'src/pages/Add'
import { SwipeableViews } from "src/navigate/SwipeableViews";
import { useBottomNavigationStore, useTabsStore } from 'src/store'

interface Props {
    userObj: {uid: string, displayName: string} | null
}
function Home({ userObj }: Props) {
    // const bottomNavigation = useBottomNavigationStore((state) => state.bottomNavigation)
    // const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)
    const {bottomNavigation, handleBottomNavigation} = useBottomNavigationStore((state) => {
        return state
    })
    // const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)
    
    const tabs = useTabsStore((state) => state.tabs)
    const handleTabs = useTabsStore((state) => state.handleTabs)

    useEffect(() => {
        if (bottomNavigation === 5) {
            handleBottomNavigation(1)
        }
    }, [])
    
    return (
        <div>
            {userObj ? 
                <>
                    {bottomNavigation === 1 && 
                        <Menu userObj={userObj} />
                    }
                    {bottomNavigation === 0 && 
                        <div>
                        <SwipeableViews
                            index={tabs}
                            onIndexChange={handleTabs}
                            num={1}
                        >
                            <div>
                                <Add userObj={userObj} action={0} borrow={true}/>
                            </div>
                            <div>
                                <Add userObj={userObj} action={1} borrow={false}/>
                            </div>
                        </SwipeableViews>
                        </div>
                    }
                    {bottomNavigation === 2 && 
                        <div>
                        <SwipeableViews
                            index={tabs}
                            onIndexChange={handleTabs}
                            num={1}
                        >
                            <div>
                                <Notice userObj={userObj} borrow={true} />
                            </div>
                            <div>
                                <Notice userObj={userObj} borrow={false}/>
                            </div>
                        </SwipeableViews>
                        </div>
                    }
                </>
                :
                <>
                    {bottomNavigation === 0 &&
                        <Notice userObj={userObj} borrow={true}/>
                    }
                    {bottomNavigation === 1 &&
                        <Auth />
                    }
                    {bottomNavigation === 2 &&
                        <Notice userObj={userObj} borrow={false}/>
                    }
                </>
            }
        </div>
    )
}

export default Home