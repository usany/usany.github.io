import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTabsStore } from 'src/store'
import { Minimize2 } from 'lucide-react';
import { Maximize2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux'
import { changeTabs } from 'src/stateSlices/tabsSlice'

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
  
  const handleChange = (event, newValue) => {
    // handleTabs(newValue)
    // if (valuing<2) {
    //   setValuing(newValue);
    // } else {
    //   setValuing(newValue);
    // }
    dispatch(changeTabs(newValue))
  };
  // const tabs = useTabsStore((state) => state.tabs)
  // const handleTabs = useTabsStore((state) => state.handleTabs)
  const tabs = useSelector(state => state.tabs.value)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (valuing === 1) {
  //     setValue(0)
  //   }
  // })
  // useEffect(() => {
  //   if (valuing === 3) {
  //     setValue(1)
  //   }
  // })
  // useEffect(() => {
  //   if (valuing === 0) {
  //     setValue(0)
  //   }
  // })
  // useEffect(() => {
  //   if (valuing === 4) {
  //     setValue(1)
  //   }
  // })

  return (
    <div className=''>
      <Box sx={{ paddingX: '10px'
        }}>
        <Tabs
          value={tabs} onChange={handleChange} aria-label="basic tabs example"
        >
          <Tab label={<Minimize2 />} {...a11yProps(0)} />
          <Tab label={<Maximize2 />} {...a11yProps(1)} />
        </Tabs>
        {/* {valuing<2 &&
        } */}
        {/* {valuing>=2 &&
        <Tabs
        value={valuing} onChange={handleChange} aria-label="basic tabs example"
        >
          <Tab label="빌리기" {...a11yProps(0)} />
          <Tab label="빌려주기" {...a11yProps(1)} />
        </Tabs>
        } */}
      </Box>
    </div>
  );
}