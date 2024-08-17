import { useState, useEffect } from 'react'
import BeachAccess from '@mui/icons-material/BeachAccess'
import Badge from '@mui/material/Badge';

function Badges({ counter, tmpCounter }) {
    const [num, setNum] = useState(0)
    useEffect(() => {
        setInterval(() => {
            setNum(tmpCounter.length), 1000
            // console.log(tmpCounter.length)
        })
        // tmpCounterLength = counter.length
    })
    return (
        <Badge badgeContent={num} color="primary">
            <BeachAccess/>
        </Badge>
    )
}

export default Badges
