import East from '@mui/icons-material/East'
import West from '@mui/icons-material/West'
import { useLocation } from 'react-router-dom'
import { useSelectors, useTexts } from 'src/hooks'

const CardViewTransfer = () => {
  const languages = useSelectors((state) => state.languages.value)
  const locations = useLocation()
  const {haveBeenMovedToMyStatus, haveBeenMovedToMyBoard} = useTexts()
  return (
    <div className="flex justify-center items-center z-30 rounded bg-black/50 text-white w-full h-full absolute">
      {locations.pathname === '/' ? (
        <div className="flex justify-center items-center gap-1 h-full">
          {locations.pathname === '/' ? <East /> : <West />}
          <div>
            {haveBeenMovedToMyBoard}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-1 h-full">
          <West />
          <div>
            {haveBeenMovedToMyStatus}
          </div>
        </div>
      )}
    </div>
  )
}

export default CardViewTransfer
