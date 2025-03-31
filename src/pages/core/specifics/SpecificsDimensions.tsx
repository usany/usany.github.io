// import { CardActionArea, CardActions } from '@mui/material';
// import { useBottomNavigationStore } from 'src/store'
import { Building, Watch } from 'lucide-react'
import Chips from 'src/myChips'

interface Props {
  message: {}
}

function SpecificsDimensions({ message }: Props) {
  return (
    <div className="flex justify-around gap-1 pt-5">
      <div className="flex items-center">
        <Building />
        <div className="px-1">전달 장소:</div>
        {/* <Chip
          label={`${message.text.count} ${message.text.counter} ${message.text.counting}`}
        /> */}
        <Chips
          label={`${message.text.count} ${message.text.counter} ${message.text.counting}`}
        />
      </div>
      <div className="flex items-center">
        <Watch />
        <div>
          <div className="flex items-center">
            <div className="px-1">대여 시간:</div>
            {/* <Chip
              label={`${message.text.clock.year}.${message.text.clock.month}.${message.text.clock.day} ${message.text.clock.hour}:${message.text.clock.minute}`}
            /> */}
            <Chips
              label={`${message.text.clock.year}.${message.text.clock.month}.${message.text.clock.day} ${message.text.clock.hour}:${message.text.clock.minute}`}
            />
          </div>
          <div className="flex items-center">
            <div className="px-1">반납 시간:</div>
            {/* <Chip
              label={`${message.text.clocker.year}.${message.text.clocker.month}.${message.text.clocker.day} ${message.text.clocker.hour}:${message.text.clocker.minute}`}
            /> */}
            <Chips
              label={`${message.text.clocker.year}.${message.text.clocker.month}.${message.text.clocker.day} ${message.text.clocker.hour}:${message.text.clocker.minute}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecificsDimensions
