import { GoogleGenAI } from '@google/genai'
import { collection, getDocs } from 'firebase/firestore'
import { Clock, PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import {
  MorphingDialog,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from 'src/components/ui/morphing-dialog'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import Avatars from '../Avatars'
import PageTitle from '../pageTitle/PageTitle'
import Popups from '../Popups'

function Specific({ userObj }) {
  const genai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })
  async function chat(url) {
    try {
      let file = 'png'
      console.log(url.slice(url.indexOf('/') + 1, url.indexOf('/') + 2))
      if (url.slice(url.indexOf('/') + 1, url.indexOf('/') + 2) === 'p') {
        file = 'png'
      } else if (
        url.slice(url.indexOf('/') + 1, url.indexOf('/') + 2) === 'j'
      ) {
        file = 'jpeg'
      }
      const contents = [
        {
          inlineData: {
            mimeType: `image/${file}`,
            data: url.slice(url.indexOf(',') + 1),
          },
        },
        { text: 'Is there any umbrella? Yes or no.' },
      ]
      const response = await genai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
      })
      setLoading(false)
      return response.text
    } catch (error) {
      console.log(error)
    }
  }
  const [loading, setLoading] = useState(false)
  const [isUmbrella, setIsUmbrella] = useState('')
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
  const [drawerOpen, setDrawerOpen] = useState(false)
  const dispatch = useDispatch()
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
  const navigate = useNavigate()
  const handleChangedImage = (newValue) => setChangedImage(newValue)
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event
    const theFile = files[0]
    console.log(files)
    const reader = new FileReader()
    reader.onloadend = async (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent
      changeAttachment(result)
      setIsUmbrella(null)
      setLoading(true)
      const response = await chat(result)
      setIsUmbrella(response)
    }
    reader.readAsDataURL(theFile)
  }
  const newImage = () => {
    if (attachment) {
      setImages((images) => [
        {
          uid: userObj.uid,
          displayName: userObj.displayName,
          defaultProfile: attachment,
        },
        ...images,
      ])
    }
  }
  useEffect(() => {
    if (loading) {
      setChangedImage({
        attachment: false,
        profileCharacter: '',
        profileImage: false,
        defaultProfile: '',
        profileImageUrl: '',
        profileColor: '',
        initial: true,
        changed: false,
      })
    }
    if (attachment && !changedImage.attachment) {
      setChangedImage({
        ...changedImage,
        attachment: true,
        profileImage: true,
        profileImageUrl: attachment,
        changed: true,
      })
    }
  }, [loading])
  useEffect(() => {
    const bringImages = async () => {
      const ref = collection(dbservice, 'members')
      const docs = await getDocs(ref)
      const newImages = []
      docs.forEach((element) => {
        const uid = element.data().uid
        const displayName = element.data().displayName
        const defaultProfile = element.data().defaultProfile
        if (defaultProfile) {
          newImages.push({
            uid: uid,
            displayName: displayName,
            defaultProfile: defaultProfile,
          })
        }
      })
      setImages(newImages)
    }
    bringImages()
  }, [])
  useEffect(() => {
    dispatch(changeBottomNavigation(5))
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
            {!loading && (
              <>
                <label
                  htmlFor="file"
                  className="p-5 rounded border border-dashed"
                >
                  내 파일 업로드
                </label>
                <input id="file" type="file" onChange={onFileChange} hidden />
                {['n', 'N'].indexOf(isUmbrella ? isUmbrella[0] : isUmbrella) !==
                  -1 && <div>우산이 아닙니다.</div>}
              </>
            )}
            {loading && <div>로딩</div>}
          </div>
        }
        close={
          attachment &&
          ['y', 'Y'].indexOf(isUmbrella ? isUmbrella[0] : isUmbrella) !==
            -1 && <div onClick={newImage}>완료</div>
        }
        attachment={changedImage}
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] col-span-full p-5">
        {images.map((element, index) => {
          return (
            <MorphingDialog key={index}>
              <MorphingDialogTrigger>
                <img
                  src={element.defaultProfile}
                  className="w-[80px] h-[80px]"
                  onClick={() => {
                    navigate(`/specific?id=${index}`)
                  }}
                />
              </MorphingDialogTrigger>
              <MorphingDialogContainer>
                <MorphingDialogContent
                  drawerOpen={drawerOpen}
                  drawerOpenFalse={() => setDrawerOpen(false)}
                >
                  <div className="flex flex-col">
                    <div>Photo by {element.displayName}</div>
                    <img src={element.defaultProfile} />
                  </div>
                </MorphingDialogContent>
              </MorphingDialogContainer>
            </MorphingDialog>
          )
        })}
      </div>
    </div>
  )
}

export default Specific
