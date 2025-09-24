import { collection, getDocs, query } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { useTexts } from 'src/hooks'
import Card from '@mui/material/Card'
import useCardsBackground from '../../hooks/useCardsBackground'

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
          <div className='flex justify-center'>{cards.point}</div>
        </>
        :
        <div onClick={usersCollection}>
          <div>{isFollowers ? follower : following}</div>
          <div className="flex justify-center">
            {alliesCollectionList?.length || 0}
          </div>
        </div>
      }
    </Card>
  )
}

export default ProfileCardsTrigger
