import { collection, getDocs } from 'firebase/firestore'
import { Clock, PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import Avatars from '../Avatars'
import PageTitle from '../pageTitle/PageTitle'
import Popups from '../Popups'

function Specific({ userObj }) {
  const [images, setImages] = useState([])
  const [attachment, setAttachment] = useState(null)
  const changeAttachment = (newValue) => setAttachment(newValue)
  const [changedImage, setChangedImage] = useState({
    attachment: false,
    profileCharacter: '',
    profileImage: false,
    defaultProfile: '',
    profileImageUrl: '',
    profileColor: '',
    initial: true,
    changed: false,
  })
  const profile = {
    attachment: false,
    profileCharacter: '',
    profileImage: false,
    defaultProfile: '',
    profileImageUrl: '',
    profileColor: '',
    initial: true,
    changed: false,
  }
  const handleChangedImage = (newValue) => setChangedImage(newValue)
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event
    const theFile = files[0]
    console.log(files)
    const reader = new FileReader()
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent)
      const {
        currentTarget: { result },
      } = finishedEvent
      // console.log(result)
      changeAttachment(result)
    }
    reader.readAsDataURL(theFile)
  }
  useEffect(() => {
    if (attachment && !changedImage.attachment) {
      setChangedImage({
        ...changedImage,
        attachment: true,
        profileImage: true,
        profileImageUrl: attachment,
        changed: true,
      })
    }
  }, [attachment])
  useEffect(() => {
    const bringImages = async () => {
      const ref = collection(dbservice, 'members')
      const docs = await getDocs(ref)
      const newImages = []
      docs.forEach((element) => {
        const defaultProfile = element.data().defaultProfile
        if (defaultProfile) {
          newImages.push(defaultProfile)
        }
      })
      setImages(newImages)
    }
    bringImages()
  }, [])
  return (
    <div>
      <PageTitle icon={<Clock />} title={'앨범'} />
      <Popups
        trigger={
          <div
            className="flex gap-5 justify-center"
            onClick={() => {
              handleChangedImage({
                ...changedImage,
                attachment: '',
                profileColor: profile.profileColor,
                profileImage: false,
                defaultProfile: profile.defaultProfile,
                changed: false,
              })
              changeAttachment(null)
            }}
          >
            <PlusCircle />
            추가
          </div>
        }
        title={'추가'}
        content={
          <div className="flex flex-col px-5 items-center gap-5">
            <Avatars
              element={changedImage.changed ? changedImage : profile}
              profile={true}
            />
            <label htmlFor="file" className="p-5 rounded border border-dashed">
              내 파일 업로드
            </label>
            <input id="file" type="file" onChange={onFileChange} hidden />
          </div>
        }
        close={<div>완료</div>}
        attachment={changedImage}
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] col-span-full">
        {images.map((element, index) => {
          return <img key={index} src={element} className="w-[80px] h-[80px]" />
        })}
      </div>
    </div>
  )
}

export default Specific
