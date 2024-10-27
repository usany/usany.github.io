import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import BeachAccess from '@mui/icons-material/BeachAccess'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, dbservice } from 'src/baseApi/serverbase'
import { storage } from "src/baseApi/serverbase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function FilterDialogs({ changeFilter, handleClose, selectedValueOne, selectedValueTwo, selectedValueThree, setSelectedValueOne, setSelectedValueTwo, setSelectedValueThree, changeSelectedValueOne, changeSelectedValueTwo, changeSelectedValueThree }) {
    
    return (
        <Dialog open={changeFilter} onClose={handleClose}>
            <DialogContent>
                <div>
                    필터
                </div>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel 
                >우산 / 양산 선택
                </InputLabel>
                <Select
                    value={selectedValueOne || '전체'}
                    onChange={changeSelectedValueOne}
                >
                    <MenuItem value={'전체'}>전체</MenuItem>
                    <MenuItem value={'우산'}>우산</MenuItem>
                    <MenuItem value={'양산'}>양산</MenuItem>
                </Select>
            </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel 
                >장소 선택
                </InputLabel>
                <Select
                    value={selectedValueTwo || '전체'}
                    onChange={changeSelectedValueTwo}
                >
                    <MenuItem value={'전체'}>전체</MenuItem>
                    <MenuItem value={'중도'}>중도</MenuItem>
                    <MenuItem value={'청운'}>청운</MenuItem>
                </Select>
            </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel 
                >시간 정렬
                </InputLabel>
                <Select
                    value={selectedValueThree || '최신순'}
                    onChange={changeSelectedValueThree}
                >
                    <MenuItem value={'최신순'}>최신순</MenuItem>
                    <MenuItem value={'오래된'}>오래된</MenuItem>
                </Select>
            </FormControl>
            </DialogContent>
            <DialogActions>
            <Button variant='outlined' onClick={() => {
                handleClose()
            }}>저장</Button>
            <Button variant='outlined' onClick={() => {
                handleClose()
            }} autoFocus>
                닫기
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FilterDialogs
