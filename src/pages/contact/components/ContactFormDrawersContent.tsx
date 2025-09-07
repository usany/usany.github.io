import TextField from '@mui/material/TextField'
import { collection, DocumentData, getDocs, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import { useTexts } from 'src/hooks'
import Lists from 'src/pages/search/searchList/searchListViews/Lists'

interface Props {
  changeViolationUser: (
    newValue: DocumentData | null,
  ) => void
}

function ContactFormDrawersContent({ changeViolationUser }: Props) {
  const [users, setUsers] = useState<DocumentData[]>([])
  const [userSearch, setUserSearch] = useState('')
  const {userName} = useTexts()
  const onChangeUserSearch = (event: { target: { value: string } }) => {
    const {
      target: { value },
    } = event
    setUserSearch(value)
  }

  useEffect(() => {
    const searchingMembersList = async () => {
      const collectionQuery = query(
        collection(dbservice, 'members'),
        orderBy('points', 'desc'),
      )
      const docs = await getDocs(collectionQuery)
      const newArray = docs.docs.map((document) => {
        return {
          ...document.data(),
        }
      })
      setUsers(newArray)
    }
    searchingMembersList()
  }, [])

  return (
    <div className={`flex flex-col p-5 ${!userSearch && 'h-[60vh]'}`}>
      <TextField
        label={userName}
        onChange={onChangeUserSearch}
      />
      {userSearch && (
        <div className="flex justify-center">
          <Lists
            elements={users}
            multiple={true}
            userSearch={userSearch}
            ranking={false}
            handleUser={changeViolationUser}
          />
        </div>
      )}
    </div>
  )
}

export default ContactFormDrawersContent
