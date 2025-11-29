import useTexts from 'src/hooks/useTexts'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import Accordions from './Accordions/Accordions'
// import { useEffect } from 'react'
// import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore'
// import { dbservice } from 'src/baseApi/serverbase'

function Menu() {
  const { myStatus } = useTexts()
  // useEffect(() => {
  //   const storage = async () => {
  //     const docsRef = query(collection(dbservice, 'num'))
  //     const docs = await getDocs(docsRef)
  //     docs.docs.forEach((element, index) => {
  //       const userRef = doc(dbservice, `num/${element.id}`)
  //       console.log(element)
  //       if (element.data().text.count === '중도') {
  //         updateDoc(userRef, {text: {...element.data().text, count: '서울 중도'}})
  //       }
  //     })
  //   }
  //   storage()
  // }, [])
  return (
    <div className="flex justify-center flex-col pb-5">
      <PageTitle title={myStatus} />
      <Accordions />
    </div>
  )
}

export default Menu
