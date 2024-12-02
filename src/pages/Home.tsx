import { useState, useEffect } from 'react'
import Menu from 'src/pages/Menu'
import Notice from 'src/pages/Notice'
import Auth from 'src/pages/Auth'
import Add from 'src/pages/Add'
import { SwipeableViews } from "src/navigate/SwipeableViews";
import { useBottomNavigationStore, useTabsStore } from 'src/store'
import { collection, query, QuerySnapshot, where, orderBy, addDoc, setDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, limit } from 'firebase/firestore';
import { auth, dbservice } from 'src/baseApi/serverbase'
import { storage } from "src/baseApi/serverbase";
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";

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

    useEffect(() => {
        const userSetting = async () => {
            const userRef = doc(dbservice, `members/${userObj.uid}`)
            const userSnap = await getDoc(userRef)
            const user = userSnap.data()
            if (!user) {
                await setDoc(userRef, {
                    uid: userObj.uid,
                    displayName: userObj.displayName,
                    points: 0,
                    profileColor: '#2196f3',
                    profileImage: null,
                    followerNum: 0,
                    followingNum: 0,
                    followers: [],
                    followings: [],
                    messagingToken: null
                })
                const storageRef = ref(storage, userObj.uid);
                uploadString(storageRef, 'null', 'raw').then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                });
            }
        }
        userSetting()
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