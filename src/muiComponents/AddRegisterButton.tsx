import { useState, useEffect } from 'react'
import ItemSelects from 'src/muiComponents/ItemSelects'
import Selects from 'src/muiComponents/Selects'
import TextField from '@mui/material/TextField';
import AddStepTitle from 'src/muiComponents/AddStepTitle'
import Pickers from 'src/muiComponents/Pickers'
import Button from '@mui/material/Button';

interface Props {
    submit: (event: {}) => void
}

const AddRegisterButton = ({ submit }: Props) => {
    return (
        <form className='flex justify-center pt-5' id='selection' onSubmit={submit}>
            <Button variant='outlined' form='selection' type='submit'>등록하기</Button>
        </form>
    )
}

export default AddRegisterButton