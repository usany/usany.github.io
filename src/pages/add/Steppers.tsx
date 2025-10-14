import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import useSelectors from 'src/hooks/useSelectors'

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

function Steppers({ message }) {
  const languages = useSelectors((state) => state.languages.value)
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'

  return (
    <div>
      <Stepper
        activeStep={message.round - 1} alternativeLabel>
        {steps[index].map((label) => (
          <Step key={label}>
            <StepLabel>
              <div className='text-xs'>
                {label}
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default Steppers
