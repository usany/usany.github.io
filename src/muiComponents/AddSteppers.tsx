import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const addSteps = [
    '장소 입력',
    '시간 입력',
    '등록 완료',
];
const borrowSteps = [
    '빌리기 요청',
    '요청 진행 중',
    '공유 진행 중',
    '반납 확인 중',
    '반납 완료',
];
const lendSteps = [
    '빌려주기 요청',
    '요청 진행 중',
    '공유 진행 중',
    '반납 확인 중',
    '반납 완료',
];
  
function AddSteppers({ steps }) {
    return (
        <div className='w-full'>
            <Stepper 
            // sx={{width: '500px'}} 
            activeStep={steps} alternativeLabel>
                {addSteps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    )
}

export default AddSteppers
