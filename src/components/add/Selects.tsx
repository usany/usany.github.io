import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useMediaQuery } from '@mui/material';

const locationsCollection = {
    cl : ['1열(1F)', '2열(2F)', '3열(2F)', '4열(4F)', '집중열(1F)', '1층 책상', '1층 세미나실', '매점(2F)', '카페(1F)', '중앙자료실 책상(3F)', '참고열람실 책상(4F)', '정기간행물 책상(4F)'],
    cw : ['매점(B1)', '글로벌존(B1)'],
    p : ['매점(1F)'],
    g : ['카페(B2)', '열람실(B2)'],
    k : ['카페'],
    m : ['복사실'],
    e : ['1열(5F)', '2열(6F)'],
    c : ['1층 로비'],
}

const settingSeats = (number) => {
    return (
        Array(number).fill().map((value, index) => <MenuItem key={index+1} value={index+1}>{index+1}</MenuItem>)
    )
}
const settingLocations = (building) => {
    return (
        building.map((value, index) => <MenuItem key={index+1} value={value}>{value}</MenuItem>)
    )
}
// const roomOne = Array(181).fill().map((value, index) => <MenuItem key={index+1} value={index+1}>{index+1}</MenuItem>)
// const roomFocus = Array(46).fill().map((value, index) => <MenuItem key={index+1} value={index+1}>{index+1}</MenuItem>)
// const roomTwo = Array(315).fill().map((value, index) => <MenuItem key={index+1} value={index+1}>{index+1}</MenuItem>)
// const roomThree = Array(156).fill().map((value, index) => <MenuItem key={index+1} value={index+1}>{index+1}</MenuItem>)
// const roomFour = Array(149).fill().map((value, index) => <MenuItem key={index+1} value={index+1}>{index+1}</MenuItem>)
const location = {
    one : settingSeats(181),
    focus : settingSeats(46),
    two : settingSeats(315),
    three : settingSeats(156),
    four : settingSeats(149),
    cl : settingLocations(locationsCollection.cl),
    cw : settingLocations(locationsCollection.cw),
    p : settingLocations(locationsCollection.p),
    g : settingLocations(locationsCollection.g),
    k : settingLocations(locationsCollection.k),
    m : settingLocations(locationsCollection.m),
    e : settingLocations(locationsCollection.e),
    c : settingLocations(locationsCollection.c)
}
function Selects({ locationState, changeBuilding, changeRoom, changeSeat, changeLocationInput }) {
    const matches = useMediaQuery('(min-width:500px)')
    return (
        <div className={`flex ${matches ? '' : 'flex-col'} px-5`}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel 
                    // id="demo-simple-select-standard-label"
                >위치가 어디인가요</InputLabel>
                <Select
                    // labelId="demo-simple-select-standard-label"
                    // id="demo-simple-select-standard"
                    value={locationState.locationOne}
                    onChange={changeBuilding}
                    // label="Age"
                >
                    {/* <MenuItem value={'one'}>one</MenuItem>
                    <MenuItem value={'focus'}>focus</MenuItem>
                    <MenuItem value={'two'}>two</MenuItem>
                    <MenuItem value={'three'}>three</MenuItem>
                    <MenuItem value={'four'}>four</MenuItem> */}
                    <MenuItem value={'중도'}>중도</MenuItem>
                    <MenuItem value={'청운'}>청운</MenuItem>
                    <MenuItem value={'푸른솔'}>푸른솔</MenuItem>
                    <MenuItem value={'간호이과대'}>간호이과대</MenuItem>
                    <MenuItem value={'경영대'}>경영대</MenuItem>
                    <MenuItem value={'문과대'}>문과대</MenuItem>
                    <MenuItem value={'의과대'}>의과대</MenuItem>
                    <MenuItem value={'치과병원'}>치과병원</MenuItem>
                    <MenuItem value={'직접 입력'}>직접 입력</MenuItem>
                </Select>
            </FormControl>
            {locationState.locationOne !== '' && locationState.locationOne !== '직접 입력' &&
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel 
                    // id="demo-simple-select-standard-label1"
                    >
                        {locationState.locationOne} 어디인가요
                    </InputLabel>
                    <Select
                        // labelId="demo-simple-select-standard-label1"
                        // id="demo-simple-select-standard"
                        value={locationState.locationTwo}
                        onChange={changeRoom}
                        // label="Age"
                    >
                        {locationState.locationOne == '중도' && location.cl}
                        {locationState.locationOne == '청운' && location.cw}
                        {locationState.locationOne == '푸른솔' && location.p}
                        {locationState.locationOne == '간호이과대' && location.g}
                        {locationState.locationOne == '경영대' && location.k}
                        {locationState.locationOne == '문과대' && location.m}
                        {locationState.locationOne == '의과대' && location.e}
                        {locationState.locationOne == '치과병원' && location.c}
                    </Select>
                </FormControl>
            }
            {['1열(1F)', '2열(2F)', '3열(2F)', '4열(4F)', '집중열(1F)'].indexOf(locationState.locationTwo) !== -1 &&
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel 
                    // id="demo-simple-select-standard-label1"
                    >
                        좌석이 어디인가요
                    </InputLabel>
                    <Select
                        // labelId="demo-simple-select-standard-label1"
                        // id="demo-simple-select-standard"
                        value={locationState.locationThree}
                        onChange={changeSeat}
                        // label="Age"
                    >
                        {locationState.locationTwo == '1열(1F)' && location.one}
                        {locationState.locationTwo == '2열(2F)' && location.two}
                        {locationState.locationTwo == '3열(2F)' && location.three}
                        {locationState.locationTwo == '4열(4F)' && location.four}
                        {locationState.locationTwo == '집중열(1F)' && location.focus}
                    </Select>
                </FormControl>
            }
            {locationState.locationOne === '직접 입력' && 
                <div className='pt-7'>
                    <TextField onChange={changeLocationInput} required autoFocus/>
                </div>
            }
        </div>
    )
}

export default Selects
