import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

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

function Steppers({ msgObj }) {
  return (
    <div>
      <Stepper activeStep={msgObj.round - 1} alternativeLabel>
        {msgObj.text.choose === 1 &&
          borrowSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        {msgObj.text.choose === 2 &&
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
