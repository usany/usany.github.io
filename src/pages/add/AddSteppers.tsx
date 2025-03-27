import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useSelector } from 'react-redux';

interface Props {
  addSteps: number
  borrow: boolean
}

const stepOneItems = '우산 / 양산 선택'
const stepsTwoToFour = [
  ['장소 입력'],
  ['시간 입력'],
  ['등록 완료'],
]
const borrowSteps = [
  ['무엇을 빌리세요?', stepOneItems],
  ...stepsTwoToFour
];
const lendSteps = [
  ['무엇을 빌려주세요?', stepOneItems],
  ...stepsTwoToFour
];
const stepsCollection = [borrowSteps, lendSteps]
const stepOneItemsLanguages = 'Usan / Yangsan selection'
const stepsTwoToFourLanguages = [
  ['Location Input'],
  ['Time Input'],
  ['Register Complete'],
]
const borrowStepsLanguages = [
  ['What are you borrowing?', stepOneItemsLanguages],
  ...stepsTwoToFourLanguages
]
const lendStepsLanguages = [
  ['What are you lending?', stepOneItemsLanguages],
  ...stepsTwoToFourLanguages
]
const stepsCollectionLanguages = [borrowStepsLanguages, lendStepsLanguages]
function AddSteppers({ addSteps, borrow }: Props) {
  const languages = useSelector((state) => state.languages)
  return (
    <div className='w-full'>
      <Stepper
        activeStep={addSteps}
        alternativeLabel
      >
        {languages === 'ko' ?
          stepsCollection[[true, false].indexOf(borrow)].map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>
                  {label.map((element, index) => {
                    return (
                      <div key={index} className='truncate'>{element}</div>
                    )
                  })}
                </StepLabel>
              </Step>
            )
          })
          :
          stepsCollectionLanguages[[true, false].indexOf(borrow)].map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>
                  {label.map((element, index) => {
                    return (
                      <div key={index} className='truncate'>{element}</div>
                    )
                  })}
                </StepLabel>
              </Step>
            )
          })
        }
      </Stepper>
    </div>
  )
}

export default AddSteppers
