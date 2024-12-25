import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom'
import Btn from 'src/pages/Btn';
import Chip from '@mui/material/Chip';
import staticImg from 'src/assets/pwa-512x512.png';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';

function AlliesList({ setValue }) {
  const [followersUids, setFollowersUids] = useState([])
  const [followingsUids, setFollowingsUids] = useState([])
  const [followers, setFollowers] = useState([])
  // const [followings, setFollowings] = useState([])
  useEffect(() => {
    const allies = async () => {
      const docRef = doc(dbservice, `members/${state.uid}`)
      const docSnap = await getDoc(docRef)
      const followersList = docSnap.data().followers || []
      const followingsList = docSnap.data().followings || []
      setFollowersUids(followersList)
      setFollowingsUids(followingsList)
      const followersCollection = []
      const followingsCollection = []

      followersList.forEach(async (element) => {
        const docRef = doc(dbservice, `members/${element}`)
        const docSnap = await getDoc(docRef)
        const follower = docSnap.data().displayName
        followersCollection.push(follower)
        setFollowers([...followersCollection, follower])
      })
      followingsList.forEach(async (element) => {
        const docRef = doc(dbservice, `members/${element}`)
        const docSnap = await getDoc(docRef)
        const following = docSnap.data().displayName
        followingsCollection.push(following)
        setFollowers([...followingsCollection, following])
      })
    }
    allies()
  }, [])
  
  return (
    <div>
    </div>
  )
}

export default AlliesList
