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

const ProfileDrawers = ({ user, cards, selection }) => {
  const [messages, setMessages] = useState([])
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
        if (cards.done.indexOf(cardId) !== -1) {
          const card = doc.data()
          messagesArray.push(card)
          setMessages(messagesArray)
        }
      })
    }
    bringMessages()
  }, [drawer])
  console.log(messages)
  return (
        <Drawer>
          <DrawerTrigger>
            <div className='p-5' onClick={() => setDrawer(true)}>
                <div>포인트</div>
                <div className='flex justify-center'>{cards.point}</div>
            </div>
          </DrawerTrigger>
          <DrawerContent className='max-h-[50%]'>
            <ScrollArea>
              <DrawerHeader>
                <DrawerTitle>{`${user.displayName}의 포인트 적립 영수증`}</DrawerTitle>
              </DrawerHeader>
              <div>
                <List 
                  sx={{bgcolor: 'background.paper' }}
                >
                  {messages.map((element, index) => {
                    return (
                      <div key={index}>
                        <ListItem>
                          <div className='flex flex-col justify-center w-screen'>
                          <div className='flex justify-center'>
                            {element.connectedName}에게 {element.text.choose === 1 ? '빌림' : '빌려줌'}
                          </div>
                          <div className='flex justify-center'>
                            {element.text.count} {element.text.counter} {element.text.counting}
                          </div>
                          <div className='flex justify-center'>
                            {element.text.clock.year}년 {element.text.clock.month}월 {element.text.clock.day}일 {element.text.clock.hour}시 {element.text.clock.minute}분부터 
                          </div>
                          <div className='flex justify-center'>
                            {element.text.clocker.year}년 {element.text.clocker.month}월 {element.text.clocker.day}일 {element.text.clocker.hour}시 {element.text.clocker.minute}분까지
                          </div>
                          <div className='flex justify-center'>
                            포인트 {element.text.choose === 1 ? '-' : '+'}{element.point}
                          </div>
                          </div>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </div>
                    )
                  })}
                </List>
              </div>
            </ScrollArea>
          </DrawerContent>
        </Drawer>
  );
}

export default ProfileDrawers