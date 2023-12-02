import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './styles.css';
import GeneralInfo from './GeneralInfo';
import Price from './Price';
import Images from './Images';
import TagsLabels from './TagsLabels';
import DeliveryOptions from './DeliveryOption';
import ProductSetting from './ProductSetting';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
};

 // ... (imports)

const Products = () => {
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };  
    return (
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' , marginLeft: 50 }}
        >
          <Tab className='tab' label="General Info" {...a11yProps(0)} />
          <Tab className='tab' label="Price" {...a11yProps(1)} />
          <Tab className='tab' label="Images" {...a11yProps(2)} />
          <Tab className='tab' label="Inventory" {...a11yProps(3)} />
          <Tab className='tab' label="Tags & Label" {...a11yProps(4)} />
          <Tab className='tab' label="Attributes" {...a11yProps(5)} />
          <Tab className='tab' label="Delivery Option" {...a11yProps(6)} />
          <Tab className='tab' label="Product Meta" {...a11yProps(7)} />
          <Tab className='tab' label="Product Setting" {...a11yProps(8)} />

        </Tabs>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', padding: 3 }}>
          <TabPanel value={value} index={0}>
          <GeneralInfo />
          {/* <GeneralInfo onUpdate={data => updateFormData('generalInfo', data)} /> */}
          </TabPanel>
          <TabPanel value={value} index={1}>
           <Price/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Images/>
          </TabPanel>
          <TabPanel value={value} index={3}>
            Inventory
          </TabPanel>
          <TabPanel value={value} index={4}>
            <TagsLabels/>
          </TabPanel>
          <TabPanel value={value} index={5}>
            Item Six
          </TabPanel>
          <TabPanel value={value} index={6}>
             <DeliveryOptions/>
          </TabPanel>
          <TabPanel value={value} index={7}>
          Product Meta
          </TabPanel>
          <TabPanel value={value} index={8}>
           <ProductSetting/>
          </TabPanel>  
        </Box>

      </Box>

    );
  };
  
  export default Products;