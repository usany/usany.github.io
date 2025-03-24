import { Chip } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Building, Watch } from 'lucide-react'
import { useSelector } from 'react-redux'
import staticImg from 'src/assets/pwa-512x512.png'
import { AnimatedList } from 'src/components/ui/animated-list'
import Avatars from 'src/pages/core/Avatars'

const AddCards = ({
  borrow,
  userObj,
  addSteps,
  item,
  fromTo,
  locationState,
  display,
}) => {
  const profileColor = useSelector((state) => state.profileColor.value)
  const profileUrl = useSelector((state) => state.profileUrl.value)
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
  let shadowColor
  const alpha = Array.from(Array(26)).map((e, i) => i + 65)
  const letters = alpha.map((x) => String.fromCharCode(x))
  if (display) {
    shadowColor =
      shadowColorArray[
      letters.indexOf(String(display.id[0]).toUpperCase()) %
      shadowColorArray.length
      ]
  }

  return (
    <div className="flex justify-center text-sm pt-5 p-1">
      <AnimatedList>
        <Card
          sx={{
            width: 200,
            height: 280,
            boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`,
          }}
        >
          <CardContent sx={{ padding: '5px' }}>
            <div>
              <div className="flex justify-between gap-1">
                <Avatars
                  uid={userObj.uid}
                  profile={false}
                  profileColor={profileColor}
                  profileUrl={profileUrl}
                />
                {item &&
                  <div className='flex items-center'>
                    <Chip label={`${item} ${borrow ? ' 빌리기' : ' 빌려주기'}`} />
                  </div>
                }
                {/* {item && <Chip label='내가 작성함' />} */}
              </div>
              {!item ?
                <div className="flex justify-center pt-5">빈 카드입니다</div>
                :
                <div>
                  {locationState.locationOne && (
                    <div className="flex justify-center pt-1">
                      <CardMedia sx={{
                        width: 159,
                        height: 141,
                      }} image={staticImg} />
                    </div>
                  )}
                  <div className="flex flex-col justify-center pt-1">
                    {locationState && (
                      <div className="flex gap-3">
                        {locationState?.locationOne && <Building />}
                        <div>
                          {locationState?.locationOne} {locationState?.locationTwo}{' '}
                          {locationState?.locationThree}
                        </div>
                      </div>
                    )}
                    {fromTo.from && (
                      <div className="flex gap-3">
                        <Watch />
                        <div className='flex flex-col'>
                          <div className='flex'>
                            {fromTo.from.year}.{fromTo.from.month < 10 && '0'}
                            {fromTo.from.month}.{fromTo.from.day < 10 && '0'}
                            {fromTo.from.day} {fromTo.from.hour < 10 && '0'}
                            {fromTo.from.hour}:{fromTo.from.minute < 10 && '0'}
                            {fromTo.from.minute} 부터
                          </div>
                          {fromTo.to && (
                            <div className="flex">
                              {fromTo.to.year}.{fromTo.to.month < 10 && '0'}
                              {fromTo.to.month}.{fromTo.from.day < 10 && '0'}
                              {fromTo.to.day} {fromTo.to.hour < 10 && '0'}
                              {fromTo.to.hour}:{fromTo.to.minute < 10 && '0'}
                              {fromTo.to.minute} 까지
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              }
            </div>
          </CardContent>
        </Card>
      </AnimatedList>
    </div>
  )
}

export default AddCards
