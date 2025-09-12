import { collection, getDocs, query } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { useTexts } from 'src/hooks'

const ProfileCompaniesTrigger = ({
  followers,
  alliesCollection,
  handleCompanies,
}) => {
  const {follower, following} = useTexts()
  const usersCollection = async (index) => {
    const elementsCollection = []
    const collectionRef = collection(dbservice, 'members')
    const docs = await getDocs(query(collectionRef))
    docs.forEach((element) => {
      if (alliesCollection[index].list.indexOf(element.data().uid) !== -1) {
        elementsCollection.push(element.data())
      }
    })
    handleCompanies(elementsCollection)
  }

  return (
    <div className="p-5" onClick={usersCollection}>
      <div>{followers ? follower : following}</div>
      <div className="flex justify-center">
        {alliesCollection.length}
      </div>
    </div>
  )
}

export default ProfileCompaniesTrigger
