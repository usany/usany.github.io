import { useState, useEffect, useReducer } from 'react'
import ProfileForm from 'src/components/ProfileForm'
import ProfileConnects from 'src/components/ProfileConnects'

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