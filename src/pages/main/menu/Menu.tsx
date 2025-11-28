import useTexts from 'src/hooks/useTexts'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import Accordions from './Accordions/Accordions'
import { useEffect } from 'react'
import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'

function Menu() {
  const { myStatus } = useTexts()
  useEffect(() => {
    const storage = async () => {
      const docsRef = query(collection(dbservice, 'members'))
      const docs = await getDocs(docsRef)
      console.log(docs.docs.length)
      docs.docs.forEach((element, index) => {
        const data = element.data()
        const userRef = doc(dbservice, `members/${data?.uid}`)
        console.log(index)
        if (!data.profileImage && data.defaultProfile) {
          if (data.defaultProfile.indexOf('basestorage') !== -1) {
            const image = data.defaultProfile.indexOf('plant') !== -1 ? 'animal' : 'plant'
            const color = data.profileColor
            const newUrl = `https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/${image}${color}.png`
            updateDoc(userRef, {defaultProfile: newUrl})
          }
        }
      })
    }
    storage()
  }, [])
  return (
    <div className="flex justify-center flex-col pb-5">
      <PageTitle title={myStatus} />
      <Accordions />
    </div>
  )
}

export default Menu
