import { alpha } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
// import staticImg from 'src/assets/pwa-512x512.png'
import useCardsBackground from 'src/hooks/useCardsBackground'
import { staticArray } from 'src/pages/add/AddCards'
import locationsBuildings from 'src/pages/add/locationsBuildings'
import CardViewLocation from './CardViewLocation'
import CardViewTime from './CardViewTime'
import CardViewTop from './CardViewTop'
import CardViewTransfer from './CardViewTransfer'

const CardView = ({ onTransfer, message, shadowColor }) => {
  const { color } = useCardsBackground()
  const locationOne = locationsBuildings['en'][
    locationsBuildings['ko'].indexOf(message.text.count)
  ]
  console.log(locationOne)
  const staticImg = staticArray[message.text.count]
  return (
    <div className="flex flex-col gap-5">
      {onTransfer && <CardViewTransfer />}
      <Card
        sx={{
          width: 200 * 0.9,
          height: 280 * 0.9,
          boxShadow: `1.5px 1.5px 1.5px 1.5px ${shadowColor}`,
          bgcolor: color,
        }}
      >
        <CardContent
          sx={{ padding: '5px', bgcolor: onTransfer && alpha('#000000', 0.5) }}
        >
          <div>
            <CardViewTop message={message} />
            <div className="flex justify-center pt-1">
              <CardMedia
                sx={{
                  width: 159 * 0.9,
                  height: 141 * 0.9,
                }}
                image={staticImg}
              />
            </div>
            <div className="flex flex-col pt-1 gap-1 text-xs">
              <CardViewLocation message={message} />
              <CardViewTime message={message} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default CardView
