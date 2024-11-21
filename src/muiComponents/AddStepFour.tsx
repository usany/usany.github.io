import { useState, useEffect } from 'react'
import ItemSelects from 'src/muiComponents/ItemSelects'
import Selects from 'src/muiComponents/Selects'
import TextField from '@mui/material/TextField';
import AddStepTitle from 'src/muiComponents/AddStepTitle'
import RegisteredCards from 'src/muiComponents/RegisteredCards';

interface Props {
    display: {id: string} | null
}

const AddStepFour = ({ display }: Props) => {
    const title = ['4. 등록 완료', '(등록 카드는 내 상태, 게시판에서 확인할 수 있습니다)']
    return (
        <div>
            <AddStepTitle title={title} />
            {/* <div className='flex flex-col text-base px-5 pt-5'>
                <div>4. 등록 완료</div>
                <div>(등록 카드는 내 상태, 게시판에서 확인할 수 있습니다)</div>
            </div> */}
            {/* <div className='flex text-base px-5'>
                (등록 카드는 내 상태, 게시판에서 확인할 수 있습니다)
            </div> */}
            <RegisteredCards msgObj={display} isOwner={true} />
            {/* <div className='flex px-5 pt-5 pb-52'>
            </div> */}
        </div>
    )
}

export default AddStepFour