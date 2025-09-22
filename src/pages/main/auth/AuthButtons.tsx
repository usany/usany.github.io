import Button from '@mui/material/Button'
import staticGoogle from 'src/assets/signGoogle.svg'
import staticMicrosoft from 'src/assets/signMicrosoft.svg'
import {
  onSocialClick,
  onSocialClickApple,
  onSocialClickGoogle,
  onSocialClickMicrosoft,
} from 'src/baseApi/serverbase'
import { useSelectors, useTexts } from 'src/hooks'

const AuthButtons = () => {
  const onLine = useSelectors((state) => state.onLine.value)
  const {needNetworkConnection, continueWithMicrosoft, continueWithGoogle, comingSoonWithApple} = useTexts()
  const buttons = [
    {
      id: 'continueWithMicrosoft',
      image: <img src={staticMicrosoft} className="w-[20px]" />,
      onClick: () => onSocialClickMicrosoft(),
      text:continueWithMicrosoft
    },
    {
      id: 'continueWithGoogle',
      image: <img src={staticGoogle} className="w-[20px]" />,
      onClick: () => onSocialClickGoogle(),
      text:continueWithGoogle
    },
    {
      id: 'continueWithApple',
      image: <img src={staticGoogle} className="w-[20px]" />,
      onClick: () => onSocialClickApple(),
      text: comingSoonWithApple
    },
  ]
  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        {buttons.map((value) => {
          return (
            <Button
              className="colorTwo"
              startIcon={value.image}
              variant="outlined"
              onClick={() => {
                if (onLine) {
                  value.onClick
                } else {
                  alert(needNetworkConnection)
                }
              }}
            >
              {value.text}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default AuthButtons
