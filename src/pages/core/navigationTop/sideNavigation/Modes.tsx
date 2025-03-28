import { useDispatch, useSelector } from 'react-redux'
import Switches from 'src/navigate/Switches'
import { changeEn, changeKo } from 'src/stateSlices/languagesSlice'
import { changeDark, changeLight } from 'src/stateSlices/themeSlice'
import SwitchesLanguages from '../../../../navigate/SwitchesLanguages'

const Modes = () => {
  const theme = useSelector((state) => state.theme)
  const languages = useSelector((state) => state.languages)
  const dispatch = useDispatch()
  console.log(languages)
  return (
    <div className="flex flex-col justify-center">
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
      <SwitchesLanguages
        onClick={() => {
          if (languages === 'ko') {
            localStorage.setItem('languages', 'en')
            dispatch(changeEn())
          } else {
            localStorage.setItem('languages', 'ko')
            dispatch(changeKo())
          }
        }}
      />
    </div>
  )
}

export default Modes
