// import { useAvatarColorStore, useAvatarImageStore } from 'src/store'
import { Button } from '@mui/material';
import { Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import staticBlue01 from "src/assets/blue02.png";
import staticBlue02 from "src/assets/blue03.png";
import staticGold01 from "src/assets/gold1.png";
import staticGold02 from "src/assets/gold2.png";
import staticRed01 from "src/assets/red1.png";
import staticRed02 from "src/assets/red2.png";
import Avatars from 'src/pages/core/Avatars';
import { changeProfileColor } from 'src/stateSlices/profileColorSlice';
import useTexts from 'src/useTexts';
const images = {
  'profile-red': [staticRed01, staticRed02],
  '#2196f3': [staticBlue01, staticBlue02],
  'profile-amber': [staticGold01, staticGold02],
  'profileRed': [staticRed01, staticRed02],
  'profileBlue': [staticBlue01, staticBlue02],
  'profileGold': [staticGold01, staticGold02],
  gold: [staticGold01, staticGold02],
}
const ProfileDialogs = ({ attachment, changeAttachment, changedImage, handleChangedImage }) => {
  const { currentImageWillBeDeletedWhenCharacterImagesAreSelected, uploadMyFile, save } = useTexts()
  // const [copyingProfile, setCopyingProfile] = useState({
  //   profileImage: false,
  //   defaultProfile: '',
  //   profileImageUrl: '',
  //   profileColor: '',
  //   initial: true
  // })
  // useEffect(() => {
  //   if (copyingProfile.initial) {
  //     setCopyingProfile(profile)
  //   }
  // }, [])
  const profile = useSelector((state) => state.profile.value)
  const profileColor = useSelector(state => state.profileColor.value)
  const dispatch = useDispatch()
  const switchColor = (newColor) => {
    dispatch(changeProfileColor(newColor))
    handleChangedImage({ ...changedImage, profileColor: newColor, changed: true })
  }

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    console.log(files)
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      // console.log(result)
      changeAttachment(result)
    }
    reader.readAsDataURL(theFile)
  }
  const selectedImages = images[changedImage.profileColor] || images['gold']
  // console.log(attachment)
  return (
    <>
      <div className='flex flex-col items-center gap-5 p-5'>
        <Avatars
          element={changedImage.changed ? changedImage : profile}
          profile={true}
        />
        <div className='flex-col px-5 content-center p-5'>
          <label htmlFor='file' className='p-5 rounded border border-dashed'>{uploadMyFile}</label>
          <input id='file' type='file' onChange={onFileChange} hidden />
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='flex justify-center'>{currentImageWillBeDeletedWhenCharacterImagesAreSelected}</div>
        <div className='flex justify-center gap-5'>
          {selectedImages.map((value, index) => {
            return (
              <div
                key={profileColor + index + 1}
                onClick={() => {
                  // const storage = getStorage();
                  // const reference = ref(storage, `${index ? 'plant' : 'animal'}${changedImage.profileColor}.png`);
                  // console.log(reference)
                  // getDownloadURL(reference).then((url) => {
                  //   console.log(url)
                  // })
                  const defaultProfile = images[profileColor][index]
                  handleChangedImage({ ...changedImage, attachment: '', profileCharacter: index ? 'plant' : 'animal', profileImage: false, defaultProfile: defaultProfile, changed: true })
                  changeAttachment(null)
                  const fileInput = document.getElementById('file') || { value: null }
                  fileInput.value = null
                  // console.log(defaultProfile)
                  // if (index) {
                  //   handleChangedImage({ ...profile, character: 'plant' })
                  // } else {
                  //   handleChangedImage({ ...profile, character: 'animal' })
                  // }
                }}>
                <Avatars element={{ profileImage: true, defaultProfile: value, profileImageUrl: value }} uid='' profile={false} profileColor={''} profileUrl={value} piazza={null} />
              </div>
            )
          })}
        </div>
        <div className='flex justify-center h-5'>
          <div className='flex justify-center rounded-xl w-10 bg-profile-red' onClick={() => switchColor('profileRed')}>{changedImage.profileColor === 'profileRed' &&
            <Check />}</div>
          <div className='flex justify-center rounded-xl w-10 bg-profile-blue' onClick={() => switchColor('profileBlue')}>{changedImage.profileColor === 'profileBlue' &&
            <Check />}</div>
          <div className='flex justify-center rounded-xl w-10 bg-profile-amber' onClick={() => switchColor('profileGold')}>{changedImage.profileColor === 'profileGold' &&
            <Check />}</div>
        </div>
      </div>
      {!changedImage.changed &&
        <div className='flex justify-center p-5'>
          <Button variant='outlined' disabled>{save}</Button>
        </div>
      }
    </>
  )
}

export default ProfileDialogs
