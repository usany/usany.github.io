import { useState, useEffect, useReducer } from 'react'
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import ProfileForm from 'src/muiComponents/ProfileForm'
import ProfileConnects from 'src/muiComponents/ProfileConnects'
import { StatementSync } from 'node:sqlite';

const ProfileActions = ({
  userObj,
  user,
  allies,
  handleFollowers,
  handleFollowings
}) => {
  const [cards, setCards] = useState({point: null, done: []})
  // const [allies, setAllies] = useState({
  //   followers: {
  //     number: null,
  //     list: null
  //   }, 
  //   followings: {
  //     number: null,
  //     list: null
  //   }
  // })

  useEffect(() => {
    onSnapshot(doc(dbservice, `members/${user.uid}`), (snapshot) => {
      const points = snapshot.data().points
      const doneCards = snapshot.data().done || []
      setCards({point: points, done: doneCards})
    })
  }, [])
  // useEffect(() => {
  //   const allies = async () => {
  //     const docRef = doc(dbservice, `members/${user.uid}`)
  //     const myDocSnap = await getDoc(docRef)
  //     const {followerNum, followingNum, followers, followings} = myDocSnap.data()
  //     setAllies({
  //       followers: {number: followerNum || 0, list: followers || []},
  //       followings: {number: followingNum || 0, list: followings || []}
  //     })
  //   }
  //   allies()
  // }, [])
  // console.log(cards)
  return (
    <div>
      {userObj.uid === user.uid ? 
        <ProfileForm userObj={userObj} />
        :
        <ProfileConnects userObj={userObj} user={user} allies={allies} handleFollowers={handleFollowers} handleFollowings={handleFollowings}/>      
      }
    </div>
  );
}

export default ProfileActions