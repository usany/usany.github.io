import Card from '@mui/material/Card'
import { collection, getDocs, query } from 'firebase/firestore'
import { useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import { DrawerClose } from 'src/components/ui/drawer'
import useCardsBackground from '../../hooks/useCardsBackground'
import Popups from '../core/Popups'
import ListsView from '../search/searchList/searchListViews/ListsView'
import ProfileCompaniesTitle from './ProfileCompaniesTitle'
import ProfileCompaniesTrigger from './ProfileCompaniesTrigger'
import ProfileDrawersEmptyCompanies from './ProfileDrawersEmptyCompanies'
import ProfileDrawersPoints from './ProfileDrawersPoints'
import ProfilePointsTitle from './ProfilePointsTitle'
import ProfilePointsTrigger from './ProfilePointsTrigger'
import { useSelectors } from 'src/hooks'
import { useLocation } from 'react-router-dom'

const ProfileCards = ({ alliesCollection, cards }) => {
  const profile = useSelectors((state) => state.profile.value)
  const { state } = useLocation()
  const user = state?.element || profile
  const [companies, setCompanies] = useState([])
  // const usersCollection = async (index) => {
  //   const elementsCollection = []
  //   const collectionRef = collection(dbservice, 'members')
  //   const docs = await getDocs(query(collectionRef))
  //   docs.forEach((element) => {
  //     if (alliesCollection[index].list.indexOf(element.data().uid) !== -1) {
  //       elementsCollection.push(element.data())
  //     }
  //   })
  //   setCompanies(elementsCollection)
  // }
  const { colorTwo } = useCardsBackground()
  const followerList = [true, false]
  return (
    <div className="flex justify-center pt-5">
      <Card
        sx={{
          bgcolor: colorTwo,
        }}
      >
        <Popups
          trigger={<ProfilePointsTrigger cards={cards} />}
          title={<ProfilePointsTitle />}
          content={<ProfileDrawersPoints cards={cards} />}
          close={null}
        />
      </Card>
      {followerList.map((value, index) => {
        return (
          <Card
            sx={{
              bgcolor: colorTwo,
            }}
          >
            <Popups
              trigger={
                <ProfileCompaniesTrigger
                  followers={value}
                  alliesCollection={alliesCollection[index].list}
                  handleCompanies={(newValue) => setCompanies(newValue)}
                  index={index}
                />
              }
              title={<ProfileCompaniesTitle user={user} followers={value} />}
              content={
                !companies.length && (
                  <ProfileDrawersEmptyCompanies followings={index} />
                )
              }
              close={
                <DrawerClose>
                  <ListsView
                    elements={companies}
                    multiple={true}
                    userSearch={null}
                    handleUser={null}
                  />
                </DrawerClose>
              }
              attachment={true}
            />
          </Card>
        )
      })}
    </div>
  )
}

export default ProfileCards
