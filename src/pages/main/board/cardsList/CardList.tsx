import Cards from 'src/components/card/Cards'

const CardsList = ({ choose, messages, selectedValues, userObj }) => {
  return (
    <div className="flex flex-wrap justify-between p-3 gap-1">
      {messages.map((message, index) => {
        const isOwner = message?.creatorId === userObj?.uid
        if (message?.text.choose === choose && message?.round === 1) {
          if (
            selectedValues[0].value === '전체' ||
            selectedValues[0].value === message?.item ||
            !selectedValues[0].value
          ) {
            if (
              selectedValues[1].value === '전체' ||
              selectedValues[1].value === message?.text.count ||
              !selectedValues[1].value
            ) {
              return (
                <Cards
                  key={index}
                  msgObj={message}
                  isOwner={isOwner}
                  userObj={userObj}
                  num={null}
                  points={null}
                />
              )
            }
          }
        }
      })}
    </div>
  )
}

export default CardsList
