import { useState, useEffect, useReducer } from 'react'
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { Label, Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import Points from 'src/pages/Points'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Checklist from '@mui/icons-material/Checklist'
import TextField from '@mui/material/TextField';
import { blue } from '@mui/material/colors';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

const ProfileDrawers = ({ user, cards, followers, alliesCollection, selection }) => {
  const [messages, setMessages] = useState([])
  // const [pointsDrawer, setPointsDrawer] = useState(false)
  // const [alliesDrawer, setAlliesDrawer] = useState(false)
  const [elements, setElements] = useState([])
  const [drawer, setDrawer] = useState(false)
  // const {state} = useLocation()
  // const navigate = useNavigate()
  useEffect(() => {
    const bringMessages = async () => {
      const messagesArray = []
      const messageRef = query(collection(dbservice, 'num'), orderBy("creatorClock", "desc"),)
      const messageSnap = await getDocs(messageRef)
      messageSnap.forEach((doc) => {
        const cardId = doc.id
        // if (state.cards.done.indexOf(cardId) !== -1) {
        //   const card = doc.data()
        //   messagesArray.push(card)
        //   setMessages(messagesArray)
        // }
        if (cards?.done.indexOf(cardId) !== -1) {
          const card = doc.data()
          messagesArray.push(card)
          setMessages(messagesArray)
        }
      })
    }
    if (cards) {
      bringMessages()
    }
  }, [cards])
  console.log(alliesCollection)
  useEffect(() => {
    if (alliesCollection) {
      usersCollection()
      // console.log('practice')
    }
  }, [alliesCollection])
  const usersCollection = async () => {
    // const followersCollection = []
    // const followingsCollection = []
    const elementsCollection = []
    const collectionRef = collection(dbservice, 'members')
    const docs = await getDocs(query(collectionRef, orderBy('points', 'desc')))
    docs.forEach((element) => {
      if (alliesCollection?.indexOf(element.data().uid) !== -1) {
        elementsCollection.push(element.data())
        setElements(elementsCollection)
      }
      // if (state.alliesCollection.indexOf(element.data().uid) !== -1) {
      //   elementsCollection.push(element.data())
      //   setFollowings(followingsCollection)
      // }
    })
  }

  return (
    <ClickAwayListener onClickAway={() => {
      console.log('practice')
      setDrawer(!drawer)
    }}>
        <Drawer>
          <DrawerTrigger>
            {selection === 'points' && 
              <div className='p-5'>
                <div>포인트</div>
                <div className='flex justify-center'>{cards.point}</div>
              </div>
            }
            {selection === 'allies' && 
              <div className='p-5'>
                <div>
                  {followers ? '팔로워' : '팔로잉'}
                </div>
                <div className='flex justify-center'>
                  {alliesCollection.length}명 
                </div>
              </div>
            }
          </DrawerTrigger>
          <DrawerContent className='max-h-[50%]'>
            <ScrollArea>
              <DrawerHeader>
                {selection === 'points' &&
                  <DrawerTitle>{`${user.displayName}의 포인트 적립 영수증`}</DrawerTitle>
                }
                {selection === 'allies' &&
                  <DrawerTitle>{user.displayName}의 {followers ? '팔로워' : '팔로잉'}</DrawerTitle>
                }
              </DrawerHeader>
                <List 
                  sx={{bgcolor: 'background.paper' }}
                >
                  {selection === 'points' && messages.map((element, index) => {
                    return (
                      <div key={index}>
                        <div className='flex flex-col justify-center w-screen'>
                          {user.uid === element.creatorId && 
                            <div className='flex justify-center'>
                              {element.connectedName}에게 {element.text.choose === 1 ? '빌림' : '빌려줌'}
                            </div>
                          }
                          {user.uid === element.connectedId && 
                            <div className='flex justify-center'>
                              {element.displayName}에게 {element.text.choose === 1 ? '빌려줌' : '빌림'}
                            </div>
                          }
                          <div className='flex justify-center'>
                            {element.text.count} {element.text.counter} {element.text.counting}
                          </div>
                          <div className='flex justify-center'>
                            {element.text.clock.year}년 {element.text.clock.month}월 {element.text.clock.day}일 {element.text.clock.hour}시 {element.text.clock.minute}분부터 
                          </div>
                          <div className='flex justify-center'>
                            {element.text.clocker.year}년 {element.text.clocker.month}월 {element.text.clocker.day}일 {element.text.clocker.hour}시 {element.text.clocker.minute}분까지
                          </div>
                          {user.uid === element.creatorId && 
                            <div className='flex justify-center'>
                              포인트 {element.text.choose === 1 ? '-' : '+'}{element.point}
                            </div>
                          }
                          {user.uid === element.connectedId && 
                            <div className='flex justify-center'>
                              포인트 {element.text.choose === 1 ? '+' : '-'}{element.point}
                            </div>
                          }
                        </div>
                        <Divider variant="inset" component="li" />
                      </div>
                    )
                  })}
                  {selection === 'allies' && 
                    elements?.map((element, index) => {
                      return (
                        <div key={index} className='flex justify-between w-screen px-5'>
                          <div>
                            <ListItemAvatar>
                              <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || blue[500] }} src="./src" />
                            </ListItemAvatar>
                          </div>
                          <div>
                            <div className='flex flex-col overflow-hidden'>
                              <div>
                                {element.displayName}
                              </div>
                              <div>
                                {element.points}
                              </div>
                            </div>
                          </div>
                          <>
                            <IconButton aria-label="comment">
                              <Link to='/profile'
                                state = {{
                                  element: element,
                                }}
                                onClick={() => {
                                  setElements([])
                                }}
                              >
                                <DrawerClose>
                                  <CommentIcon onClick={() => {
                                    setElements([])
                                  }}/>
                                </DrawerClose>
                              </Link>
                            </IconButton>
                          </>
                          {/* <div>
                            <IconButton aria-label="comment">
                              <Link to='/profile'
                                state = {{
                                  element: element,
                                }}
                              >
                                <CommentIcon />
                              </Link>
                            </IconButton>
                          </div> */}
                          {/* <Divider variant="inset" component="li" /> */}
                        </div>
                      )
                    })
                  }
                </List>
            </ScrollArea>
          </DrawerContent>
        </Drawer>
        </ClickAwayListener>
  );
}

export default ProfileDrawers