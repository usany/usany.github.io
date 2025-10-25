import { Button } from '@mui/material'

function ProblemButton({issue, changeIssue}) {
  return (
    <Button
      variant='outlined'
      onClick={changeIssue}
    >
      {issue ? 'Issue Resolved' : 'Issue Occured'}
    </Button>
  )
}

export default ProblemButton
