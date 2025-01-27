import AddItemSelects from 'src/muiComponents/AddItemSelects'
import AddStepTitle from 'src/muiComponents/AddStepTitle'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import staticImg from 'src/assets/pwa-512x512.png';
import { Chip } from '@mui/material';

const AddCards = ({ borrow, addSteps, item, fromTo, locationState }: Props) => {
    console.log(fromTo.from?.minute)
    return (
        <div className='flex justify-center pt-5 p-1'>
            <Card
                sx={{
                    width: 200,
                    height: 280
                    // boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`
                }}
            >
                <CardMedia
                    sx={{ height: 140 }}
                    image={staticImg}
                />
                <CardContent>
                    <div className='flex justify-center'>
                        {item && <Chip label={`${item} ${borrow ? ' 빌리기' : ' 빌려주기'}`} />}
                        <Chip label='내가 작성함' />
                    </div>
                    <div className='flex flex-col justify-center'>
                        {locationState && <div className='flex justify-center'>{locationState?.locationOne} {locationState?.locationTwo} {locationState?.locationThree}</div>}
                        {fromTo.from && <div className='flex justify-center'>{fromTo.from.year}.{fromTo.from.month < 10 && '0'}{fromTo.from.month}.{fromTo.from.day < 10 && '0'}{fromTo.from.day} {fromTo.from.hour < 10 && '0'}{fromTo.from.hour}:{fromTo.from.minute < 10 && '0'}{fromTo.from.minute} 부터</div>}
                        {fromTo.to && <div className='flex justify-center'>{fromTo.to.year}.{fromTo.to.month < 10 && '0'}{fromTo.to.month}.{fromTo.from.day < 10 && '0'}{fromTo.to.day} {fromTo.to.hour < 10 && '0'}{fromTo.to.hour}:{fromTo.to.minute < 10 && '0'}{fromTo.to.minute} 까지</div>}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddCards