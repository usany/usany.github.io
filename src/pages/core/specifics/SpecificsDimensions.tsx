import { Chip } from '@mui/material'
import { Building, Watch } from 'lucide-react'
import useLargeMedia from 'src/hooks/useLargeMedia'
import { useSelectors, useTexts } from 'src/hooks'
import locationsBuildings from 'src/pages/add/locationsBuildings'
import locationsCollection from 'src/pages/add/locationsCollection'
import locationsCollectionLetters from 'src/pages/add/locationsCollectionLetters'

const getLocation = (message) => {
  const languages = useSelectors((state) => state.languages.value)
  if (languages === 'ko') {
    const location =
      message.text.count +
      ' ' +
      message.text.counter +
      ' ' +
      message.text.counting
    return location
  }
  const locationOne =
    locationsBuildings['en'][
    locationsBuildings['ko'].indexOf(message.text.count)
    ]
  const locationTwo =
    locationsCollection['en'][
    Object.keys(locationsCollectionLetters).find(
      (key) => locationsCollectionLetters[key] === message.text.count,
    )
    ][
    locationsCollection['ko'][
      Object.keys(locationsCollectionLetters).find(
        (key) => locationsCollectionLetters[key] === message.text.count,
      )
    ].indexOf(message.text.counter)
    ]
  const location = locationOne + ' ' + locationTwo + ' ' + message.text.counting
  return location
}

interface Props {
  message: {}
}

function SpecificsDimensions({ message }: Props) {
  const languages = useSelectors((state) => state.languages.value)
  const largeMedia = useLargeMedia()
  const location = getLocation(message)
  const {meetingAt} = useTexts()
  return (
    <div
      className={`flex text-xs scale-90 ${!largeMedia && 'flex-col'} justify-around gap-1 pt-5`}
    >
      <div className="flex items-center">
        <div className='w-[20px]'>
          <Building />
        </div>
        <div className="px-1">
          {meetingAt}
        </div>
        <Chip
          className='specific'
          size="small"
          label={location} />
      </div>
      <div className="flex items-center">
        <div className='w-[20px]'>
          <Watch />
        </div>
        <div className={`${!largeMedia && 'flex'}`}>
          <div className="flex items-center">
            <div className="px-1">
              {languages === 'ko' ? (
                '대여 시간:'
              ) : (
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <div>Passing at</div>
                  </div>
                </div>
              )}
            </div>
            <Chip
              className='specific'
              size="small"
              label={`${message.text.clock.year}.${message.text.clock.month}.${message.text.clock.day} ${message.text.clock.hour}:${message.text.clock.minute}`}
            />
          </div>
          <div className="flex items-center">
            <div className="px-1">
              {languages === 'ko' ? (
                '반납 시간:'
              ) : (
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <div>Returning at</div>
                  </div>
                </div>
              )}
            </div>
            <Chip
              className='specific'
              size="small"
              label={`${message.text.clocker.year}.${message.text.clocker.month}.${message.text.clocker.day} ${message.text.clocker.hour}:${message.text.clocker.minute}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecificsDimensions
