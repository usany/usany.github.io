import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function AddItemSelects({ item, changeItem }) {
  return (
    <div>
      <FormControl variant="standard" sx={{ minWidth: 150 }}>
        <InputLabel
        >우산 / 양산 선택</InputLabel>
        <Select
          value={item}
          onChange={changeItem}
        >
          <MenuItem value={'우산'}>우산</MenuItem>
          <MenuItem value={'양산'}>양산</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default AddItemSelects
