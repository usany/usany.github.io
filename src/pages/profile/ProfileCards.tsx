import { useState, useEffect, useReducer } from 'react'
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import ProfileDrawers from 'src/pages/profile/ProfileDrawers'

const ProfileCards = ({
  user,
  alliesCollection,
  cards,
}) => {

  return (
    <div className='flex flex-col pt-5'>
      <div className='flex justify-center'>
        <Card>
          <CardActionArea>
            <ProfileDrawers user={user} cards={cards} followers={null} alliesCollection={null} selection={'points'}/>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea>
            <ProfileDrawers user={user} cards={null} followers={true} alliesCollection={alliesCollection[0].list} selection={'allies'}/>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea>
            <ProfileDrawers user={user} cards={null} followers={false} alliesCollection={alliesCollection[1].list} selection={'allies'}/>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}

export default ProfileCards