import { useState, useEffect, useReducer } from 'react'
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'

const ProfileActions = ({
  user
}) => {
  const [cards, setCards] = useState({point: null, done: []})
  const [allies, setAllies] = useState({
    followers: {
      number: null,
      list: null
    }, 
    followings: {
      number: null,
      list: null
    }
  })

  useEffect(() => {
    onSnapshot(doc(dbservice, `members/${user.uid}`), (snapshot) => {
      const points = snapshot.data().points
      const doneCards = snapshot.data().done || []
      setCards({point: points, done: doneCards})
    })
  }, [])
  useEffect(() => {
    const allies = async () => {
      const docRef = doc(dbservice, `members/${user.uid}`)
      const myDocSnap = await getDoc(docRef)
      const {followerNum, followingNum, followers, followings} = myDocSnap.data()
      setAllies({
        followers: {number: followerNum || 0, list: followers || []},
        followings: {number: followingNum || 0, list: followings || []}
      })
    }
    allies()
  }, [])
  // console.log(cards)
  return (
    <div className='flex justify-center'>
          <Card>
            <CardActionArea>
              <Link 
                to='/actions'
                state={{
                  user: user,
                  actions: 'completedLend', 
                  cards: cards,
                  // lendRegisteredMessage: lendRegisteredMessage,
                  // lendMessage: lendMessage,
                  // borrowRegisteredMessage: borrowRegisteredMessage,
                  // borrowMessage: borrowMessage
                }}
              >
              <div>
              <div>완료된 빌려주기</div>
              <div className='flex justify-center'>{allies.followings.number}회</div>
              </div>
              </Link>
            </CardActionArea>
          </Card>
          <Card>
            <CardActionArea>
              <Link 
                to='/actions'
                state={{
                  user: user,
                  actions: 'completedBorrow', 
                  cards: cards,
                  // lendRegisteredMessage: lendRegisteredMessage,
                  // lendMessage: lendMessage,
                  // borrowRegisteredMessage: borrowRegisteredMessage,
                  // borrowMessage: borrowMessage
                }}
              >
              <div>
              <div>완료된 빌리기</div>
              <div className='flex justify-center'>{allies.followers.number}회</div>
              </div>
              </Link>
            </CardActionArea>
          </Card>
        </div>
  );
}

export default ProfileActions