import { createClient } from '@supabase/supabase-js'
import { User } from 'firebase/auth'
import { useSelectors } from 'src/hooks/useSelectors'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import Accordions from './Accordions/Accordions'
import useContextMenu from './useContextMenu'
import useGetToken from './useGetToken'
import useSetProfile from './useSetProfile'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import staticImg from 'src/assets/blue.png'
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
  // const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
  const supabase = createClient('https://ijsfbngiyhgvolsprxeh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlqc2ZibmdpeWhndm9sc3ByeGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5ODA2MDksImV4cCI6MjA3MDU1NjYwOX0._tvdubZqog1Awb58KzYETJqCWuT7DbjaStPLnWdRvdk');
  const [img, setImg] = useState(null)
  const uploadImages = async () => {
    const { data, error } = await supabase.storage
      .from('remake')
      .upload('publicImages.png', staticImg)
    if (data) {
      console.log(data)
    }
    if (error) {
      console.log(error)
    }
  }
  console.log(img)
  const downloadImages = async () => {
    const { data, error } = await supabase.storage.from('remake').getPublicUrl('publicImages.png')
    if (data) {
      // const reader = new FileReader();
      // const newImg = reader.readAsDataURL(data)
      setImg(data.publicUrl)
      console.log(data)
    }
    if (error) {
      console.log(error)
    }
  }
  return (
    <div id="sample" className="flex justify-center flex-col pb-5">
      <PageTitle title={titles[index]} />
      <Accordions userObj={userObj} />
      <button onClick={uploadImages}>upload</button>
      <button onClick={downloadImages}>download</button>
      {img && <img src={img} />}
      {/* <PushNotificationButton /> */}
      {/* <Avatar sx={{ bgcolor: blue[500] }} alt="Remy Sharp" src="./assets/groups.png" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
    </div>
  )
}

export default Menu
