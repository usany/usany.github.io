import { Chip } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Building, Watch } from 'lucide-react'
import { AnimatedList } from 'src/components/ui/animated-list'
import { useSelectors } from 'src/hooks'
import Avatars from 'src/pages/core/Avatars'
import { staticArray } from '../core/card/CardView'
import locationsBuildings from './locationsBuildings'
import locationsCollection from './locationsCollection'
import locationsCollectionLetters from './locationsCollectionLetters'
import { DocumentData } from 'firebase/firestore'

interface Props {
  borrow: boolean
  item: string
  fromTo: object
  locationState: object
  display: DocumentData
}
const AddCards = ({ borrow, item, fromTo, locationState, display }: Props) => {
  const profile = useSelectors((state) => state.profile.value)
  const shadowColorArray = [
    'lightblue',
    'lightcoral',
    'lightcyan',
    'lightgoldenrodyellow',
    'lightgray',
    'lightgreen',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'lightsteelblue',
    'lightyellow',
  ]
  const alpha = Array.from(Array(26)).map((e, i) => i + 65)
  const letters = alpha.map((x) => String.fromCharCode(x))
  const shadowColor = display ? shadowColorArray[
        letters.indexOf(String(display.id[0]).toUpperCase()) %
          shadowColorArray.length
      ] : undefined
  const languages = useSelectors((state) => state.languages.value)
  const locationOne = locationState?.locationOne
  const staticImg = staticArray[locationOne] || staticArray['building']
  return (
    <div className="flex justify-center text-sm pt-5 p-1">
      <AnimatedList>
        <Card
          className="colorTwo"
          sx={{
            width: 200 * 0.9,
            height: 280 * 0.9,
            boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`,
          }}
        >
          <CardContent sx={{ padding: '5px' }}>
            <div>
              <div className="flex justify-between gap-1">
                <Avatars element={profile} profile={false} piazza={null} />
                {item && (
                  <div className="flex items-center">
                    <Chip
                      label={
                        <div className="text-xs">
                          {languages === 'ko'
                            ? item
                            : item === '우산'
                            ? 'Umbrella'
                            : 'Yangsan'}{' '}
                          {languages === 'ko'
                            ? borrow
                              ? ' 빌리기'
                              : ' 빌려주기'
                            : borrow
                            ? ' borrowing'
                            : ' lending'}
                        </div>
                      }
                    />
                  </div>
                )}
              </div>
              {!item ? (
                <div className="flex justify-center pt-5">
                  {languages === 'ko' ? '빈 카드입니다' : 'Empty card'}
                </div>
              ) : (
                <div>
                  {locationState.locationOne && (
                    <div className="flex justify-center pt-1">
                      <CardMedia
                        sx={{
                          width: 159 * 0.9,
                          height: 141 * 0.9,
                        }}
                        image={staticImg}
                      />
                    </div>
                  )}
                  <div className="flex flex-col pt-1 gap-1 text-xs">
                    {locationState && (
                      <div className="flex gap-1 items-center">
                        {locationState?.locationOne && <Building />}
                        <div className="flex items-center">
                          {languages === 'ko'
                            ? locationState?.locationOne
                            : locationsBuildings['en'][
                                locationsBuildings['ko'].indexOf(
                                  locationState?.locationOne,
                                )
                              ]}{' '}
                          {languages === 'ko'
                            ? locationState?.locationTwo
                            : locationState?.locationOne &&
                              locationsCollection['en'][
                                Object.keys(locationsCollectionLetters).find(
                                  (key) =>
                                    locationsCollectionLetters[key] ===
                                    locationState?.locationOne,
                                )
                              ][
                                locationsCollection['ko'][
                                  Object.keys(locationsCollectionLetters).find(
                                    (key) =>
                                      locationsCollectionLetters[key] ===
                                      locationState?.locationOne,
                                  )
                                ].indexOf(locationState?.locationTwo)
                              ]}{' '}
                          {locationState?.locationThree}
                        </div>
                      </div>
                    )}
                    {fromTo.from && (
                      <div className="flex gap-1 items-center">
                        <Watch />
                        <div className="flex flex-col justify-center">
                          <div className="flex">
                            {languages === 'en' && (
                              <div className="w-[40px]">From</div>
                            )}
                            {fromTo.from.year}.{fromTo.from.month < 10 && '0'}
                            {fromTo.from.month}.{fromTo.from.day < 10 && '0'}
                            {fromTo.from.day} {fromTo.from.hour < 10 && '0'}
                            {fromTo.from.hour}:{fromTo.from.minute < 10 && '0'}
                            {fromTo.from.minute} {languages === 'ko' && '부터'}
                          </div>
                          {fromTo.to && (
                            <div className="flex">
                              {languages === 'en' && (
                                <div className="w-[40px]">To</div>
                              )}
                              {fromTo.to.year}.{fromTo.to.month < 10 && '0'}
                              {fromTo.to.month}.{fromTo.from.day < 10 && '0'}
                              {fromTo.to.day} {fromTo.to.hour < 10 && '0'}
                              {fromTo.to.hour}:{fromTo.to.minute < 10 && '0'}
                              {fromTo.to.minute} {languages === 'ko' && '까지'}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </AnimatedList>
    </div>
  )
}

export default AddCards
