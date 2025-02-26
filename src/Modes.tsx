import Switches from 'src/navigate/Switches'
import { useSelector, useDispatch } from 'react-redux'
import { changeLight, changeDark } from 'src/stateSlices/themeSlice'

const Modes = () => {
  const theme = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  return (
    <div className="flex justify-center p-5">
      <Switches
        onClick={() => {
          document.documentElement.classList.toggle('dark')
          if (theme === 'light') {
            localStorage.setItem('theme', 'dark')
            dispatch(changeDark())
          } else {
            localStorage.setItem('theme', 'light')
            dispatch(changeLight())
          }
        }}
      />
    </div>
  )
}

export default Modes
