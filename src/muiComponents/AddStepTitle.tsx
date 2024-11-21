import { useState, useEffect } from 'react'
import ItemSelects from 'src/muiComponents/ItemSelects'

interface Props {
    borrow: boolean, title: string, changeItem: (event: {}) => void
}

const AddStepTitle = ({ title }: {title: string[]}) => {
    
    return (
        <div className='flex flex-col text-base px-5 pt-5'>
            {title.map((element) => <div>{element}</div>)}
        </div>
    )
}

export default AddStepTitle