import AddItemSelects from 'src/muiComponents/AddItemSelects'
import AddStepTitle from 'src/muiComponents/AddStepTitle'


interface Props {
    borrow: boolean
    item: string
    changeItem: (event: {preventDefault: () => void, target: {value: string}}) => void
}

const AddStepOne = ({ borrow, item, changeItem }: Props) => {
    const title = [`1. 무엇을 ${borrow ? '빌리세요?' : '빌려주세요?'}`]
    
    return (
        <>
            <AddStepTitle title={title} />
            <div className='flex px-5'>
                <AddItemSelects item={item} changeItem={changeItem}/>
            </div>
        </>
    )
}

export default AddStepOne