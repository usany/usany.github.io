import AddStepTitle from 'src/components/add/AddStepTitle'
import Pickers from 'src/components/add/Pickers'

interface Props {
    onChangeFrom: (event: {}) => void 
    onChangeTo: (event: {}) => void
}

const AddStepThree = ({ onChangeFrom, onChangeTo }: Props) => {
    const title = ['3. 시간 입력']
    
    return (
        <div>
            <AddStepTitle title={title}/>
            <div className='flex flex-col w-full px-5'>
                <Pickers onChange={onChangeFrom} label={"이 때부터"}  />
                <Pickers onChange={onChangeTo} label={"이 때까지"} />
            </div>
        </div>
    )
}

export default AddStepThree