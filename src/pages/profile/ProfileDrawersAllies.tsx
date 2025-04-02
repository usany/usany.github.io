import {
  DrawerClose
} from "@/components/ui/drawer";
import Divider from '@mui/material/Divider';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dbservice } from 'src/baseApi/serverbase';
import Avatars from "../core/Avatars";

const ProfileDrawersAllies = ({ followers, alliesCollection }) => {
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

  const alliesList = elements?.map((element, index) => {
    return (
      <DrawerClose key={index}>
        <Link to='/profile'
          state={{
            element: element,
          }}
          onClick={() => {
            setElements([])
          }}
        >
          <div className='flex justify-between items-center'>
            <Avatars element={element} uid={element.uid} profileColor={element.profileColor} profileUrl={element.profileUrl} profile={false} piazza={null} />
            {/* <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || '#2196f3' }} src="./src" /> */}
            <div className='overflow-hidden'>
              {element.displayName}
            </div>
            <Divider variant='inset' />
          </div >
        </Link>
      </DrawerClose>
    )
  })

  return (
    <div>
      {alliesList.length === 0 ?
        <div className='flex justify-center'>
          <div className='border border-dashed p-5'>
            {followers ? '팔로워가' : '팔로잉이'} 없습니다
          </div>
        </div>
        :
        <div>{alliesList}</div>
      }
    </div>
  );
}

export default ProfileDrawersAllies
