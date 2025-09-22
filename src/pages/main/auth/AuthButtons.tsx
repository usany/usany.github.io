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
  const {needNetworkConnection} = useTexts()
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center w-[250px]">
        <div className="flex flex-col">
          <Button
            className="colorTwo"
            startIcon={<img src={staticMicrosoft} className="w-[20px]" />}
            variant="outlined"
            onClick={() => {
              if (onLine) {
                onSocialClickMicrosoft()
              } else {
                alert(needNetworkConnection)
              }
            }}
          >
            마이크로소프트 로그인
          </Button>
          <Button
            className="colorTwo"
            startIcon={<img src={staticGoogle} className="w-[20px]" />}
            variant="outlined"
            name="g"
            onClick={() => {
              if (onLine) {
                onSocialClickGoogle()
              } else {
                alert(needNetworkConnection)
              }
            }}
          >
            구글 로그인
          </Button>
          <Button
            className="colorTwo"
            variant="outlined"
            name="h"
            onClick={() => {
              if (onLine) {
                onSocialClickApple()
              } else {
                alert(needNetworkConnection)
              }
            }}
          >
            곧 애플로 뵐게요
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AuthButtons
