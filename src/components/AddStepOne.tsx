import AddItemSelects from 'src/muiComponents/AddItemSelects'
import AddStepTitle from 'src/muiComponents/AddStepTitle'


interface Props {
    borrow: boolean
    item: string
    changeItem: (event: PointerEvent) => void
}

const AddStepOne = ({ borrow, item, changeItem }: Props) => {
    const title = [`1. 무엇을 ${borrow ? '빌리세요?' : '빌려주세요?'}`]
    
    return (
        <div className='flex flex-col'>
            <AddStepTitle title={title} />
            <div className='flex px-5'>
                <AddItemSelects item={item} changeItem={changeItem}/>
            </div>
        </div>
    )
}

export default AddStepOne