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
import Points from 'src/pages/Points'
import ProfileDrawers from 'src/muiComponents/ProfileDrawers'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

const ProfileCards = ({
  user,
  allies
}) => {
  const [cards, setCards] = useState({point: null, done: [], borrowDone: [], lendDone: [] })
  const [chart, setChart] = useState({borrow: false, lend: true})
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
  console.log(allies)
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
          <ProfileDrawers user={user} cards={null} followers={true} alliesCollection={allies.followers.list} selection={'allies'}/>
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
          <ProfileDrawers user={user} cards={null} followers={false} alliesCollection={allies.followings.list} selection={'allies'}/>
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
        <div id='drawer'>
          <Drawer>
            <DrawerContent>
              practice
            </DrawerContent>
          </Drawer>
        </div>
        <ChartContainer
          config={labels}
          className="aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartLegend
              content={<ChartLegendContent nameKey="action" />}
              className="gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              verticalAlign='top'
            />
            <Pie
              data={actions}
              dataKey="number"
              nameKey="action"
              onClick={(value) => {
                const action = value.action
                document.getElementById('drawer')?.childNodes
                console.log(document.getElementById('drawer')?.childNodes)
              }}
              // labelLine={false}
              // label={({ payload, ...props }) => {
              //   return (
              //     <text
              //       cx={props.cx}
              //       cy={props.cy}
              //       x={props.x}
              //       y={props.y}
              //       textAnchor={props.textAnchor}
              //       dominantBaseline={props.dominantBaseline}
              //       fill="hsla(var(--foreground))"
              //     >
              //       <Drawer>
              //         <createPortal>
              //           <DrawerTrigger>
              //             <div className='p-5'>
              //                 <div>포인트</div>
              //                 <div className='flex justify-center'>{cards.point}</div>
              //             </div>
              //           </DrawerTrigger>
              //         </createPortal>
              //         <DrawerContent className='max-h-[50%]'>
              //           <ScrollArea>
              //             <DrawerHeader>
              //               <DrawerTitle>{`${user.displayName}의 포인트 적립 영수증`}</DrawerTitle>
              //             </DrawerHeader>
              //             <div>
              //               <List 
              //                 sx={{bgcolor: 'background.paper' }}
              //               >
              //                     <div>
              //                       practice
              //                     </div>
              //               </List>
              //             </div>
              //           </ScrollArea>
              //         </DrawerContent>
              //       </Drawer>
              //       <Drawer>
              //           practice
              //       {payload.action === 'borrow' ? '빌리기' : '빌려주기'} {payload.number}회
              //       </Drawer>
              //     </text>
              //   )
              // }}
            />
            {/* <ChartLegend
              content={<ChartLegendContent nameKey="action" />}
              className="gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            /> */}
          </PieChart>
        </ChartContainer>
        <ChartContainer
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
        </ChartContainer>
    </div>
  );
}

export default ProfileCards