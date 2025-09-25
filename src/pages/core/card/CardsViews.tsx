import Tilt from 'react-parallax-tilt'
import { PulsatingButton } from 'src/components/ui/pulsating-button'
import CardView from './CardView'
import { DocumentData } from 'firebase/firestore'

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
interface Props {
  message: DocumentData
  onPulse?: boolean
  onTransfer?: boolean
}
const CardsViews = ({ message, onPulse, onTransfer }: Props) => {
  const id = message?.id || ''
  const shadowColor =
    shadowColorArray[
    mergedArray.indexOf(String(id[0]).toUpperCase()) % shadowColorArray.length
    ]
  return (
    <Tilt>
      {onPulse ? (
        <PulsatingButton pulseColor={shadowColor}>
          <CardView
            onTransfer={false}
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
  )
}

export default CardsViews
