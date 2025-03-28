// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import { CardActionArea, CardActions } from '@mui/material';
// import { useSelector, useDispatch } from 'react-redux'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import Badge from '@mui/material/Badge';
// import Chip from '@mui/material/Chip';
import {
  createApi,
  fakeBaseQuery
} from '@reduxjs/toolkit/query/react'
import axios from 'axios'

const getCurrentWeather = () => {
  const APIKEY = 'e9f8a415cef0c0bb87f7da5e167bdaf1'
  const latitude = 37.5948
  const longitude = 127.0531

  const response = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${APIKEY}&units=metric`,
  )
  return response
  // .then((response) => {
  //     setWeatherInfo({
  //         temperature: response.data.main.temp,
  //         weather: response.data.weather[0].main,
  //         icon: response.data.weather[0].icon,
  //         loaded: true,
  //     })
  //     console.log(response)
  // })
  // .catch((error) => {
  //     setWeatherInfo({
  //         ...weatherInfo,
  //         loaded: true,
  //     })
  //     showError('Failed to load weatherinfo')
  // })
}

export const weather = createApi({
  reducerPath: 'weather',
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getWeather: build.query({
      async queryFn() {
        try {
          const APIKEY = 'e9f8a415cef0c0bb87f7da5e167bdaf1'
          const latitude = 37.5948
          const longitude = 127.0531

          const response = axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${APIKEY}&units=metric`,
          )
          return { data: response }
        } catch (error) {
          return { error: error }
        }
      },
      // query: (arg) => {
      //   return arg
      // }
      // const piazzaRef = collection(dbservice, 'chats_group')
      // const piazzaCollection = query(piazzaRef, orderBy('messageClockNumber', 'desc'), limit(1))
      // console.log(arg)
      // return piazzaCollection
      // try {
      //   const piazzaMessages = await getDocs(piazzaCollection)
      // } catch (error) {
      //   return { error: error }
      // }
      // async queryFn() {
      //   try {
      //     const piazzaRef = collection(dbservice, 'chats_group')
      //     const piazzaCollection = query(piazzaRef, orderBy('messageClockNumber', 'desc'), limit(1))
      //     const piazzaMessages = await getDocs(piazzaCollection)
      //     return { data: piazzaMessages }
      //   } catch (e) {
      //     return { error: e }
      //   }
      // },
    }),
  }),
})

export const { useGetWeatherQuery } = weather
