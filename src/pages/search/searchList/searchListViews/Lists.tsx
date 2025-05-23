import Divider from '@mui/material/Divider'
import { useState } from 'react'
// import Avatar from '@mui/material/Avatar';
import { Chip } from '@mui/material'
import { doc, updateDoc } from 'firebase/firestore'
import { Ban, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import Avatars from 'src/pages/core/Avatars'
import RankingListsTitle from 'src/pages/search/searchList/searchListViews/searchListViewsTitle/RankingListsTitle'

const ListsView = ({ userObj, elements, userSearch, multiple, link, handleUser }) => {
  const [newRanking, setNewRanking] = useState(0)
  const navigate = useNavigate()
  let point
  let samePointIndex
  return (
    <div className="bg-light-3 dark:bg-dark-3">
      {elements.map((element, index) => {
        if (element.points !== point) {
          point = element.points
          samePointIndex = index
        }
        if (element.uid === userObj?.uid) {
          const user = doc(dbservice, `members/${userObj?.uid}`)
          const newRank = samePointIndex ? samePointIndex + 1 : index + 1
          if (!newRanking && multiple) {
            updateDoc(user, { ranking: newRank })
            setNewRanking(newRank)
          }
        }
        let userNameConfirm = true
        if (userSearch) {
          for (let number = 0; number < userSearch.length; number++) {
            if (element?.displayName[number] !== userSearch[number]) {
              userNameConfirm = false
            }
          }
        }
        if (userNameConfirm) {
          let displayName
          if ((element.displayName?.length || 0) > 9) {
            displayName = element.displayName.slice(0, 9) + '......'
          } else {
            displayName = element.displayName
          }
          const onClick = () => link ? navigate(link, {
            state: {
              element: element,
            }
          })
            :
            handleUser(element)
          return (
            <div key={index} className="px-1 pt-3 cursor-pointer" onClick={onClick}>
              <>
                <div
                  className={`flex truncate justify-around gap-1 p-3 rounded ranking-${multiple ? index + 1 : element.rank}`}
                >
                  {!multiple ? (
                    <div className="flex items-center justify-center w-20">
                      {newRanking ? newRanking : element.ranking}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center px-5 w-20">
                      {samePointIndex ? samePointIndex + 1 : index + 1}
                    </div>
                  )}
                  <div className="flex gap-1">
                    <Avatars
                      element={element}
                      piazza={null}
                      profile={false}
                    />
                  </div>
                  <div className="flex flex-col justify-center overflow-hidden px-5 w-40">
                    <div className="overflow-hidden">{displayName}</div>
                    <div className="overflow-hidden">
                      {element.points}
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-[67px]">
                    {
                      element.locationConfirmed ? (
                        <Chip
                          sx={{}}
                          color="success"
                          label={
                            <Check />
                          }
                        />
                      ) : (
                        <Chip
                          label={
                            <Ban />
                          }
                        />
                      )
                    }
                  </div>
                </div>
              </>
              <Divider />
            </div>
          )
        }
      })}
    </div>
  )
}
function Lists({
  userObj,
  elements,
  multiple,
  userSearch,
  ranking,
  handleUser,
}) {
  let point
  let samePointIndex
  let link
  if (location.pathname === '/ranking') {
    link = '/profile'
  }
  const [newRanking, setNewRanking] = useState(0)
  return (
    <div>
      {ranking && (
        <div>
          <RankingListsTitle multiple={multiple} />
          <ListsView userObj={userObj} elements={elements} userSearch={userSearch} multiple={multiple} link={link} handleUser={handleUser} />
        </div>
      )}
      {!ranking && (
        <div>
          <ListsView userObj={userObj} elements={elements} userSearch={userSearch} multiple={multiple} link={link} handleUser={handleUser} />
        </div>
      )}
    </div>
  )
}

export default Lists
