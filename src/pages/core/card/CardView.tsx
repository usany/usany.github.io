import { alpha } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import staticImgs from 'src/assets/pwa-512x512.png'
import staticCl from 'src/assets/static_cl.jpg'
import staticCw from 'src/assets/static_cw.jpeg'
import staticG from 'src/assets/static_g.jpeg'
import staticE from 'src/assets/comratio.jpeg'
import useCardsBackground from 'src/hooks/useCardsBackground'
import CardViewLocation from './CardViewLocation'
import CardViewTime from './CardViewTime'
import CardViewTop from './CardViewTop'
import CardViewTransfer from './CardViewTransfer'

export const staticArray = {
  중도: staticCl,
  간호이과대: staticG,
  청운: staticCw,
  경영대: staticE,
  building: staticImgs,
}
const CardView = ({ onTransfer, message, shadowColor }) => {
  const { colorTwo } = useCardsBackground()
  const staticImg = staticArray[message.text.count] || staticArray['building']
  return (
    <div className="flex flex-col gap-5">
      {onTransfer && <CardViewTransfer />}
      <Card
        className="colorTwo"
        sx={{
          width: 200 * 0.9,
          height: 280 * 0.9,
          boxShadow: `1.5px 1.5px 1.5px 1.5px ${shadowColor}`,
          bgcolor: colorTwo,
        }}
      >
        <CardContent
          sx={{ padding: '5px', bgcolor: onTransfer && alpha('#000000', 0.5) }}
        >
          <CardViewTop message={message} />
          <div className="flex justify-center pt-1">
            <CardMedia
              sx={{
                width: 200 * 0.9,
                height: 141 * 0.9,
                borderRadius: '10px',
              }}
              image={staticImg}
            />
          </div>
          <div className="flex flex-col pt-1 gap-1 text-xs">
            <CardViewLocation message={message} />
            <CardViewTime message={message} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default CardView
