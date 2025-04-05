import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSelector } from 'react-redux'

const getCurrentWeather = () => {
  const APIKEY = 'e9f8a415cef0c0bb87f7da5e167bdaf1'
  const latitude = 37.5948
  const longitude = 127.0531

  const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${APIKEY}&units=metric`)
  return response
}

const WeatherView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['weather'], queryFn: getCurrentWeather,
    // suspense: true
  })
  const languages = useSelector((state) => state.languages.value)
  if (isLoading) return <div>waiting</div>
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
