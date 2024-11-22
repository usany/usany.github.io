import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'
import Btn from 'src/pages/Btn';
import Chip from '@mui/material/Chip';
import staticImg from 'src/assets/pwa-512x512.png';

const Cards = ({ 
  msgObj,
  isOwner,
  userObj,
  num,
  points,
}:
{
  msgObj: {id: string, text: object},
  isOwner: boolean,
  userObj: {uid: string, displayName: string},
  num: number,
  points: number,
}) => {
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
  const numbers = Array.from({ length: 10 }, (e, i) => `${i}`)
  const mergedArray = letters.concat(numbers)
  shadowColor = shadowColorArray[mergedArray.indexOf(String(msgObj.id[0]).toUpperCase())%shadowColorArray.length];

  return (
    <div className='flex justify-center'>
      <Card>
        <CardActionArea>
          <Link 
            to='/points'
            state={{
              user: user,
              points: num,
              lendRegisteredMessage: lendRegisteredMessage,
              lendMessage: lendMessage,
              borrowRegisteredMessage: borrowRegisteredMessage,
              borrowMessage: borrowMessage
            }}
          >
          <CardContent>
          <div>포인트</div>
          <div className='flex justify-center'>{num}</div>
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>
      <Card>
        <CardActionArea>
          <Link to='/allies' 
            state={{
              uid: userObj.uid, 
              displayName: userObj.displayName,
              followerList: myFollowerList, 
              allies: 'followers',
              alliesCollection: followersName,
          }}>
            <div className='p-5'>
              <div className='flex justify-center'>
                팔로워
              </div>
              <div className='flex justify-center'>
                {myFollowerNumber}명 
              </div>
            </div>
          </Link>
        </CardActionArea>
      </Card>
      <Card>
        <CardActionArea>
          <Link to='/allies' 
            state={{
              uid: userObj.uid, 
              displayName: userObj.displayName,
              followingsList: myFollowingList, 
              allies: 'followings',
              alliesCollection: followingsName,
          }}>
            <div className='p-5'>
              <div className='flex justify-center'>
                팔로잉
              </div>
              <div className='flex justify-center'>
                {myFollowingNumber}명
              </div>
            </div>
          </Link>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default Cards