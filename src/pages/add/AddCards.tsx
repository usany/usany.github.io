import { Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useSelector } from 'react-redux';
import staticImg from 'src/assets/pwa-512x512.png';
import Avatars from 'src/pages/core/Avatars';
import useCardsBackground from '../../hooks/useCardsBackground';
const AddCards = ({ borrow, userObj, addSteps, item, fromTo, locationState, display }) => {
  const profileColor = useSelector(state => state.profileColor.value)
  const profileUrl = useSelector(state => state.profileUrl.value)
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
    'lightyellow'
  ]
  let shadowColor;
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const letters = alpha.map((x) => String.fromCharCode(x));
  if (display) {
    shadowColor = shadowColorArray[letters.indexOf(String(display.id[0]).toUpperCase()) % shadowColorArray.length];
  }
  const { color } = useCardsBackground()
  return (
    <div className='flex justify-center pt-5 p-1'>
      <Card
        sx={{
          width: 200,
          height: 280,
          boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`,
          bgcolor: color
        }}
      >
        <CardContent sx={{ padding: '5px' }}>
          <div>
            <div className='flex justify-between gap-1'>
              <Avatars profile={false} profileColor={profileColor} profileUrl={profileUrl} fallback={userObj.displayName ? userObj.displayName[0] : ''} />
              {item && <Chip label={`${item} ${borrow ? ' 빌리기' : ' 빌려주기'}`} />}
              {/* {item && <Chip label='내가 작성함' />} */}
            </div>
            {!item &&
              <div className='flex justify-center pt-5'>
                빈 카드입니다
              </div>
            }
            {locationState.locationOne &&
              <div className='pt-1'>
                <CardMedia
                  sx={{ height: 140 }}
                  image={staticImg}
                />
              </div>
            }
            <div className='flex flex-col justify-center pt-1'>
              {locationState && <div className='flex justify-center'>{locationState?.locationOne} {locationState?.locationTwo} {locationState?.locationThree}</div>}
              {fromTo.from && <div className='flex justify-center'>{fromTo.from.year}.{fromTo.from.month < 10 && '0'}{fromTo.from.month}.{fromTo.from.day < 10 && '0'}{fromTo.from.day} {fromTo.from.hour < 10 && '0'}{fromTo.from.hour}:{fromTo.from.minute < 10 && '0'}{fromTo.from.minute} 부터</div>}
              {fromTo.to && <div className='flex justify-center'>{fromTo.to.year}.{fromTo.to.month < 10 && '0'}{fromTo.to.month}.{fromTo.from.day < 10 && '0'}{fromTo.to.day} {fromTo.to.hour < 10 && '0'}{fromTo.to.hour}:{fromTo.to.minute < 10 && '0'}{fromTo.to.minute} 까지</div>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddCards
