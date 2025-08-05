import Card from '@mui/material/Card'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors'
import useCardsBackground from '../../hooks/useCardsBackground'
import Popups from '../core/Popups'
import ProfileLists from '../search/searchList/searchListViews/ProfileLists'
import ProfileCompaniesTitle from './ProfileCompaniesTitle'
import ProfileCompaniesTrigger from './ProfileCompaniesTrigger'
import ProfileDrawersEmptyCompanies from './ProfileDrawersEmptyCompanies'
import ProfileDrawersPoints from './ProfileDrawersPoints'
import ProfilePointsTitle from './ProfilePointsTitle'
import ProfilePointsTrigger from './ProfilePointsTrigger'

const ProfileCards = ({
  user,
  alliesCollection,
  cards,
  changeProfileDialog,
}) => {
  const [companies, setCompanies] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const languages = useSelectors((state) => state.languages.value)
  const usersCollection = async ({ lend }) => {
    const elementsCollection = []
    const collectionRef = collection(dbservice, 'members')
    const docs = await getDocs(query(collectionRef, orderBy('points', 'desc')))
    docs.forEach((element) => {
      if (alliesCollection[lend].list?.indexOf(element.data().uid) !== -1) {
        elementsCollection.push(element.data())
      }
    })
    setCompanies(elementsCollection)
  }
  // useEffect(() => {
  //   if (!selectedUser) {
  //     setSelectedUser(user)
  //   }
  // }, [user])
  const { color } = useCardsBackground()
  const followerList = [true, false]
  const onClick = ({ lend }) => {
    usersCollection({ lend: lend })
    changeProfileDialog(true)
    console.log('sample')
  }
  return (
    <div className="flex justify-center pt-5">
      <Card
        sx={{
          bgcolor: color,
        }}
      >
        <Popups
          trigger={<ProfilePointsTrigger cards={cards} />}
          title={<ProfilePointsTitle user={user} />}
          content={<ProfileDrawersPoints user={user} cards={cards} />}
          close={null}
          attachment={null}
        />
      </Card>
      {followerList.map((value, index) => {
        const onLink = {
          to: 'profile',
          state: selectedUser || user,
        }
        return (
          <Card
            sx={{
              bgcolor: color,
            }}
          >
            <Popups
              trigger={
                <ProfileCompaniesTrigger
                  followers={value}
                  alliesCollection={alliesCollection[index].list}
                  onClick={() => onClick({ lend: index })}
                />
              }
              title={<ProfileCompaniesTitle user={user} followers={value} />}
              content={
                !companies.length && (
                  <ProfileDrawersEmptyCompanies followings={index} />
                )
              }
              close={
                <ProfileLists
                  elements={companies}
                  changeSelectedUser={(newValue) => setSelectedUser(newValue)}
                />
              }
              attachment={true}
              onLink={onLink}
            />
          </Card>
        )
      })}
    </div>
  )
}

export default ProfileCards
