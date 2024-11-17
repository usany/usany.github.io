import { useState, useEffect, useReducer } from 'react'
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'

const ProfileCards = ({
  user
}) => {
  const [cards, setCards] = useState({point: null, done: [], borrowDone: [], lendDone: [] })
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
    const cards = async () => {
      const docRef = doc(dbservice, `members/${user.uid}`)
      const myDocSnap = await getDoc(docRef)
      const { points, done, borrowDone, lendDone } = myDocSnap.data()
      setCards({point: points, done: done, borrowDone: borrowDone || [], lendDone: lendDone || [] })
    }
    cards()
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

  return (
    <div className='flex flex-col'>
    <div className='flex justify-center'>
      <Card>
        <CardActionArea>
          <Link 
            to='/points'
            state={{
              user: user,
              cards: cards,
            }}
          >
          <div className='p-5'>
            <div>포인트</div>
            <div className='flex justify-center'>{cards.point}</div>
          </div>
          </Link>
        </CardActionArea>
      </Card>
      <Card>
        <CardActionArea>
          <Link to='/allies' 
            state={{
              user: user,
              followers: true,
              alliesCollection: allies.followers.list,
          }}>
            <div className='p-5'>
              <div>
                팔로워
              </div>
              <div className='flex justify-center'>
                {allies.followers.number}명 
              </div>
            </div>
          </Link>
        </CardActionArea>
      </Card>
      <Card>
        <CardActionArea>
          <Link to='/allies' 
            state={{
              user: user,
              followers: false,
              alliesCollection: allies.followings.list
          }}>
            <div className='p-5'>
              <div className='flex justify-center'>
                팔로잉
              </div>
              <div className='flex justify-center'>
                {allies.followings.number}명
              </div>
            </div>
          </Link>
        </CardActionArea>
      </Card>
    </div>
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
              <div className='p-5'>
                <div>완료된 빌려주기</div>
                <div className='flex justify-center'>{cards.lendDone.length}회</div>
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
                <div className='flex justify-center'>{cards.borrowDone.length}회</div>
              </div>
              </Link>
            </CardActionArea>
          </Card>
        </div>
    </div>
  );
}

export default ProfileCards