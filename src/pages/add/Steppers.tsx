import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'

const authSteps = ['계정 입력', '프로필 입력']
const borrowSteps = [
  '빌리기 요청',
  '요청 확인 중',
  '공유 진행 중',
  '반납 확인 중',
  '반납 완료',
]
const lendSteps = [
  '빌려주기 요청',
  '요청 확인 중',
  '공유 진행 중',
  '반납 확인 중',
  '반납 완료',
]

function Steppers({ message }) {
  return (
    <div>
      <Stepper activeStep={message.round - 1} alternativeLabel>
        {message.text.choose === 1 &&
          borrowSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        {message.text.choose === 2 &&
          lendSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
      </Stepper>
    </div>
  )
}

export default Steppers
