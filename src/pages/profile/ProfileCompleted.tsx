import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { useDispatch } from 'react-redux'
import { Label, Pie, PieChart } from 'recharts'
import { useSelectors } from 'src/hooks'
import { changeCompletedAction } from 'src/stateSlices/completedActionSlice'
import Carousels from '../core/specifics/Carousels'
import ProfileCompletedContent from './ProfileCompletedContent'
import { useLocation } from 'react-router-dom'

const ProfileCompleted = ({ cards }) => {
  const {state} = useLocation()
  const dispatch = useDispatch()
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)
  const user = state?.element || profile
  const actions = [
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

  return (
    <div className="flex flex-col">
      <ChartContainer
        config={labels}
        className="aspect-square max-h-[250px] pt-5"
      >
        <PieChart>
          <ChartLegend
            content={<ChartLegendContent nameKey="action" />}
            className="text-base font-bold gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            verticalAlign="bottom"
          />
          <Pie
            data={actions}
            dataKey="number"
            nameKey="action"
            onClick={(value) => {
              const action = value.action
              dispatch(changeCompletedAction(action))
            }}
            innerRadius={60}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" onClick={() => {
                      dispatch(changeCompletedAction(''))
                    }}>
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
          <ChartLegend
            content={<ChartLegendContent nameKey="action" />}
            className="text-base font-bold gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            verticalAlign="top"
          />
        </PieChart>
      </ChartContainer>
      {cards.done && <Carousels user={user} cards={<ProfileCompletedContent user={user} />} />}
    </div>
  )
}

export default ProfileCompleted
