import East from '@mui/icons-material/East'
import West from '@mui/icons-material/West'
import { useLocation } from 'react-router-dom'
import { useSelectors } from 'src/hooks/useSelectors'

const CardViewTransfer = () => {
  const languages = useSelectors((state) => state.languages.value)
  const locations = useLocation()
  return (
    <div className="flex justify-center items-center z-30 rounded bg-black/50 text-white w-full h-full absolute">
      {locations.pathname === '/' ? (
        <div className="flex justify-center items-center gap-1 h-full">
          <East />
          <div>
            {languages === 'ko' ? '게시판으로 카드 전송됨' : 'Moved to board'}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-1 h-full">
          <West />
          <div>
            {languages === 'ko'
              ? '내 상태로 카드 전송됨'
              : 'Moved to my status'}
          </div>
        </div>
      )}
    </div>
  )
}

export default CardViewTransfer
