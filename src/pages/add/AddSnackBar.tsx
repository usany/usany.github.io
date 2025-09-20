import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';

interface Props {
  // snackBar: boolean
  changeAddSteps: (newValue: number) => void
}

const AddSnackBar = ({ changeAddSteps }: Props) => {
  const vertical = 'top'
  const horizontal = 'center'

  return (
    <Snackbar
      open={true}
      sx={{ paddingBottom: '10%' }}
      message="등록되었습니다"
      anchorOrigin={{ vertical, horizontal }}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          // onClick={() => changeAddSteps(4)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  )
}

export default AddSnackBar
