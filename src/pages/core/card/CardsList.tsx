import { useSelectors } from 'src/hooks'
import Cards from 'src/pages/core/card/Cards'
import { useTexts } from 'src/hooks'
import { DocumentData } from 'firebase/firestore'

interface Props {
  choose: number
  messages: DocumentData[]
}
const CardsList = ({ choose, messages }: Props) => {
  const { empty, needNetworkConnection } = useTexts()
  const chosenMessages = messages
    .map((message) => {
      if (message?.text.choose === choose && message?.round === 1) {
        return (
          <Cards
            message={message}
          />
        )
      }
      return null
    })
    // .filter((value) => value !== undefined)
  const onLine = useSelectors((state) => state.onLine.value)
  return (
    <div className="flex justify-center w-screen">
      {onLine ? (
        <>
          {chosenMessages.length ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] place-items-center col-span-full w-screen">
              {chosenMessages}
            </div>
          ) : (
            <div className="flex justify-center p-5">{empty}</div>
          )}
        </>
      ) : (
        <>{needNetworkConnection}</>
      )}
    </div>
  )
}

export default CardsList
