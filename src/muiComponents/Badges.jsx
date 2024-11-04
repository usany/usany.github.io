import { useState, useEffect } from 'react'
import BeachAccess from '@mui/icons-material/BeachAccess'
import Badge from '@mui/material/Badge';

const Badges = () => {
    const [num, setNum] = useState('')
    // useEffect(() => {
    //     setInterval(() => {
    //         setNum(tmpCounter.length), 1000
    //     })
    // })
    return (
        <Badge badgeContent={num} color="primary">
            <BeachAccess/>
        </Badge>
    )
}

export default Badges
