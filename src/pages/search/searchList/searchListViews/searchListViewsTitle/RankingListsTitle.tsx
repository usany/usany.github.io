import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  multiple: boolean
}
function RankingListsTitle({ multiple }: Props) {

  return (
    <div className='px-3 pt-3'>
      <div
        className={`flex w-full justify-between p-3 rounded`}
      >
        <div className="flex gap-5">
          <div className="flex items-center justify-center w-20">
            {multiple ? '유저' : '내'} 랭킹
          </div>
          <div className='flex items-center justify-center'>
            <Avatar
              className={`bg-light-3 dark:bg-dark-3 border border-dashed`}
            >
              <AvatarImage src={''} />
              <AvatarFallback className="text-xl border-none">
                ?
              </AvatarFallback>
            </Avatar>
          </div>
          {/* {!multiple ? (
          <div className="flex flex-col justify-center px-5 w-20">
            {multiple ? '유저' : '내'} 랭킹
          </div>
          ) : (
            <div className="flex flex-col justify-center px-5 w-20">
              {samePointIndex ? samePointIndex + 1 : index + 1}
            </div>
          )} */}
          {/* <Avatar
          className={`bg-${profileColor?.indexOf("#") === -1 ? element?.profileColor : "profile-blue"}`}
          >
            <AvatarImage src={element?.profileImageUrl} />
            <AvatarFallback className="text-xl border-none">
              {element?.displayName[0]}
            </AvatarFallback>
          </Avatar> */}
          {/* <Avatars profile={false} profileColor={'profile-blue'} profileImage={element?.profileImageUrl || 'null'} fallback={element.displayName[0]}/> */}
          {/* {element?.profileImageUrl &&
            <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || '#2196f3' }} src={element?.profileImageUrl || './src'} variant="rounded" />
          }
          {!element?.profileImageUrl &&
            <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || '#2196f3' }} src={'./src'} variant="rounded" />
          } */}
          <div className="flex flex-col justify-center overflow-hidden px-5 w-40">
            <div>{multiple ? '유저' : '내'} 이름</div>
            <div>포인트</div>
          </div>
        </div>
        <div className='flex items-center'>
          위치 확인
        </div>
      </div>

    </div >
    // <div className='flex justify-between w-screen pt-5'>
    //   <div className='flex flex-col justify-center px-5'>
    //     {multiple ? '유저' : '내'} 랭킹
    //   </div>
    //   <div className='flex flex-col overflow-hidden'>
    // <div>{multiple ? '유저' : '내'} 이름</div>
    // <div>포인트</div>
    //   </div>
    //   <div className='flex flex-col justify-center px-5'>
    //     위치 확인
    //   </div>
    // </div>
  )
}

export default RankingListsTitle
