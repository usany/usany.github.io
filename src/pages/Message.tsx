import { useState, useEffect } from 'react'
import Cards from 'src/muiComponents/Cards';

function Message({ msgObj, isOwner, userObj }) {
  const [num, setNum] = useState(null)
  const [points, setPoints] = useState(null)

  // useEffect(() => {
  //   onSnapshot(query(doc(dbservice, `members/${msgObj.creatorId}`)), (snapshot) => {
  //       const number = snapshot.data()?.points
  //       setNum(number)
  //     }
  //   )
  // }, [])
  // useEffect(() => {
  //   if (msgObj.connectedId !== null) {
  //     onSnapshot(query(doc(dbservice, `members/${msgObj.connectedId}`)), (snapshot) => {
  //       const element = snapshot.data()?.points
  //       setPoints(element)
  //     })
  //   }
  // })
  return (
    <div>
      <Cards msgObj={msgObj} isOwner={isOwner} userObj={userObj} num={num} points={points} />
      {/* {msgObj.creatorId === userObj.uid && 
      }
      {msgObj.connectedId === userObj.uid && msgObj.round !== 1} */}
    </div>
  )
}

export default Message
