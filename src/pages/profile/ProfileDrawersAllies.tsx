import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { dbservice } from 'src/baseApi/serverbase';
import { DrawerClose } from 'src/components/ui/drawer';
import ProfileLists from '../search/searchList/searchListViews/ProfileLists';

const ProfileDrawersAllies = ({ companies }) => {

  return (
    <div className="flex flex-col justify-center p-5">
      <DrawerClose>
        <ListsView
          elements={companies}
          multiple={true}
          userSearch={null}
          handleUser={null}
        />
      </DrawerClose>
    </div>
  );
}

export default ProfileDrawersAllies
