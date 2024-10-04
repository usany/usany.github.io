import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  maxWidth: 400,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const username = `Truncation`;
const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support.`;

function MessageStacks() {
  return (
    <>
      <Card sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <CardActionArea>
          <Stack spacing={2} direction="column" sx={{ flexGrow: 1, overflow: 'hidden', p: 1 }}>
            <div>{username}</div>
            <Typography noWrap>{message}</Typography>
          </Stack>
          {/* <Stack spacing={2} direction="row" sx={{ flexGrow: 1, overflow: 'hidden', p: 1, alignItems: 'center' }}>
            <Typography noWrap>{message}</Typography>
            <div className='flex flex-col'>
              <div>userName</div>
              <Typography noWrap>{message}</Typography>
            </div>
            <Avatar>W</Avatar>
            <Typography noWrap>{message}</Typography>
          </Stack> */}
        </CardActionArea>
      </Card>
      <Item sx={{ flexGrow: 1, overflow: 'hidden', my: 1, mx: 'auto', p: 2 }}>
        <Stack spacing={2} direction="row" sx={{ flexGrow: 1, overflow: 'hidden', my: 1, mx: 'auto', p: 2, alignItems: 'center' }}>
          <Stack>
            <Avatar>W</Avatar>
          </Stack>
          <Stack sx={{ minWidth: 0 }}>
            <Typography noWrap>{message}</Typography>
          </Stack>
        </Stack>
      </Item>
    </>
  );
}

export default MessageStacks