import { useState, useEffect, useReducer } from 'react'
import ProfileForm from 'src/pages/profile/ProfileForm'
import ProfileConnects from 'src/pages/profile/ProfileConnects'

const ProfileActions = ({
  userObj,
  user,
  alliesCollection,
  handleFollowers,
  handleFollowings
}) => {
  // const [cards, setCards] = useState({point: null, done: []})
  // useEffect(() => {
  //   onSnapshot(doc(dbservice, `members/${user.uid}`), (snapshot) => {
  //     const points = snapshot.data().points
  //     const doneCards = snapshot.data().done || []
  //     setCards({point: points, done: doneCards})
  //   })
  // }, [])

  return (
    <div>
      {userObj.uid === user.uid ? 
        <ProfileForm userObj={userObj} />
        :
        <ProfileConnects userObj={userObj} user={user} alliesCollection={alliesCollection} handleFollowers={handleFollowers} handleFollowings={handleFollowings}/>      
      }
    </div>
  );
}

export default ProfileActions