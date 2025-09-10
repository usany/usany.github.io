import { useState } from 'react'
// import Avatar from '@mui/material/Avatar';
import { doc, updateDoc } from 'firebase/firestore'
import { useSelectors } from 'src/hooks'
import { Chip, Divider } from '@mui/material'
import { Ban, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import Avatars from 'src/pages/core/Avatars'

const ListsView = ({ elements, userSearch, multiple, handleUser }) => {
  // const [newRanking, setNewRanking] = useState(0)
  const navigate = useNavigate()
  const profile = useSelectors((state) => state.profile.value)
  const link = '/profile'
  const onClick = (element) => {
    const userLink =
      element.uid === profile?.uid ? link : link + `/?id=${element.uid}`
    if (location.pathname !== '/contact') {
      navigate(userLink, {
        state: {
          element: element,
        },
      })
    } else {
      handleUser(element)
    }
  }
  // let point
  // let samePointIndex
  return (
    <div className="flex truncate justify-center">
      <div className="w-[1000px]">
        {elements.map((element, index) => {
          // if (element.points !== point) {
          //   point = element.points
          //   samePointIndex = index
          // }
          // if (element.uid === profile?.uid) {
          //   const user = doc(dbservice, `members/${profile?.uid}`)
          //   const newRank = samePointIndex ? samePointIndex + 1 : index + 1
          //   if (!newRanking && multiple) {
          //     updateDoc(user, { ranking: newRank })
          //     setNewRanking(newRank)
          //   }
          // }
          if (userSearch) {
            for (let number = 0; number < userSearch.length; number++) {
              if (element?.displayName[number] !== userSearch[number]) {
                // userNameConfirm = false
                return null
              }
            }
          }
          const displayName =
            (element.displayName?.length || 0) > 9
              ? element.displayName.slice(0, 9) + '......'
              : element.displayName.slice(0, 9)
          const locationConfirmed =
            Date.now() - element.locationConfirmed < 50000000
          return (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => onClick(element)}
            >
              <div
                className={`flex justify-around
                  ${
                    location.pathname === '/ranking' &&
                    multiple &&
                    index < 3 &&
                    `bg-[#e2e8f0] dark:bg-[#2d3848] rounded`
                  }`}
              >
                {!multiple ? (
                  <div className="flex items-center justify-center w-[100px]">
                    {profile?.ranking}
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-[100px]">
                    {element.ranking}
                  </div>
                )}
                <div className="flex items-center">
                  <Avatars element={element} piazza={null} profile={false} />
                </div>
                <div className="flex flex-col justify-center items-start overflow-hidden w-40">
                  <div className="overflow-hidden">{displayName}</div>
                  <div className="overflow-hidden">{element.points}</div>
                </div>
                <div className="flex justify-center items-center w-[67px]">
                  {locationConfirmed ? (
                    <Chip sx={{}} color="success" label={<Check />} />
                  ) : (
                    <Chip label={<Ban />} />
                  )}
                </div>
              </div>
              <Divider />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListsView
