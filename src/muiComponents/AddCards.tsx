import AddItemSelects from 'src/muiComponents/AddItemSelects'
import AddStepTitle from 'src/muiComponents/AddStepTitle'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import staticImg from 'src/assets/pwa-512x512.png';
import { CardHeader, Chip } from '@mui/material';
import Avatars from 'src/muiComponents/Avatars';
import { useSelector } from 'react-redux';

const AddCards = ({ borrow, userObj, addSteps, item, fromTo, locationState }: Props) => {
    const profileColor = useSelector(state => state.profileColor.value)
    const profileImage = useSelector(state => state.profileImage.value)
    return (
        <div className='flex justify-center pt-5 p-1'>
            <Card
                sx={{
                    width: 200,
                    height: 280
                    // boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`
                }}
            >
                <CardContent sx={{padding: '5px'}}>
                    <div>
                        <div className='flex justify-between gap-1'>
                            <Avatars profile={false} profileColor={profileColor} profileImage={profileImage} fallback={userObj.displayName ? userObj.displayName[0] : ''}/>
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