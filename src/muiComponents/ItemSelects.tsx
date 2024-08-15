import { useState, useEffect } from 'react'
// import Lottie from 'react-lottie'
// import rain from './assets/Animation.json'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

function ItemSelects({ item, setItem, changeItem }) {
    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel 
                    // id="demo-simple-select-standard-label"
                >우산 / 양산 선택</InputLabel>
                <Select
                    // labelId="demo-simple-select-standard-label"
                    // id="demo-simple-select-standard"
                    value={item}
                    onChange={changeItem}
                    // label="Age"
                >
                    {/* <MenuItem value={'one'}>one</MenuItem>
                    <MenuItem value={'focus'}>focus</MenuItem>
                    <MenuItem value={'two'}>two</MenuItem>
                    <MenuItem value={'three'}>three</MenuItem>
                    <MenuItem value={'four'}>four</MenuItem> */}
                    <MenuItem value={'우산'}>우산</MenuItem>
                    <MenuItem value={'양산'}>양산</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default ItemSelects
