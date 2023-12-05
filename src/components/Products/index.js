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
import ErrorDialog from '../common/Dialogue';

const TabPanel = (props) => {
  const { children, index, value, ...other } = props;

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
  const [validationErrors, setValidationErrors] = useState({});
  const [isDialogOpen, setDialogOpen] = useState(false);

  const updateFormData = (section, data, isValid) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: data,
    }));
  };
  const isFormValid = () => {
    const errors = {};
    console.log(formData)
    if (formData.generalInfo) {
      errors.generalInfo = [];
      console.log(formData.generalInfo.productName)
      Object.keys(formData.generalInfo).forEach((f) => {
        if (!formData.generalInfo[f] || formData.generalInfo[f].trim() === '') {
          errors.generalInfo.push(`${f} is required`);

        }
      })
    }

    if (!formData.price) {
      errors.price = ['Price is required'];
    }

    // Images Section Validation
    if (!formData.images) {
      errors.images = ['Images required'];
    }
    console.log(errors, '***errors valid***');

    return errors;
  };

  const handleSubmit = () => {
    const errors = isFormValid();

    if (Object.keys(errors).length === 0) {
      console.log('Form submitted!', formData);
    } else {
      setValidationErrors(errors);
      handleDialogOpen();
      console.error('Form is not valid. Please check the sections.');
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider', marginLeft: 50 }}
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
      </div>
      <div style={{ padding: 3, textAlign: 'end' }}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <div>
        <ErrorDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          errors={validationErrors}
        />
      </div>
    </div>

  );
};

export default Products;