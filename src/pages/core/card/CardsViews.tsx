import { User } from 'firebase/auth'
import Tilt from 'react-parallax-tilt'
import { PulsatingButton } from 'src/components/ui/pulsating-button'
import CardView from './CardView'

interface Props {
  message: { id: string; text: object }
}
const shadowColorArray = [
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgray',
  'lightgreen',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightsteelblue',
  'lightyellow',
]
const alpha = Array.from(Array(26)).map((e, i) => i + 65)
const letters = alpha.map((x) => String.fromCharCode(x))
const numbers = Array.from({ length: 10 }, (e, i) => `${i}`)
const mergedArray = letters.concat(numbers)

const CardsViews = ({ message, onPulse, onTransfer }: Props) => {
  const id = message?.id || ''
  const shadowColor =
    shadowColorArray[
    mergedArray.indexOf(String(id[0]).toUpperCase()) % shadowColorArray.length
    ]
  return (
    <div>
      <Tilt>
        {onPulse ? (
          <PulsatingButton pulseColor={shadowColor}>
            <CardView
              onTransfer={null}
              message={message}
              shadowColor={shadowColor}
            />
          </PulsatingButton>
        ) : (
          <CardView
            onTransfer={onTransfer}
            message={message}
            shadowColor={shadowColor}
          />
        )}
      </Tilt>
    </div>
  )
}

export default CardsViews
