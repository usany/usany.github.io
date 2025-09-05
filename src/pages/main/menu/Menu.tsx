import type { User } from 'firebase/auth'
import { useSelectors } from 'src/hooks'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import Accordions from './Accordions/Accordions'
import useContextMenu from './useContextMenu'
import useGetToken from './useGetToken'
import useSetProfile from './useSetProfile'
import axios from 'axios'
interface Props {
  userObj: User
}

const titles = {
  ko: '내 상태',
  en: 'My Status',
}

function Menu({ userObj }: Props) {
  const languages = useSelectors((state) => state.languages.value)
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'
  useSetProfile(userObj)
  useGetToken(userObj)
  useContextMenu()
  const APIKEY = import.meta.env.VITE_WEATHER_API_KEY
  const LATITUDE = 37.5948
  const LONGITUDE = 127.0531
  const response = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&APPID=${APIKEY}&units=metric`)
          .then((res) => res.json())
          .then(res=> res)
  const responsing = axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&APPID=${APIKEY}&units=metric`,
          )
  console.log(response)
  console.log(responsing)
  return (
    <div className="flex justify-center flex-col pb-5">
      <PageTitle title={titles[index]} />
      <Accordions userObj={userObj} />
    </div>
  )
}

export default Menu
