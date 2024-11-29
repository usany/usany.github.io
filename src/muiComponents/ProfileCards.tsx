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
import Points from 'src/pages/Points'
const ProfileCards = ({
  user,
  allies
}) => {
  const [cards, setCards] = useState({point: null, done: [], borrowDone: [], lendDone: [] })
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
      fill: 'red'},
    { action: 'lend', number: cards.lendDone.length,
      fill: 'blue'},
  ]
  const labels = {
    number: {
      label: 'total',
    },
    borrow: {
      label: 'borrow',
      color: '#2563eb',
    },
    lend: {
      label: 'lend',
      color: '#60a5fa',
    },
  } satisfies ChartConfig
  const totalNumber = actions.reduce((acc, curr) => acc + curr.number, 0)

  return (
    <div className='flex flex-col'>
    <div className='flex justify-center'>
      <Card>
        <CardActionArea>
        <Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent className='max-h-[50%] overflow-y-scroll'>
    <Points user={user} cards={cards}/>
    <Points user={user} cards={cards}/>
    <Points user={user} cards={cards}/>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      {/* <Points /> */}
    </DrawerFooter>
  </DrawerContent>
</Drawer>
          <Link 
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
          </Link>
        </CardActionArea>
      </Card>
      <Card>
        <CardActionArea>
          <Link to='/allies' 
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
          </Link>
        </CardActionArea>
      </Card>
      <Card>
        <CardActionArea>
          <Link to='/allies' 
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
          </Link>
        </CardActionArea>
      </Card>
    </div>
    <div className='flex justify-center'>
          <Card>
            <CardActionArea>
              <Link 
                to='/actions'
                state={{
                  user: user,
                  actions: 'completedLend', 
                  cards: cards,
                  // lendRegisteredMessage: lendRegisteredMessage,
                  // lendMessage: lendMessage,
                  // borrowRegisteredMessage: borrowRegisteredMessage,
                  // borrowMessage: borrowMessage
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
                  // lendRegisteredMessage: lendRegisteredMessage,
                  // lendMessage: lendMessage,
                  // borrowRegisteredMessage: borrowRegisteredMessage,
                  // borrowMessage: borrowMessage
                }}
              >
              <div className='p-5'>
                <div>완료된 빌리기</div>
                <div className='flex justify-center'>{cards.borrowDone.length}회</div>
              </div>
              </Link>
            </CardActionArea>
          </Card>
        </div>
        <ChartContainer
          config={labels}
          className="aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' hideLabel />}
            />
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
          </PieChart>
        </ChartContainer>
    </div>
  );
}

export default ProfileCards