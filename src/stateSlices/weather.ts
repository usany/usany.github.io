import { createApi, fakeBaseQuery, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import axios from 'axios'

// const getCurrentWeather = () => {
//   const APIKEY = 'e9f8a415cef0c0bb87f7da5e167bdaf1'
//   const latitude = 37.5948
//   const longitude = 127.0531

//   const response = axios.get(
//     `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${APIKEY}&units=metric`,
//   )
//   return response
// }

export const weather = createApi({
  reducerPath: 'weather',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  endpoints: (build) => ({
    getWeather: build.query({
      query: (location) => {
        const APIKEY = import.meta.env.VITE_WEATHER_API_KEY
        const LATITUDE = 37.5948
        const LONGITUDE = 127.0531
        return (`weather?lat=${location.latitude}&lon=${location.longitude}&APPID=${APIKEY}&units=metric`)
      }
      // async queryFn() {
      //   try {
      //     const APIKEY = import.meta.env.VITE_WEATHER_API_KEY
      //     const LATITUDE = 37.5948
      //     const LONGITUDE = 127.0531
      //     const responsing = axios.get(
      //       `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&APPID=${APIKEY}&units=metric`,
      //     )
      //     const response = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&APPID=${APIKEY}&units=metric`)
      //     .then((res) => res.json())

      //     return { data: response }
      //   } catch (error) {
      //     return { error: error }
      //   }
      // },
    }),
  }),
})

export const { useGetWeatherQuery } = weather
