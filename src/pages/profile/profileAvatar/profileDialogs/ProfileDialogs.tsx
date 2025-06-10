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

const images = {
  'profile-red': [staticRed01, staticRed02],
  '#2196f3': [staticBlue01, staticBlue02],
  'profile-amber': [staticGold01, staticGold02],
  'profileRed': [staticRed01, staticRed02],
  'profileBlue': [staticBlue01, staticBlue02],
  'profileGold': [staticGold01, staticGold02],
  gold: [staticGold01, staticGold02],
}
const ProfileDialogs = ({ changedImage, handleChangedImage, profile, changeProfile, }) => {
  const profileColor = useSelector(state => state.profileColor.value)
  const dispatch = useDispatch()
  const switchColor = (newColor) => {
    dispatch(changeProfileColor(newColor))
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
      handleChangedImage({ attachment: result, ...changedImage })
    }
    reader.readAsDataURL(theFile)
  }
  const selectedImages = images[profileColor] || images['gold']

  return (
    <>
      <div className='flex flex-col items-center gap-5 p-5'>
        <Avatars
          element={changedImage.attachment ? { profileImage: true, profileImageUrl: changedImage.attachment } : profile}
          profile={true}
        />
        <div className='flex-col px-5 content-center p-5'>
          <label htmlFor='file' className='p-5 rounded border border-dashed'>내 파일 업로드</label>
          <input id='file' type='file' onChange={onFileChange} hidden />
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='flex justify-center'>캐릭터 배경으로 저장하면 업로드 파일이 삭제됩니다.</div>
        <div className='flex justify-center gap-5'>
          {selectedImages.map((value, index) => {
            return (
              <div
                key={profileColor + index + 1}
                onClick={() => {
                  if (index) {
                    changeProfile({ ...profile, chararcter: 'plant' })
                  } else {
                    changeProfile({ ...profile, chararcter: 'animal' })
                  }
                  handleChangedImage(value)
                }}>
                <Avatars element={{ profileImage: true, defaultProfile: value, profileImageUrl: value }} uid='' profile={false} profileColor={''} profileUrl={value} piazza={null} />
              </div>
            )
          })}
        </div>
        <div className='flex justify-center h-5'>
          <div className='flex justify-center rounded-xl w-10 bg-profile-red' onClick={() => switchColor('profileRed')}>{profileColor === 'profileRed' &&
            <Check />}</div>
          <div className='flex justify-center rounded-xl w-10 bg-profile-blue' onClick={() => switchColor('profileBlue')}>{profileColor === 'profileBlue' &&
            <Check />}</div>
          <div className='flex justify-center rounded-xl w-10 bg-profile-amber' onClick={() => switchColor('profileGold')}>{profileColor === 'profileGold' &&
            <Check />}</div>
        </div>
      </div>
      {changedImage.changed &&
        <div className='flex justify-center p-5'>
          <Button variant='outlined' disabled>저장</Button>
        </div>
      }
    </>
  )
}

export default ProfileDialogs
