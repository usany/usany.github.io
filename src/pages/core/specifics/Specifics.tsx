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
  const [msgObj, setMsgObj] = useState<{
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
  const deleteMessage = () => {
    // changeDeleted(true)
    setDeleted(true)
  }
  useEffect(() => {
    if (!msgObj) {
      setMsgObj(message)
    }
  })
  useEffect(() => {
    const bringMessage = async ({ message }) => {
      const docRef = doc(dbservice, `num/${message.id}`)
      const docSnap = await getDoc(docRef)
      setMsgObj({ id: message.id, ...docSnap.data() })
      // const collectionQuery = query(collection(dbservice, "num"))
      // const docs = await getDocs(collectionQuery)
      // docs.forEach((doc) => {
      //   if (doc.id === message.id) {
      //     setMsgObj({ id: document.id, ...document.data() });
      //   }
      // })
    }
    bringMessage({ message: message })
    // onSnapshot(query(collection(dbservice, "num")), (snapshot) => {
    //   const newArray = snapshot.docs.map((document) => {
    //     if (document.id === message.id) {
    //       setMsgObj({ id: document.id, ...document.data() });
    //     }
    //   });
    //   const newArrayId = snapshot.docs.map((document) => document.id);
    //   if (newArrayId.indexOf(message.id) === -1) {
    //     setDeleted(true);
    //   }
    // });
  }, [])
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
  let shadowColor
  const alpha = Array.from(Array(26)).map((e, i) => i + 65)
  const letters = alpha.map((x) => String.fromCharCode(x))
  const numbers = Array.from({ length: 10 }, (e, i) => `${i}`)
  const mergedArray = letters.concat(numbers)
  const id = message?.id || ''
  shadowColor =
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
            <div className="pt-5">
              <CardMedia
                sx={{ height: 140 }}
                image={'src/assets/pwa-512x512.png'}
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
            <SpecificsSteppers message={message} />
            <Divider />
            <div className="flex justify-center pt-5">
              {deleted === false && userObj !== null && (
                <div className="flex justify-center">
                  <Btn
                    msgObj={message}
                    isOwner={message.creatorId === userObj.uid}
                    uid={userObj.uid}
                    displayName={userObj.displayName}
                    userObj={userObj}
                    num={num}
                    points={points}
                    deleteMessage={deleteMessage}
                  />
                </div>
              )}
              {deleted === false && userObj === null && (
                <div className="flex justify-center">
                  <Btn
                    msgObj={message}
                    isOwner={false}
                    uid={null}
                    displayName={null}
                    userObj={userObj}
                    num={num}
                    points={points}
                    deleteMessage={deleteMessage}
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
