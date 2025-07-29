import { Clock } from 'lucide-react'
import { useState } from 'react'
import PageTitle from '../pageTitle/PageTitle'
import Popups from '../Popups'

function Specific({ userObj }) {
  const [cardFlipped, setCardFlipped] = useState(false)
  const [onMove, setOnMove] = useState(false)
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
  return (
    <div>
      <PageTitle icon={<Clock />} title={'앨범'} />
      <Popups
        trigger={<div>추가</div>}
        title={'추가'}
        content={
          <div className="flex px-5 justify-center p-5">
            <label htmlFor="file" className="p-5 rounded border border-dashed">
              내 파일 업로드
            </label>
            <input id="file" type="file" onChange={onFileChange} hidden />
          </div>
        }
        close={<div>완료</div>}
        attachment={changedImage}
      />
    </div>
  )
}

export default Specific
