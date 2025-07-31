import { User } from 'firebase/auth'
import { useState } from 'react'
import { useSelectors } from 'src/hooks/useSelectors'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import Accordions from './Accordions/Accordions'
import useContextMenu from './useContextMenu'
import useGetToken from './useGetToken'
import useSetProfile from './useSetProfile'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface Props {
  userObj: User
}

const titles = {
  ko: '내 상태',
  en: 'My Status',
}

function Menu({ userObj }: Props) {
  const [img, setImg] = useState('')
  const languages = useSelectors((state) => state.languages.value)
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'
  useSetProfile(userObj)
  useGetToken(userObj)
  useContextMenu()
  window.addEventListener('online', function () {
    console.log('You are online!')
  })
  window.addEventListener('offline', function () {
    console.log('Oh no, you lost your network connection.')
  })
  if (navigator.onLine) {
    console.log('online')
  } else {
    console.log('offline')
  }
  const onClick = async () => {
    // const cachedResponse = await cache.match(request)
    // console.log(cache)
    // if (cachedResponse) {
    //   console.log(`retrieving response from cache`)
    //   return cachedResponse
    // }
    // async function getCachedData(cacheName, url) {
    //   const cacheStorage = await caches.open(cacheName)
    //   const cachedResponse = await cacheStorage.match(url)

    //   if (!cachedResponse || !cachedResponse.ok) {
    //     return false
    //   }

    //   return await cachedResponse.json()
    // }
    const cachedData = caches.match('/blue.png').then((cache) => {
      console.log(cache.url)
      setImg(cache.url)
      return cache
    })
  }
  const staticImg = img
  console.log(staticImg)
  return (
    <div id="sample" className="flex justify-center flex-col pb-5">
      <PageTitle title={titles[index]} />
      <button onClick={onClick}>service worker</button>
      <img src={staticImg} />
      <Accordions userObj={userObj} />
      {/* <Avatar sx={{ bgcolor: blue[500] }} alt="Remy Sharp" src="./assets/groups.png" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
    </div>
  )
}

export default Menu
