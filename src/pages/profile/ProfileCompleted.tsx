import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { collection, getDocs, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Label, Pie, PieChart } from 'recharts'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors'
import Cards from 'src/pages/core/card/Cards'
import { changeCompletedAction } from 'src/stateSlices/completedActionSlice'
import Popups from '../core/Popups'
import ProfileCompletedContent from './ProfileCompletedContent'
import ProfileCompletedTitle from './ProfileCompletedTitle'

const ProfileCompleted = ({ user, cards }) => {
  const [messagesList, setMessagesList] = useState([])
  const completedAction = useSelector((state) => state.completedAction.value)
  const dispatch = useDispatch()
  const languages = useSelectors((state) => state.languages.value)
  const actions = [
    // { action: 'borrow', number: cards.borrowDone.length,
    //   fill: 'red'},
    // { action: 'lend', number: cards.lendDone.length,
    //   fill: 'blue'},
    {
      action: 'borrow',
      number: cards.borrowDone.length,
      fill: '#e76e50',
    },
    {
      action: 'lend',
      number: cards.lendDone.length,
      fill: '#7fc4bc',
    },
  ]
  const labels = {
    number: {
      label: 'total',
    },
    borrow: {
      label: languages === 'ko' ? '빌리기' : 'Borrowing',
      color: '#e76e50',
    },
    lend: {
      label: languages === 'ko' ? '빌려주기' : 'Lending',
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
        const message = { id: messageId, ...messageObj }
        if (
          messageObj.creatorId === user.uid ||
          messageObj.connectedId === user.uid
        ) {
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
  console.log(messagesList)
  const borrowList = messagesList
    .map((element) => {
      if (element.round === 5) {
        if (element.creatorId === user.uid && element.text.choose === 1) {
          return (
            <Cards
              key={element.id}
              message={element}
              isOwner={true}
              userObj={user}
              num={null}
              points={null}
            />
          )
        } else if (
          element.creatorId !== user.uid &&
          element.text.choose === 2
        ) {
          return (
            <Cards
              key={element.id}
              message={element}
              isOwner={false}
              userObj={user}
              num={null}
              points={null}
            />
          )
        }
      }
    })
    .filter((element) => {
      if (element) return element
    })
  const lendList = messagesList
    .map((element) => {
      if (element.round === 5) {
        if (element.creatorId === user.uid && element.text.choose === 2) {
          return (
            <Cards
              key={element.id}
              message={element}
              isOwner={true}
              userObj={user}
              num={null}
              points={null}
            />
          )
        } else if (
          element.creatorId !== user.uid &&
          element.text.choose === 1
        ) {
          return (
            <Cards
              key={element.id}
              message={element}
              isOwner={false}
              userObj={user}
              num={null}
              points={null}
            />
          )
        }
      }
    })
    .filter((element) => {
      if (element) return element
    })
  return (
    <div className="flex flex-col pt-5">
      <Popups
        trigger={<div id="completedAction" />}
        title={<ProfileCompletedTitle />}
        content={<ProfileCompletedContent user={user} />}
      />
      <ChartContainer
        config={labels}
        className="aspect-square max-h-[250px] pt-5"
      >
        <PieChart>
          <ChartLegend
            content={<ChartLegendContent nameKey="action" />}
            className="text-base font-bold gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            verticalAlign="top"
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
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
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
                        className="fill-foreground"
                      >
                        {languages === 'ko' ? '활동 횟수' : 'Activities Count'}
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
  )
}

export default ProfileCompleted
