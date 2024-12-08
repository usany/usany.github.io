import { useState, useEffect, useReducer } from 'react'
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { Label, Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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
import { useCompletedDrawerStore } from 'src/store'
import ProfileDrawers from 'src/muiComponents/ProfileDrawers'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Message from 'src/pages/Message'

const ProfileCards = ({
  user,
  alliesCollection
}) => {
  const [cards, setCards] = useState({point: null, done: [], borrowDone: [], lendDone: [] })
  const [chart, setChart] = useState({borrow: false, lend: true})
  // const [completedDrawer, setCompletedDrawer] = useState('')
  const [messagesList, setMessagesList] = useState([])
  const { completedDrawer, handleCompletedDrawer } = useCompletedDrawerStore()
  // const [allies, setAllies] = useState({
  //   followers: {
  //     number: null,
  //     list: null
  //   },
  //   followings: {
  //     number: null,
  //     list: null
  //   }
  // })

  useEffect(() => {
    const cards = async () => {
      const docRef = doc(dbservice, `members/${user.uid}`)
      const myDocSnap = await getDoc(docRef)
      const { points, done, borrowDoneCount, lendDoneCount } = myDocSnap.data()
      setCards({point: points, done: done, borrowDone: borrowDoneCount || [], lendDone: lendDoneCount || [] })
    }
    cards()
  }, [user])
  // useEffect(() => {
  //   const allies = async () => {
  //     const docRef = doc(dbservice, `members/${user.uid}`)
  //     const myDocSnap = await getDoc(docRef)
  //     const {followerNum, followingNum, followers, followings} = myDocSnap.data()
  //     setAllies({
  //       followers: {number: followerNum || 0, list: followers || []},
  //       followings: {number: followingNum || 0, list: followings || []}
  //     })
  //   }
  //   allies()
  // }, [])
  console.log(cards)
  const actions = [
    // { action: 'borrow', number: cards.borrowDone.length,
    //   fill: 'red'},
    // { action: 'lend', number: cards.lendDone.length,
    //   fill: 'blue'},
    { action: 'borrow', number: cards.borrowDone.length,
      fill: '#e76e50'},
    { action: 'lend', number: cards.lendDone.length,
      fill: '#7fc4bc'},
  ]
  const labels = {
    number: {
      label: 'total',
    },
    borrow: {
      label: '빌리기',
      color: '#e76e50',
    },
    lend: {
      label: '빌려주기',
      color: '#7fc4bc',
    },
  } satisfies ChartConfig
  const totalNumber = actions.reduce((acc, curr) => acc + curr.number, 0)
  
  useEffect(() => {
    const getMessage = async () => {
      const messagesRef = query(collection(dbservice, 'num'))
      const querySnap = await getDocs(messagesRef)
      const messagesArray = []
      querySnap.forEach((docSnap) => {
        const messageId = docSnap.id
        const messageObj = docSnap.data()
        const message = {id: messageId, ...messageObj}
        if (messageObj.creatorId === user.uid || messageObj.connectedId === user.uid) {
          messagesArray.push(message)
        }
      })
      setMessagesList(messagesArray)
      // const messagesList = state.cards.done.map(async (element) => {
      //   const docRef = query(collection(dbservice, `num`))
      //   const docSnap = await getDoc(docRef)
      //   const messageId = docSnap.id
      //   const message = docSnap.data() 
      //   messagesArray.push({messageId, message})
      //   return {messageId, message}
      // })
      // console.log(messagesArray[0])
      // setMessagesList(messagesList)
    }
    getMessage()
  }, [])

  return (
    <div className='flex flex-col'>
    <div className='flex justify-center'>
      <Card>
        <CardActionArea>
          {/* <Link 
            to='/points'
            state={{
              user: user,
              cards: cards,
            }}
          >
            <div className='p-5'>
              <div>포인트</div>
              <div className='flex justify-center'>{cards.point}</div>
            </div>
          </Link> */}
          <ProfileDrawers user={user} cards={cards} followers={null} alliesCollection={null} selection={'points'}/>
        </CardActionArea>
      </Card>
      <Card>
        <CardActionArea>
          {/* <Link to='/allies' 
            state={{
              user: user,
              followers: true,
              alliesCollection: allies.followers.list,
          }}>
            <div className='p-5'>
              <div>
                팔로워
              </div>
              <div className='flex justify-center'>
                {allies.followers.number}명 
              </div>
            </div>
          </Link> */}
          <ProfileDrawers user={user} cards={null} followers={true} alliesCollection={alliesCollection[0].list} selection={'allies'}/>
        </CardActionArea>
      </Card>
      <Card>
        <CardActionArea>
          {/* <Link to='/allies' 
            state={{
              user: user,
              followers: false,
              alliesCollection: allies.followings.list
          }}>
            <div className='p-5'>
              <div className='flex justify-center'>
                팔로잉
              </div>
              <div className='flex justify-center'>
                {allies.followings.number}명
              </div>
            </div>
          </Link> */}
          <ProfileDrawers user={user} cards={null} followers={false} alliesCollection={alliesCollection[1].list} selection={'allies'}/>
        </CardActionArea>
      </Card>
    </div>
    {/* <div className='flex justify-center'>
          <Card>
            <CardActionArea>
              <Link 
                to='/actions'
                state={{
                  user: user,
                  actions: 'completedLend', 
                  cards: cards,
                  lendRegisteredMessage: lendRegisteredMessage,
                  lendMessage: lendMessage,
                  borrowRegisteredMessage: borrowRegisteredMessage,
                  borrowMessage: borrowMessage
                }}
              >
              <div className='p-5'>
                <div>완료된 빌려주기</div>
                <div className='flex justify-center'>{cards.lendDone.length}회</div>
              </div>
              </Link>
            </CardActionArea>
          </Card>
          <Card>
            <CardActionArea>
              <Link 
                to='/actions'
                state={{
                  user: user,
                  actions: 'completedBorrow', 
                  cards: cards,
                  lendRegisteredMessage: lendRegisteredMessage,
                  lendMessage: lendMessage,
                  borrowRegisteredMessage: borrowRegisteredMessage,
                  borrowMessage: borrowMessage
                }}
              >
              <div className='p-5'>
                <div>완료된 빌리기</div>
                <div className='flex justify-center'>{cards.borrowDone.length}회</div>
              </div>
              </Link>
            </CardActionArea>
          </Card>
        </div> */}
        <Drawer>
          <DrawerTrigger>
            <div id='completedAction' />
          </DrawerTrigger>
          <DrawerContent className='max-h-[50%] h-full overflow-y-scroll'>
            <ScrollArea>
              <DrawerHeader>
                완료된 {`${completedDrawer === 'borrow' ? '빌리기' : '빌려주기'}`}
              </DrawerHeader>
              {completedDrawer === 'borrow' ?
                <div className='flex justify-center flex-wrap'>
                  {messagesList.map((element) => {
                    if (element.text.choose === 1 && element.round === 5) {
                      console.log(element)
                      return (
                        <Message key={element.id} msgObj={element} isOwner={element.creatorId === user.uid} userObj={user} />
                        // <div>
                        //   <Message key={element.id} msgObj={element} isOwner={element.creatorId === user.uid} userObj={user} />
                        //   <Message key={element.id} msgObj={element} isOwner={element.creatorId === user.uid} userObj={user} />
                        // </div>
                      )
                    }
                  })}
                  {/* {state.lendRegisteredMessage.map((msg) => <Message key={msg.id} msgObj={msg} isOwner={true} userObj={userObj} />)}
                  {state.lendMessage.map((msg) => <Message key={msg.id} msgObj={msg} isOwner={false} userObj={userObj} />)} */}
                </div>
                :
                <div className='flex justify-center flex-wrap'>
                  {messagesList.map((element) => {
                    if (element.text.choose === 2 && element.round === 5) {
                      return <Message key={element.id} msgObj={element} isOwner={element.creatorId === user.uid} userObj={user} />
                    }
                  })}
                  {/* {state.lendRegisteredMessage.map((msg) => <Message key={msg.id} msgObj={msg} isOwner={true} userObj={userObj} />)}
                  {state.lendMessage.map((msg) => <Message key={msg.id} msgObj={msg} isOwner={false} userObj={userObj} />)} */}
                </div>
              }
            </ScrollArea>
          </DrawerContent>
        </Drawer>
        {/* <Drawer>
          <DrawerTrigger>
            <div id='lendCompleted' />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className='max-h-[50%]'>
              완료된 빌려주기
            </DrawerHeader>
          lendCompleted
          </DrawerContent>
        </Drawer> */}
        <ChartContainer
          config={labels}
          className="aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartLegend
              content={
                <ChartLegendContent nameKey="action" /> 
              }
              className="text-base font-bold gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              verticalAlign='top'
            />
            <Pie
              data={actions}
              dataKey="number"
              nameKey="action"
              onClick={(value) => {
                const action = value.action
                document.getElementById('completedAction')?.parentNode?.click()
                handleCompletedDrawer(action)
              }}
              innerRadius={60}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalNumber.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                        >
                          활동 횟수
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        {/* <ChartContainer
          config={labels}
          className="aspect-square max-h-[250px]"
        >
          <PieChart>
          <Pie
              data={actions}
              dataKey="number"
              nameKey="action"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalNumber.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          활동 횟수
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="action" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer> */}
    </div>
  );
}

export default ProfileCards