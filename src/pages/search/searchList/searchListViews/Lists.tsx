import Divider from '@mui/material/Divider'
import { useState } from 'react'
// import Avatar from '@mui/material/Avatar';
import { Chip } from '@mui/material'
import { doc, updateDoc } from 'firebase/firestore'
import { Ban, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import Avatars from 'src/pages/core/Avatars'
import RankingListsTitle from 'src/pages/search/searchList/searchListViews/searchListViewsTitle/RankingListsTitle'

const ListsView = ({ userObj, elements, userSearch, multiple }) => {
  const [newRanking, setNewRanking] = useState(0)
  let point
  let samePointIndex
  return (
    <div className="bg-light-3 dark:bg-dark-3">
      {elements.map((element, index) => {
        if (element.points !== point) {
          point = element.points
          samePointIndex = index
        }
        if (element.uid === userObj.uid) {
          const user = doc(dbservice, `members/${userObj.uid}`)
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

          return (
            <div key={index} className="px-1 pt-3">
              <Link
                to="/profile"
                state={{
                  element: element,
                }}
              >
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
              </Link>
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
  const [newRanking, setNewRanking] = useState(0)
  return (
    <div>
      {ranking && (
        <div>
          <RankingListsTitle multiple={multiple} />
          <ListsView userObj={userObj} elements={elements} userSearch={userSearch} multiple={multiple} />
        </div>
      )}
      {!ranking && (
        <div>
          <div className="bg-light-3 dark:bg-dark-3">
            {elements.map((element, index) => {
              const profileColor = element?.profileColor
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
                if (element.displayName.length > 10) {
                  displayName = element.displayName.slice(0, 10) + '......'
                } else {
                  displayName = element.displayName.slice(0, 10) + '......'
                }
                const profileUrl = element?.profile
                  ? element?.profileImageUrl
                  : element?.defaultProfile

                return (
                  <div
                    key={index}
                    className="px-3 pt-3"
                    onClick={() => handleUser(element)}
                  >
                    <div
                      className={`flex w-full justify-between p-3 rounded ranking-${multiple ? index + 1 : element.rank}`}
                    >
                      <div className="flex gap-5">
                        {!multiple ? (
                          <div className="flex items-center justify-center">
                            {newRanking ? newRanking : element.ranking}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            {samePointIndex ? samePointIndex + 1 : index + 1}
                          </div>
                        )}
                        <Avatars
                          element={element}
                          uid={element.uid}
                          piazza={null}
                          profile={false}
                          profileColor={''}
                          profileUrl={element.profileImageUrl}
                        />
                        {/* {element?.profileImageUrl &&
                          <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || '#2196f3' }} src={element?.profileImageUrl || './src'} variant="rounded" />
                        }
                        {!element?.profileImageUrl &&
                          <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || '#2196f3' }} src={'./src'} variant="rounded" />
                        } */}
                        <div className="flex flex-col justify-center overflow-hidden px-5 w-40">
                          <div className="overflow-hidden">{displayName}</div>
                          <div className="overflow-hidden">
                            {element.points}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {
                          element.locationConfirmed ? (
                            <Chip sx={{}} color="success" label={'위치 확인'} />
                          ) : (
                            <Chip label={'위치 미확인'} />
                          )
                          // <Chips label={'캠퍼스 위치 확인'} className='bg-profile-green' /> : <Chips label={'캠퍼스 위치 미확인'} />
                        }
                      </div>
                    </div>
                    <Divider />
                  </div>
                )
              }
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Lists
