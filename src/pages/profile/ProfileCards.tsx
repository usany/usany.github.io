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
import ProfileCardsTitle from './ProfilePointsTitle'

const ProfileCards = ({ alliesCollection, cards }) => {
  const [companies, setCompanies] = useState([])
  const isFollowersList = [true, false]
  return (
    <div className="flex justify-center pt-5">
      <Popups
        trigger={<ProfilePointsTrigger cards={cards} />}
        title={<ProfileCardsTitle />}
        content={<ProfileDrawersPoints cards={cards} />}
        close={null}
      />
      {isFollowersList.map((value, index) => {
        return (
          <Popups
            trigger={
              <ProfileCompaniesTrigger
                isFollowers={value}
                alliesCollectionList={alliesCollection[index].list}
                handleCompanies={(newValue) => setCompanies(newValue)}
              />
            }
            title={<ProfileCardsTitle isFollowers={value} />}
            content={
              <div className="flex flex-col justify-center p-5">
                <DrawerClose>
                  <ListsView
                    elements={companies}
                    multiple={true}
                    userSearch={null}
                    handleUser={null}
                  />
                </DrawerClose>
              </div>
            }
          />
        )
      })}
    </div>
  )
}

export default ProfileCards
