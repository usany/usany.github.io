import Button from '@mui/material/Button';

interface Props {
    submit: (event: {}) => void
}

const AddRegisterButton = ({ submit, fromTo }: Props) => {
    return (
        <form className='flex justify-center pt-5' id='selection' onSubmit={submit}>
            {fromTo.from?.gmt < fromTo.to?.gmt ? 
                <Button variant='outlined' form='selection' type='submit'>등록하기</Button>
            :
                <Button variant='outlined' form='selection' type='submit' disabled>등록하기</Button>
            }
        </form>
    )
}

export default AddRegisterButton