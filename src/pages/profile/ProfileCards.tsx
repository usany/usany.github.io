import Card from '@mui/material/Card'
import { collection, getDocs, query } from 'firebase/firestore'
import { useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
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
  const usersCollection = async (index) => {
    const elementsCollection = []
    const collectionRef = collection(dbservice, 'members')
    const docs = await getDocs(query(collectionRef))
    docs.forEach((element) => {
      if (alliesCollection[index].list?.indexOf(element.data().uid) !== -1) {
        elementsCollection.push(element.data())
      }
    })
    setCompanies(elementsCollection)
  }
  // const userAllies = async (index) => {
  //   alliesCollection[index].list.map((element) => {
  //   })
  //   const ref = doc(dbservice, `members/${user.uid}`)
  //   const docs = await getDoc(ref)
  //   const followers = docs.data()?.followers || []
  //   const followings = docs.data()?.followings || []
  //   setCompanies(index ? followings : followers)
  // }
  const { color } = useCardsBackground()
  const followerList = [true, false]
  const onClick = (index) => {
    usersCollection(index)
    changeProfileDialog(true)
    // userAllies(index)
  }
  // const userAllies = async (index) => {
  //   alliesCollection[index].list.map((element) => {
  //   })
  //   const ref = doc(dbservice, `members/${user.uid}`)
  //   const docs = await getDoc(ref)
  //   const followers = docs.data()?.followers || []
  //   const followings = docs.data()?.followings || []
  //   setCompanies(index ? followings : followers)
  // }
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
          state: user,
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
                  onClick={() => onClick(index)}
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
