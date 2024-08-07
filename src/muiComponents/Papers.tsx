import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

function Papers({ action, summary}) {
  return (
    <div>
      {/* <Stack direction="row" spacing={2}>
        <DemoPaper variant="elevation">{action}</DemoPaper>
        <DemoPaper variant="outlined">{summary}</DemoPaper>
      </Stack> */}
    </div>
  );
}

export default Papers