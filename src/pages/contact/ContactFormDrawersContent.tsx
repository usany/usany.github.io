import TextField from '@mui/material/TextField'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { dbservice, storage } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks'
import Lists from 'src/pages/search/searchList/searchListViews/Lists'

interface Props {
  changeViolationUser: (
    newValue: {
      profileImage: boolean
      profileImageUrl: string
      defaultProfile: string
      displayName: string
    } | null,
  ) => void
}

function ContactFormDrawersContent({ changeViolationUser }: Props) {
  const [users, setUsers] = useState<{ uid: string }[]>([])
  const [loadedImage, setLoadedImage] = useState<
    { url: string; index: number }[]
  >([])
  const [userSearch, setUserSearch] = useState('')
  const languages = useSelectors((state) => state.languages.value)
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
      const newArray = docs.docs.map((document, index) => {
        getDownloadURL(ref(storage, `${document.data()?.uid}`))
          .then((url) => {
            setLoadedImage([...loadedImage, { url: url, index: index }])
          })
          .catch((error) => {
            console.log(error)
          })

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
        label={languages === 'ko' ? '유저 이름' : 'User name'}
        onChange={onChangeUserSearch}
      />
      {userSearch && (
        <div className="flex justify-center">
          <Lists
            userObj={null}
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
