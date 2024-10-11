import { useRef, useReducer, useEffect, useState, useMemo } from "react";
import Switch from '@mui/material/Switch';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';

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

function PiazzaSwitch({ piazzaSwitch }) {
  const [switches, setSwitches] = useState('')
  useEffect(() => {
    if (!switches) {
      const piazza = window.localStorage.getItem('piazza')
      setSwitches(piazza)    
    }
  })
  const onClick = (piazzaSwitch) => {
    if (piazzaSwitch.current === 'true') {
      window.localStorage.setItem('piazza', 'false')
      // setPiazzaSwitch('false')
      piazzaSwitch.current = 'false'
      // setPiazzaCheck('false')
      setSwitches('false')
    } else {
      window.localStorage.setItem('piazza', 'true')
      // setPiazzaSwitch('true'
      piazzaSwitch.current = 'true'
      // setPiazzaCheck('true')
      setSwitches('true')
    }
    // if (colors === 'light') {
    //     setColors('dark')
    //     setMode('dark')
    //     localStorage.setItem("theme", 'dark');
    // } else {
    //     setColors('light')
    //     setMode('light')
    //     localStorage.setItem("theme", 'light');
    // }
  }
  console.log(switches)
  return (
    <div className='flex flex-col'>
      <div className='text-sm'>단체 대화 알림 받기</div>
      {/* <div className='text-sm'>알림 받기</div> */}
      <div className='flex justify-end'>
        <MessageSwitch onClick={() => onClick(piazzaSwitch)} inputProps={{ 'aria-label': 'ant design' }} checked={switches === 'true'}/>
        {/* <MessageSwitch /> */}
      </div>
    </div>
  );
}

export default PiazzaSwitch