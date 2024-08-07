import BeachAccess from '@mui/icons-material/BeachAccess'
import Badge from '@mui/material/Badge';

function Badges({ counter }) {
    return (
        <Badge badgeContent={counter.length} color="primary">
            <BeachAccess/>
        </Badge>
    )
}

export default Badges
