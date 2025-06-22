import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
// import { useBottomNavigationStore, usePiazzaSwitchStore } from 'src/store'
import { useDispatch, useSelector } from 'react-redux';
import { useSelectors } from "src/hooks/useSelectors";
import { changePiazzaSwitch } from 'src/stateSlices/piazzaSwitchSlice';

const MessageSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

function PiazzaSwitch() {
  // const [switches, setSwitches] = useState('')
  // useEffect(() => {
  //   if (!switches) {
  //     const piazza = window.localStorage.getItem('piazza')
  //     setSwitches(piazza)
  //   }
  // })
  // console.log(switches)
  // const piazzaSwitch = usePiazzaSwitchStore((state) => state.piazzaSwitch)
  // const handlePiazzaSwitchOn = usePiazzaSwitchStore((state) => state.handlePiazzaSwitchOn)
  // const handlePiazzaSwitchOff = usePiazzaSwitchStore((state) => state.handlePiazzaSwitchOff)
  // const handlePiazzaSwitch = usePiazzaSwitchStore((state) => state.handlePiazzaSwitch)
  const languages = useSelectors((state) => state.languages.value)
  const piazzaSwitch = useSelector(state => state.piazzaSwitch.value)
  const dispatch = useDispatch()

  const onClick = () => {
    if (piazzaSwitch === 'true') {
      window.localStorage.setItem('piazza', 'false')
      // handlePiazzaSwitchOff()
      dispatch(changePiazzaSwitch('false'))
    } else {
      window.localStorage.setItem('piazza', 'true')
      // handlePiazzaSwitchOn()
      dispatch(changePiazzaSwitch('true'))
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='text-sm'>{languages === 'ko' ? '단체 대화 메세지에 추가' : 'Group Message in My Message'}</div>
      {/* <div className='text-sm'>알림 받기</div> */}
      <div className='flex justify-end'>
        <MessageSwitch onClick={() => onClick()} inputProps={{ 'aria-label': 'ant design' }} checked={piazzaSwitch === 'true'} />
        {/* <MessageSwitch /> */}
      </div>
    </div>
  );
}

export default PiazzaSwitch
