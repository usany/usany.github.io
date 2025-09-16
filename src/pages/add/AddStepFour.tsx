import AddStepTitle from 'src/pages/add/AddStepTitle'
// import RegisteredCards from 'src/components/recycle/recycleRegisteredCards';

interface Props {
    display: {id: string} | null
}

const AddStepFour = ({ display }: Props) => {
    const title = ['4. 등록 완료', '(등록 카드는 내 상태, 게시판에서 확인할 수 있습니다)']
    return (
        <div className='pb-52'>
            <AddStepTitle title={title} />
            {/* <RegisteredCards msgObj={display} isOwner={true} /> */}
        </div>
    )
}

export default AddStepFour
