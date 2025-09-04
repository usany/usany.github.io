import { useSelectors } from 'src/hooks'
import Cards from 'src/pages/core/card/Cards'
import useTexts from 'src/useTexts'

const CardsList = ({ choose, messages, selectedValues }) => {
  const profile = useSelectors((state) => state.profile.value)
  const { empty } = useTexts()
  const chosenMessages = messages
    .map((message, index) => {
      const isOwner = message?.creatorId === profile?.uid
      if (message?.text.choose === choose && message?.round === 1) {
        if (
          selectedValues[0].value === '전체 아이템' ||
          selectedValues[0].value === message?.item ||
          !selectedValues[0].value
        ) {
          if (
            selectedValues[1].value === '전체 장소' ||
            selectedValues[1].value === message?.text.count ||
            !selectedValues[1].value
          ) {
            return (
              <Cards
                key={index}
                message={message}
                isOwner={isOwner}
                num={null}
                points={null}
              />
            )
          }
        }
      }
    })
    .filter((value) => value !== undefined)
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
        <div>네트워크 연결이 필요합니다</div>
      )}
    </div>
  )
}

export default CardsList
