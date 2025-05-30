import axios from 'axios'
import { useSelector } from 'react-redux'
import { useGetWeatherQuery } from 'src/stateSlices/weather'

const getCurrentWeather = () => {
  const APIKEY = 'e9f8a415cef0c0bb87f7da5e167bdaf1'
  const latitude = 37.5948
  const longitude = 127.0531

  const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${APIKEY}&units=metric`)
  return response
}

const WeatherView = () => {

  const languages = useSelector((state) => state.languages.value)
  const { data, error, isLoading } = useGetWeatherQuery()
  if (isLoading) return <div className='flex items-center px-5 h-[65px]'>waiting</div>
  return (
    <div>
      <div className='flex flex-col px-5'>
        <img className='size-10' src={`https://openweathermap.org/img/wn/${data?.data.weather[0].icon}@2x.png`} />
        <span>{languages === 'ko' ? '회기동' : 'Hoegi'} {data?.data.main.temp}°C</span>
      </div>
    </div>
  )
}

export default WeatherView
