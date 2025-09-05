import { useSelectors } from 'src/hooks'
import { useGetWeatherQuery } from 'src/stateSlices/weather'

const WeatherView = () => {
  const languages = useSelectors((state) => state.languages.value)
  const LATITUDE = 37.5948
  const LONGITUDE = 127.0531
  const { data, error, isLoading } = useGetWeatherQuery({latitude: LATITUDE, longitude: LONGITUDE})
  if (isLoading) return <div className='flex items-center px-5 w-[148px] h-[64px]'>waiting</div>
  if (error) return <div className='flex items-center px-5 w-[148px] h-[64px]'>failed</div>
  return (
    <div>
      <div className='flex flex-col px-5'>
        <img className='size-10' src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
        <span>{languages === 'ko' ? '회기동' : 'Hoegi'} {data.main.temp}°C</span>
      </div>
    </div>
  )
}

export default WeatherView
