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
import { Button } from '@mui/material';

const TabPanel = (props) => {
  const { children, index,value, ...other } = props;

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



const Products = () => {
    const [value, setValue] = useState(0);
    const [formData, setFormData] = useState({});
    const [validationStatus, setValidationStatus] = useState({});

    const updateFormData = (section, data, isValid) => {
      setFormData((prevData) => ({
        ...prevData,
        [section]: data,
      }));
  
      setValidationStatus((prevStatus) => ({
        ...prevStatus,
        [section]: isValid,
      }));
    };
    // const isFormValid = Object.values(validationStatus).every((isValid) => isValid);
    const isFormValid = (data) => {
      // Implement your form validation logic here
      const errors = {};
  
      // General Info Section Validation
      if (!data.generalInfo) {
        errors.generalInfo = {};
        if (!data.generalInfo.productName || !data.generalInfo.productName.trim()) {
          errors.generalInfo.productName = 'Product Name is required';
        }
        // Add more validation rules for the General Info section as needed
      }
  
      // Price Section Validation
      if (!data.price) {
        errors.price = {};
        // Add validation rules for the Price section as needed
      }
  
      // Images Section Validation
      if (!data.images) {
        errors.images = {};
        // Add validation rules for the Images section as needed
      }
  
      // Add more sections as needed
      return Object.keys(errors).length === 0;
    };
    
    const handleSubmit = () => {
      const isValid = isFormValid(formData);

      if (isValid) {
        // Perform form submission logic here
        console.log('Form submitted!', formData);
      } else {
        // Handle the case where the form is not valid
        console.error('Form is not valid. Please check the sections.');
      }
    };
  
     // ... (imports)

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
          {/* <GeneralInfo /> */}
             <GeneralInfo onUpdate={(data) => updateFormData('generalInfo', data)} />
          </TabPanel>
          <TabPanel value={value} index={1}>
           {/* <Price/> */}
            <Price onUpdate={(data) => updateFormData('price', data)} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/* <Images/> */}
            <Images onUpdate={(data) => updateFormData('images', data)} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            Inventory
          </TabPanel>
          <TabPanel value={value} index={4}>
            {/* <TagsLabels/> */}
            <TagsLabels onUpdate={(data) => updateFormData('tagsLabels', data)} />
          </TabPanel>
          <TabPanel value={value} index={5}>
            Item Six
          </TabPanel>
          <TabPanel value={value} index={6}>
             {/* <DeliveryOptions/> */}
             <DeliveryOptions onUpdate={(data) => updateFormData('deliveryOptions', data)} />
          </TabPanel>
          <TabPanel value={value} index={7}>
          Product Meta
          </TabPanel>
          <TabPanel value={value} index={8}>
           {/* <ProductSetting/> */}
           <ProductSetting onUpdate={(data) => updateFormData('productSetting', data)} />
          </TabPanel>  
        </Box>
        <Box sx={{ padding: 3 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
       {/* Display validation errors */}
       {Object.keys(validationStatus).map((section, index) => (
          !validationStatus[section] && (
            <Typography key={index} color="error">
              {`Validation error in ${section} section`}
            </Typography>
          )
        ))}
      </Box>

    );
  };
  
  export default Products;