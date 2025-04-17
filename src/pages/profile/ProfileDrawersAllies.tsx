import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { dbservice } from 'src/baseApi/serverbase';
import { DrawerClose } from 'src/components/ui/drawer';
import ProfileLists from '../search/searchList/searchListViews/ProfileLists';

const ProfileDrawersAllies = ({ user, followers, alliesCollection }) => {
  const [elements, setElements] = useState([])

  const usersCollection = async () => {
    const elementsCollection = []
    const collectionRef = collection(dbservice, 'members')
    const docs = await getDocs(query(collectionRef, orderBy('points', 'desc')))
    docs.forEach((element) => {
      if (alliesCollection?.indexOf(element.data().uid) !== -1) {
        elementsCollection.push(element.data())
        setElements(elementsCollection)
      }
    })
  }
  useEffect(() => {
    if (alliesCollection) {
      usersCollection()
    }
  }, [alliesCollection])

  const AlliesList = () => {
    return (
      <DrawerClose>
        {/* <Lists
          userObj={user}
          elements={elements}
          multiple={true}
          userSearch={null}
          ranking={false}
          handleUser={null}
        /> */}
        <ProfileLists
          elements={elements}
          multiple={true}
          userSearch={null}
          handleUser={null}
        />
      </DrawerClose>
    )
  }
  // const alliesList = elements?.map((element, index) => {
  //   return (
  //     <div key={index}>
  //       <Link to='/profile'
  //         state={{
  //           element: element,
  //         }}
  //         onClick={() => {
  //           setElements([])
  //         }}
  //       >
  //         <DrawerClose>
  //           <div>practice</div>
  //           <Lists
  //             userObj={user}
  //             elements={elements}
  //             multiple={true}
  //             userSearch={null}
  //             ranking={true}
  //             handleUser={null}
  //           />
  //         </DrawerClose>
  //       </Link>
  //       <Divider variant='inset' />
  //     </div>
  //   )
  // })

  return (
    <div>
      {elements.length === 0 ?
        <div className='flex justify-center'>
          <div className='border border-dashed p-5'>
            {followers ? '팔로워가' : '팔로잉이'} 없습니다
          </div>
        </div>
        :
        <AlliesList />
      }
    </div>
  );
}

export default ProfileDrawersAllies
