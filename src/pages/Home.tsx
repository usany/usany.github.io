import { useState, useEffect } from 'react'
import Menu from 'src/pages/Menu'
import Notice from 'src/pages/Notice'
import Auth from 'src/pages/Auth'
import Add from 'src/pages/Add'
import { SwipeableViews } from "src/navigate/SwipeableViews";

function Home({ userObj, value, setValue, counter, setCounter, tmpCounter, bottomNavigation, setBottomNavigation, piazzaSwitch, newMessage, setNewMessage }) {

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