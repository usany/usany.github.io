import Cards from "src/pages/core/card/Cards";

const CardsList = ({ choose, messages, selectedValues, userObj }) => {
  const chosenMessages = messages.map((message, index) => {
    const isOwner = message?.creatorId === userObj?.uid;
    if (message?.text.choose === choose && message?.round === 1) {
      if (
        selectedValues[0].value === "전체 아이템" ||
        selectedValues[0].value === message?.item ||
        !selectedValues[0].value
      ) {
        if (
          selectedValues[1].value === "전체 장소" ||
          selectedValues[1].value === message?.text.count ||
          !selectedValues[1].value
        ) {
          return (
            <Cards
              key={index}
              message={message}
              isOwner={isOwner}
              userObj={userObj}
              num={null}
              points={null}
            />
          );
        }
      }
    }
  }).filter((value) => value !== undefined)
  return (
    <div>
      {chosenMessages.length ? <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] place-items-center col-span-full">{chosenMessages}</div> : <div className='flex justify-center p-5'>비었습니다</div>}
      {/* <div className="flex flex-wrap justify-between p-3 gap-1">
        {chosenMessages.length ? chosenMessages : <div className='flex justify-center p-5'>비었습니다</div>}
        {messages.map((message, index) => {
          const isOwner = message?.creatorId === userObj?.uid;
          if (message?.text.choose === choose && message?.round === 1) {
            if (
              selectedValues[0].value === "전체 아이템" ||
              selectedValues[0].value === message?.item ||
              !selectedValues[0].value
            ) {
              if (
                selectedValues[1].value === "전체 장소" ||
                selectedValues[1].value === message?.text.count ||
                !selectedValues[1].value
              ) {
                return (
                  <Cards
                    key={index}
                    message={message}
                    isOwner={isOwner}
                    userObj={userObj}
                    num={null}
                    points={null}
                  />
                );
              }
            }
          }
        })}
      </div> */}
    </div>
  )
}

export default CardsList
