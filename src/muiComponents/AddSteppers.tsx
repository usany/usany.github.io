import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const borrowSteps = [
    ['무엇을 빌리세요?', '우산 / 양산 선택'],
    '장소 입력',
    '시간 입력',
    '등록 완료',
];
const lendSteps = [
    ['무엇을 빌려주세요?', '우산 / 양산 선택'],
    '장소 입력',
    '시간 입력',
    '등록 완료',
];
  
function AddSteppers({ steps, toggleTabs }) {
    const stepsCollection = [borrowSteps, lendSteps]
    return (
        <div className='w-full'>
            <Stepper 
            activeStep={steps} alternativeLabel>
                {stepsCollection[toggleTabs].map((label, index) => {
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
                })}
                {/* {!toggleTabs === 0 && borrowSteps.map((label, index) => {
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
                })}
                {toggleTabs !== 0 && lendSteps.map((label, index) => {
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
