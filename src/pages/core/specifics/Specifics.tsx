import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import Btn from 'src/Btn'
// import { CardActionArea, CardActions } from '@mui/material';
// import { useBottomNavigationStore } from 'src/store'
import Divider from '@mui/material/Divider'
import { User } from 'firebase/auth'
import useCardsBackground from '../../../hooks/useCardsBackground'
import SpecificsActions from './SpecificsActions'
import SpecificsDimensions from './SpecificsDimensions'
import SpecificsSteppers from './SpecificsSteppers'
import SpecificsTrades from './SpecificsTrades'

interface Props {
  userObj: User | null
  message: {}
}

function Specifics({
  drawerOpenTrue,
  // deleted,
  // changeDeleted,
  userObj,
  message,
}: Props) {
  const [messageObj, setMessageObj] = useState<{
    id: string
    round: number
    displayName: string
    connectedName: string
    point: number
    connectedId: string | null
    creatorId: string
  } | null>(null)
  const [num, setNum] = useState<number | null>(null)
  const [points, setPoints] = useState<number | null>(null)
  const [deleted, setDeleted] = useState<boolean>(false)
  const [round, setRound] = useState(0)
  const increaseRound = () => {
    setRound(round + 1)
  }
  const decreaseRound = () => {
    setRound(round - 1)
  }
  const deleteMessage = () => {
    // changeDeleted(true)
    setDeleted(true)
  }
  // useEffect(() => {
  //   if (!round) {
  //     setDeleted(true)
  //   }
  // })
  // console.log(round)
  useEffect(() => {
    const bringMessage = async ({ message }) => {
      const docRef = doc(dbservice, `num/${message.id}`)
      const docSnap = await getDoc(docRef)
      setMessageObj({ id: message.id, round: docSnap.data().round, ...docSnap.data() })
      setRound(docSnap.data().round)
      if (!docSnap.data().round) {
        setDeleted(true)
      }
    }
    bringMessage({ message: message })
    // onSnapshot(query(collection(dbservice, "num")), (snapshot) => {
    //   snapshot.docs.map((document) => {
    //     if (document.id === message.id) {
    //       setMessageObj({ id: document.id, ...document.data() });
    //     }
    //   });
    //   const newArrayId = snapshot.docs.map((document) => document.id);
    //   if (newArrayId.indexOf(message.id) === -1) {
    //     setDeleted(true);
    //   }
    // });
  }, [])
  console.log(deleted)
  useEffect(() => {
    const creatorPoints = async () => {
      const docRef = doc(dbservice, `members/${message.creatorId}`)
      const docSnap = await getDoc(docRef)
      const points = docSnap.data()?.points
      setNum(points)
    }
    creatorPoints()
    // onSnapshot(doc(dbservice, `members/${message.creatorId}`), (snapshot) => {
    //   const number = snapshot.data()?.points;
    //   setNum(number);
    // });
  }, [])
  useEffect(() => {
    const connectedPoints = async () => {
      const docRef = doc(dbservice, `members/${message?.connectedId}`)
      const docSnap = await getDoc(docRef)
      const points = docSnap.data()?.points
      setPoints(points)
    }
    if (message.connectedId !== null) {
      connectedPoints()
      // onSnapshot(
      //   doc(dbservice, `members/${message.connectedId}`),
      //   (snapshot) => {
      //     const element = snapshot.data()?.points;
      //     setPoints(element);
      //   }
      // );
    }
  })
  const shadowColorArray = [
    'lightblue',
    'lightcoral',
    'lightcyan',
    'lightgoldenrodyellow',
    'lightgray',
    'lightgreen',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'lightsteelblue',
    'lightyellow',
  ]
  // let shadowColor
  const alpha = Array.from(Array(26)).map((e, i) => i + 65)
  const letters = alpha.map((x) => String.fromCharCode(x))
  const numbers = Array.from({ length: 10 }, (e, i) => `${i}`)
  const mergedArray = letters.concat(numbers)
  const id = message?.id || ''
  const shadowColor =
    shadowColorArray[
    mergedArray.indexOf(String(id[0]).toUpperCase()) % shadowColorArray.length
    ]
  const { color } = useCardsBackground()

  return (
    <div className="truncate p-1">
      {userObj ? (
        <Card
          sx={{
            boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`,
          }}
        >
          <CardContent>
            <SpecificsActions
              drawerOpenTrue={drawerOpenTrue}
              userObj={userObj}
              message={message}
            />
            <div className="flex justify-center pt-5">
              <CardMedia
                sx={{
                  width: 212,
                  height: 188
                }}
                image={"src/assets/pwa-512x512.png"}
              />
            </div>
            <SpecificsDimensions message={message} />
            <Divider />
            <SpecificsTrades
              drawerOpenTrue={drawerOpenTrue}
              userObj={userObj}
              message={message}
            />
            <Divider />
            <SpecificsSteppers message={message} round={round} />
            <Divider />
            <div className="flex justify-center pt-5">
              {deleted === false && userObj !== null && (
                <div className="flex justify-center">
                  <Btn
                    messageObj={message}
                    isOwner={message.creatorId === userObj.uid}
                    uid={userObj.uid}
                    displayName={userObj.displayName}
                    userObj={userObj}
                    num={num}
                    points={points}
                    deleteMessage={deleteMessage}
                    round={round}
                    increaseRound={increaseRound}
                    decreaseRound={decreaseRound}
                  />
                </div>
              )}
              {deleted === false && userObj === null && (
                <div className="flex justify-center">
                  <Btn
                    messageObj={message}
                    isOwner={false}
                    uid={null}
                    displayName={null}
                    userObj={userObj}
                    num={num}
                    points={points}
                    deleteMessage={deleteMessage}
                    round={round}
                    increaseRound={increaseRound}
                    decreaseRound={decreaseRound}
                  />
                </div>
              )}
              {deleted === true && (
                <div className="flex justify-center">
                  <Button variant="outlined" disabled>
                    지워졌습니다
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          sx={{
            boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`,
            width: '481px',
            height: '640px',
          }}
        >
          <CardContent>
            <div className="flex justify-center pt-5">로그인을 해 주세요</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Specifics
