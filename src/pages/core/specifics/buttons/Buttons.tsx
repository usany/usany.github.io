import { Button } from '@mui/material'

function ProblemButton({changeIssue}) {
  return (
    <Button
      variant='outlined'
      onClick={changeIssue}
    >
      Issue Occured
    </Button>
  )
}

export default ProblemButton
