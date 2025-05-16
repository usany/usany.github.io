import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { useSelectors } from 'src/hooks/useSelectors'

const authSteps = ['계정 입력', '프로필 입력']
// const borrowSteps = [
//   '빌리기 요청',
//   '요청 확인 중',
//   '공유 진행 중',
//   '반납 확인 중',
//   '반납 완료',
// ]
// const lendSteps = [
//   '빌려주기 요청',
//   '요청 확인 중',
//   '공유 진행 중',
//   '반납 확인 중',
//   '반납 완료',
// ]
// {
//   en: [
//     'Borrowing request',
//     'Request confirming',
//     'Sharing on process',
//     'Confirming return',
//     'Return confirmed'
//   ],
// }
const steps = {
  ko: [
    '등록',
    '요청 중',
    '공유 중',
    '반납 중',
    '반납 완료',
  ],
  en: [
    'Registered',
    'Requesting',
    'Sharing',
    'Returning',
    'Returned'
  ]
}
const lendSteps = {
  ko: [
    '빌려주기 요청',
    '요청 확인 중',
    '공유 진행 중',
    '반납 확인 중',
    '반납 완료',
  ],
  en: [
    'Lending request',
    'Request confirming',
    'Sharing on process',
    'Confirming return',
    'Return confirmed'
  ]
}

function Steppers({ message, round }) {
  const languages = useSelectors((state) => state.languages.value)
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'

  return (
    <div className='scale-90'>
      <Stepper
        activeStep={round - 1} alternativeLabel>
        {message.text.choose === 1 &&
          steps[index].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        {message.text.choose === 2 &&
          steps[index].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
      </Stepper>
    </div>
  )
}

export default Steppers
