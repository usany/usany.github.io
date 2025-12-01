import { collection, getDocs, query } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import useTexts from 'src/hooks/useTexts'
import Card from '@mui/material/Card'
import useCardsBackground from '../../hooks/useCardsBackground'
import { useEffect, useState } from 'react'
import { AnimatedNumber } from 'src/components/motion-primitives/animated-number'

interface Props {
  cards?: {
    point?: number;
  };
  isFollowers?: boolean;
  alliesCollectionList?: string[];
  handleCompanies?: (newValue: any[]) => void;
}

const ProfileCardsTrigger: React.FC<Props> = ({
  cards,
  isFollowers = false,
  alliesCollectionList = [],
  handleCompanies = () => {}
}: Props) => {
  const [animatedPoints, setAnimatedPoints] = useState({points: 1, followers: 1, followings: 1})
  const { points, follower, following } = useTexts()
  const { colorTwo } = useCardsBackground()
  const usersCollection = async () => {
    const elementsCollection = []
    const collectionRef = collection(dbservice, 'members')
    const docs = await getDocs(query(collectionRef))
    docs.forEach((element) => {
      if (alliesCollectionList.indexOf(element.data().uid) !== -1) {
        elementsCollection.push(element.data())
      }
    })
    handleCompanies(elementsCollection)
  }
  useEffect(() => {
    if (cards) {
      setAnimatedPoints({...animatedPoints, points: cards?.point})
    } else if (isFollowers) {
      setAnimatedPoints({...animatedPoints, followers: alliesCollectionList?.length })
    } else {
      setAnimatedPoints({...animatedPoints, followings: alliesCollectionList?.length })
    }
  }, [cards])
  return (
    <Card
      sx={{
        bgcolor: colorTwo,
        padding: '20px'
      }}
    >
      {cards ?
        <>
          <div>{points}</div>
          <div className='flex justify-center'><AnimatedNumber value={animatedPoints} /></div>
        </>
        :
        <div onClick={usersCollection}>
          <div>{isFollowers ? follower : following}</div>
          <div className="flex justify-center">
            <AnimatedNumber value={alliesCollectionList?.length || 0} />
          </div>
        </div>
      }
    </Card>
  )
}

export default ProfileCardsTrigger
