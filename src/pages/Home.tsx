import { useState, useEffect } from 'react'
// import { doc, onSnapshot, query } from 'firebase/firestore';
import Menu from 'src/pages/Menu'
import Notice from 'src/pages/Notice'
import Auth from 'src/pages/Auth'
import Add from 'src/pages/Add'
// import Navigations from 'src/navigate/Navigations'
// import Avatars from 'src/muiComponents/Avatars'
// import { dbservice } from 'src/baseApi/serverbase'
// import Navigation from 'src/navigate/Navigation'
import { SwipeableViews } from "src/navigate/SwipeableViews";

function Home({ isLoggedIn, userObj, value, newAccount, setNewAccount, setValue, counter, setCounter }) {
    // const [style, setStyle] = useState<React.CSSProperties>({});
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
        if (value >= 5) {
            setValue(2)
        } 
    })
    
    return (
        <div>
            {isLoggedIn && 
            <div>
                {/* <div className='flex justify-center'>좋은 날씨네요 {userObj.displayName} 님</div>
                {isLoggedIn && <div className='flex justify-center'>내 포인트: {points}</div>} */}
                {value === 2 && 
                    <Menu isLoggedIn={isLoggedIn} userObj={userObj} counter={counter} setCounter={setCounter} setValue={setValue} />
                }
                {[0, 4].indexOf(value) !== -1 && 
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
                {[1, 3].indexOf(value) !== -1 && 
                    <div>
                    <SwipeableViews
                        index={value-1}
                        onIndexChange={setValue}
                        num={2}
                        // initial={[1, 3]}
                    >
                        <div>
                            <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={1} setValue={setValue} counter={counter} setCounter={setCounter}/>
                        </div>
                        <div>
                            <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={3} setValue={setValue} counter={counter} setCounter={setCounter}/>
                        </div>
                    </SwipeableViews>
                    </div>
                }
            </div>
            }
            {!isLoggedIn &&
                <>
                    {value === 0 &&
                        <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={1} setValue={setValue}/>
                    }
                    {value === 1 &&
                        <Auth newAccount={newAccount} setNewAccount={setNewAccount} userObj={userObj} valuing={value}/>
                    }
                    {value === 2 &&
                        <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={4} setValue={setValue}/>
                    }
                </>
            }
        </div>
    )
}

export default Home