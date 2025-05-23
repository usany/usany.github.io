import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useLargeMedia from "src/hooks/useLargeMedia";
import { useSelectors } from "src/hooks/useSelectors";

interface Props {
  multiple: boolean
}
function RankingListsTitle({ multiple }: Props) {
  const languages = useSelectors((state) => state.languages.value)
  const largeMedia = useLargeMedia()
  return (
    <div className='px-1 pt-3'>
      <div
        className={`flex truncate w-full justify-around gap-1 p-3 rounded`}
      >
        {largeMedia ?
          <div className="flex items-center justify-center w-20">
            {multiple ? (languages === 'ko' ? '유저' : 'User') : (languages === 'ko' ? '내' : 'My')} {languages === 'ko' ? '랭킹' : 'Ranking'}
          </div>
          :
          <div className="flex flex-col items-center justify-center w-20">
            <div>
              {multiple ? (languages === 'ko' ? '유저' : 'User') : (languages === 'ko' ? '내' : 'My')}
            </div>
            <div>
              {languages === 'ko' ? '랭킹' : 'Ranking'}
            </div>
          </div>
        }
        <div className='flex items-center justify-center'>
          <Avatar
            className={`bg-light-2 dark:bg-dark-2 border border-dashed`}
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
        {/* <div className="flex gap-1">
        </div> */}
        <div className="flex flex-col justify-center overflow-hidden px-5 w-40">
          <div>{multiple ? (languages === 'ko' ? '유저' : 'User') : (languages === 'ko' ? '내' : 'My')} {languages === 'ko' ? '이름' : 'name'}</div>
          <div>{languages === 'ko' ? '포인트' : 'Points'}</div>
        </div>
        {largeMedia ?
          <div className='flex justify-center items-center w-[67px]'>
            {languages === 'ko' ? '위치 확인' : 'Location Confirm'}
          </div>
          :
          <div className='flex flex-col justify-center items-center w-[67px]'>
            <div>
              {languages === 'ko' ? '위치 확인' : 'Location'}
            </div>
            {languages !== 'ko' &&
              <div>
                Confirm
              </div>
            }
            {/* {languages === 'ko' ? '위치 확인' : 'Location Confirm'} */}
          </div>
        }
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
