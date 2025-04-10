// import { CardActionArea, CardActions } from '@mui/material';
// import { useBottomNavigationStore } from 'src/store'
import { Chip } from '@mui/material'
import { Building, Watch } from 'lucide-react'
import { useSelectors } from 'src/hooks/useSelectors'

interface Props {
  message: {}
}

function SpecificsDimensions({ message }: Props) {
  const languages = useSelectors((state) => state.languages.value)
  return (
    <div className="flex justify-around gap-1 pt-5">
      <div className="flex items-center">
        <Building />
        <div className="px-1">{languages === 'ko' ? '전달 장소:' : 'Passing location: '}</div>
        <Chip
          label={`${message.text.count} ${message.text.counter} ${message.text.counting}`}
        />
        {/* <Chips
          label={`${message.text.count} ${message.text.counter} ${message.text.counting}`}
        /> */}
      </div>
      <div className="flex items-center">
        <Watch />
        <div>
          <div className="flex items-center">
            <div className="px-1">{languages === 'ko' ? '대여 시간:' : 'Passing time:'}</div>
            <Chip
              label={`${message.text.clock.year}.${message.text.clock.month}.${message.text.clock.day} ${message.text.clock.hour}:${message.text.clock.minute}`}
            />
            {/* <Chips
              label={`${message.text.clock.year}.${message.text.clock.month}.${message.text.clock.day} ${message.text.clock.hour}:${message.text.clock.minute}`}
            /> */}
          </div>
          <div className="flex items-center">
            <div className="px-1">{languages === 'ko' ? '반납 시간:' : 'Returning time:'}</div>
            < Chip
              label={`${message.text.clocker.year}.${message.text.clocker.month}.${message.text.clocker.day} ${message.text.clocker.hour}:${message.text.clocker.minute}`}
            />
            {/* <Chips
              label={`${message.text.clocker.year}.${message.text.clocker.month}.${message.text.clocker.day} ${message.text.clocker.hour}:${message.text.clocker.minute}`}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecificsDimensions
