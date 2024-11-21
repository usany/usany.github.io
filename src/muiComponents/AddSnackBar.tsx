import { useState, useEffect } from 'react'
import ItemSelects from 'src/muiComponents/ItemSelects'
import Selects from 'src/muiComponents/Selects'
import TextField from '@mui/material/TextField';
import AddStepTitle from 'src/muiComponents/AddStepTitle'
import Pickers from 'src/muiComponents/Pickers'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    snackBar: boolean
    changeSnackBar: () => void
}

const AddSnackBar = ({ snackBar, changeSnackBar }: Props) => {
    return (
        <Snackbar
            open={snackBar}
            sx={{paddingBottom: '10%'}}
            message="등록되었습니다"
            action={
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={changeSnackBar}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        />
    )
}

export default AddSnackBar