import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const PullRefresh = () => {
    useEffect(() => {
        let refresh = false
        const pullToRefresh = document.querySelector('.pull-to-refresh');
        let touchstartY = 0;
        document.addEventListener('touchstart', e => {
            touchstartY = e.touches[0].clientY;
        });
        document.addEventListener('touchmove', e => {
            const touchY = e.touches[0].clientY;
            const touchDiff = touchY - touchstartY;
            if (touchDiff > 0 && window.scrollY === 0) {
                if (touchDiff > 500) {
                    pullToRefresh?.classList.add('visible');
                    refresh = true
                }
                else {
                    pullToRefresh?.classList.remove('visible');
                    refresh = false
                }
            }
        });
        document.addEventListener('touchend', e => {
            if (refresh) {
                if (pullToRefresh?.classList.contains('visible')) {
                    pullToRefresh?.classList.remove('visible');
                    window.location.reload();
                }
            }
        });
    })
    return (
        <div className="pull-to-refresh">
            <Box sx={{ width: '100%' }}>
                <span>Loading</span>
                <LinearProgress />
            </Box>
        </div>
    )
}

export default PullRefresh
