import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

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

function AddSteppers({ addSteps, borrow }) {
    return (
        <div className='w-full'>
            <Stepper 
            activeStep={addSteps} alternativeLabel>
                {borrow ? stepsCollection[0].map((label, index) => {
                    return (
                        <Step key={index}>
                            <StepLabel>
                                {label.map((element, index) => {
                                    return (
                                        <div key={index}>{element}</div>
                                    )
                                })}
                            </StepLabel>
                        </Step>
                    )
                }) :
                stepsCollection[1].map((label, index) => {
                    return (
                        <Step key={index}>
                            <StepLabel>
                                {label.map((element, index) => {
                                    return (
                                        <div key={index}>{element}</div>
                                    )
                                })}
                            </StepLabel>
                        </Step>
                    )
                })}
                {/* {toggleTabs !== 0 && lendSteps.map((label, index) => {
                    if (index === 0) {
                        return (
                            <Step key={index}>
                                <StepLabel>
                                    <div>{label[0]}</div>
                                    <div>{label[1]}</div>
                                </StepLabel>
                            </Step>
                        )
                    } else {
                        return (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        )
                    }
                })} */}
            </Stepper>
        </div>
    )
}

export default AddSteppers
