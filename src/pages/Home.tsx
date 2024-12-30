import { useState, useEffect } from 'react'
import Menu from 'src/pages/Menu'
import Notice from 'src/pages/Notice'
import Auth from 'src/pages/Auth'
import Add from 'src/pages/Add'
import { SwipeableViews } from "src/navigate/SwipeableViews";
import { collection, query, QuerySnapshot, where, orderBy, addDoc, setDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, limit } from 'firebase/firestore';
import { auth, dbservice } from 'src/baseApi/serverbase'
import { storage } from "src/baseApi/serverbase";
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { useSelector, useDispatch } from 'react-redux'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { changeTabs } from 'src/stateSlices/tabsSlice'
import TabsRootState from 'src/interfaces/TabsRootState'
import BottomNavigationRootState from 'src/interfaces/BottomNavigationRootState'
import UserObjProps from 'src/interfaces/UserObjProps'

function Home({ userObj }: UserObjProps) {
    const bottomNavigation = useSelector((state: BottomNavigationRootState) => state.bottomNavigation)
    const tabs = useSelector((state: TabsRootState) => state.tabs)
    const dispatch = useDispatch()
    useEffect(() => {
        if (bottomNavigation === 5) {
            dispatch(changeBottomNavigation(1))
        }
    }, [])
    
    useEffect(() => {
        const userSetting = async () => {
            const userRef = doc(dbservice, `members/${userObj?.uid}`)
            const userSnap = await getDoc(userRef)
            const user = userSnap.data()
            if (!user && userObj) {
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
                uploadString(storageRef, 'null', 'raw').then(() => {
                    console.log('Uploaded a blob or file!');
                });
            }
        }
        userSetting()
    }, [userObj])
    
    return (
        <>
            {userObj ? 
                <>
                    {bottomNavigation === 0 && 
                        <SwipeableViews
                            index={tabs}
                            onIndexChange={(newValue) => dispatch(changeTabs(newValue))}
                            num={1}
                        >
                            <Add userObj={userObj} action={0} borrow={true}/>
                            <Add userObj={userObj} action={1} borrow={false}/>
                        </SwipeableViews>
                    }
                    {bottomNavigation === 1 && <Menu userObj={userObj} />}
                    {bottomNavigation === 2 && 
                        <SwipeableViews
                            index={tabs}
                            onIndexChange={(newValue) => dispatch(changeTabs(newValue))}
                            num={1}
                        >
                            <Notice userObj={userObj} borrow={true} />
                            <Notice userObj={userObj} borrow={false}/>
                        </SwipeableViews>
                    }
                </>
                :
                <>
                    {bottomNavigation === 0 && <Notice userObj={userObj} borrow={true} />}
                    {bottomNavigation === 1 && <Auth />}
                    {bottomNavigation === 2 && <Notice userObj={userObj} borrow={false} />}
                </>
            }
        </>
    )
}

export default Home