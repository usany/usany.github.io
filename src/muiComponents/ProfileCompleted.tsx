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
import Cards from 'src/muiComponents/Cards'
import Message from 'src/pages/Message'
import { useSelector, useDispatch } from 'react-redux'
import { changeCompletedAction } from 'src/stateSlices/completedActionSlice'

const ProfileCompleted = ({
  user,
  cards,
}) => {
  const [messagesList, setMessagesList] = useState([])
  const completedAction = useSelector(state => state.completedAction.value)
  const dispatch = useDispatch()
  
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
    }
    getMessage()
  }, [])

  // useEffect(() => {
  //   if (document.getElementById('completedAction').asChild) {
      
  //   }
  // })
  return (
    <div className='flex flex-col pt-5'>
      <Drawer>
        <DrawerTrigger id='completedAction'>
          <div onClick={() => {
            document.documentElement.scrollTo({
              top: 0,
              left: 0,
              behavior: "instant", // Optional if you want to skip the scrolling animation
            });
          }}/>
        </DrawerTrigger>
        <DrawerContent className='max-h-[50%] h-full overflow-y-scroll'>
          <ScrollArea>
            <DrawerHeader>
              완료된 {`${completedAction === 'borrow' ? '빌리기' : '빌려주기'}`}
            </DrawerHeader>
            {completedAction === 'borrow' ?
              <div className='flex justify-center flex-wrap'>
                {messagesList.map((element) => {
                  if (element.round === 5) {
                    if (element.creatorId === user.uid && element.text.choose === 1) {
                      return (
                        <Cards key={element.id} msgObj={element} isOwner={true} userObj={user} num={null} points={null} />
                      )
                    } else if (element.creatorId !== user.uid && element.text.choose === 2) {
                      return (
                        <Cards key={element.id} msgObj={element} isOwner={false} userObj={user} num={null} points={null} />
                      )
                    }
                  }
                })}
              </div>
              :
              <div className='flex justify-center flex-wrap'>
                {messagesList.map((element) => {
                  if (element.round === 5) {
                    if (element.creatorId === user.uid && element.text.choose === 2) {
                      return (
                        <Cards key={element.id} msgObj={element} isOwner={true} userObj={user} num={null} points={null} />
                      )
                    } else if (element.creatorId !== user.uid && element.text.choose === 1) {
                      return (
                        <Cards key={element.id} msgObj={element} isOwner={false} userObj={user} num={null} points={null} />
                      )
                    }
                  }
                })}
              </div>
            }
          </ScrollArea>
        </DrawerContent>
      </Drawer>
      <ChartContainer
        config={labels}
        className="aspect-square max-h-[250px] pt-5"
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
              // document.getElementById('completedAction')?.parentNode?.click()
              dispatch(changeCompletedAction(action))
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
    </div>
  );
}

export default ProfileCompleted