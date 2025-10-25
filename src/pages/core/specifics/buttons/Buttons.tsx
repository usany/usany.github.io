import { Button } from '@mui/material'
import useSelectors from 'src/hooks/useSelectors'

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
