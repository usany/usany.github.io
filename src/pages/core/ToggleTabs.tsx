import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Maximize2, Minimize2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTabs } from 'src/stateSlices/tabsSlice';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ToggleTabs() {

  const handleChange = (newValue) => {
    dispatch(changeTabs(newValue))
  };
  const tabs = useSelector(state => state.tabs.value)
  const dispatch = useDispatch()
  useEffect(() => {
    if (window.location.search === '?action=lend') {
      handleChange(1)
    }
  })
  const tabsBox = useMemo(() => {
    return (
      <Box sx={{
        width: '148px'
        // paddingX: '10px'
      }}>
        <Tabs
          sx={{
            animation: 0,
            animationDuration: 0
          }}
          value={tabs} onChange={handleChange} aria-label="basic tabs example"
        >
          <Tab
            sx={{ width: '64px' }}
            label={<Minimize2 />} {...a11yProps(0)} />
          <Tab
            sx={{ width: '64px' }}
            label={<Maximize2 />} {...a11yProps(1)} />
        </Tabs>
      </Box>
    )
  }, [tabs])
  return (
    <div className=''>
      {/* <Box sx={{ paddingX: '10px'
        }}>
        <Tabs
          value={tabs} onChange={handleChange} aria-label="basic tabs example"
        >
          <Tab label={<Minimize2 />} {...a11yProps(0)} />
          <Tab label={<Maximize2 />} {...a11yProps(1)} />
        </Tabs>
      </Box> */}
      {tabsBox}
    </div>
  );
}
