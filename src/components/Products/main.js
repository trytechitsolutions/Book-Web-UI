import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './styles.css';
import { Button, Container, Grid, Paper } from '@mui/material';
import ErrorDialog from '../common/Dialogue';
import { useDispatch } from 'react-redux';
import { apiRequest } from '../../services/api';
import * as securedLocalStorage from '../../services/secureLocalStorage';
import GeneralInfo from './GeneralInfo';
import Price from './Price';
import TagsLabels from './TagsLabels';
import DeliveryOptions from './DeliveryOption';
import ProductSetting from './ProductSetting';
import ProductTypeModal from './ProductTypeModal';
import GenericTable from '../common/GenericDataTable';
import SnackbarView from '../common/SnackBar';
import Loader from '../common/Loader';
import { mapValuesToForm, onChangeValueBind } from '../ReusableComponents/CommonFunctions';


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
  const ChildRef = useRef();
  const [productType, setProductType] = useState(null);
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const serverUrl = securedLocalStorage.baseUrl;
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([])
  const [selectedId, setSelectedId] = React.useState(null)

  
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarData, setSnackBarData] = React.useState();
  const [showLoader, setShowLoader] = React.useState(false);

const columns = [

  { id: 'p.id', label: 'ID' },
  { id: 'product_type', label: 'product_type' },
  { id: 'product_name', label: 'product_name' },
  { id: 'regular_price', label: 'regular_price' },

];

const tabsConfig = {
  digital: [
    { label: 'General Info', component: <GeneralInfo onUpdate={(data) => updateFormData('generalInfo', data)} /> },
    { label: 'Price', component: <Price onUpdate={(data) => updateFormData('productPrice', data)} /> },
    { label: 'Tags & Label', component: <TagsLabels onUpdate={(data) => updateFormData('productTagsAndLabels', data)} /> },
    { label: 'productSetting', component: <ProductSetting onUpdate={(data) => updateFormData('productSetting', data)} /> },
 
    // Add other tabs specific to digital products
  ],
  physical: [
    { label: 'General Info', component: <GeneralInfo onUpdate={(data) => updateFormData('generalInfo', data)} /> },
    { label: 'Price', component: <Price onUpdate={(data) => updateFormData('productPrice', data)} /> },
    { label: 'Tags & Label', component: <TagsLabels onUpdate={(data) => updateFormData('productTagsAndLabels', data)} /> },
    { label: 'Delivery Option', component: <DeliveryOptions onUpdate={(data) => updateFormData('productDeliveryOptions', data)} /> },
    { label: 'productSetting', component: <ProductSetting onUpdate={(data) => updateFormData('productSetting', data)} /> },
    // Add other tabs specific to physical products
  ],
  // Add more product types if needed
};

const selectedTabs = tabsConfig[productType] || [];


  const getProduct = async () => {
    setShowLoader(true);
    const resp = await apiRequest(null, serverUrl + "product", 'get');
    setShowLoader(false);
    if (resp?.data?.data) {
      setData(resp.data.data);
      if (formData.fieldsArray) {
        formData.fieldsArray?.map((f) => {
          f.value = ''
          return f;
        })
        setFormData(formData)
      }
    }
  }
  const resetForm = () => {
    setSelectedId(null);
    setShowForm(false);
    formData.fieldsArray?.map((f) => {
      f.value = ''
      return f;
    })
    setFormData(formData);
  };
  useEffect(() => {
    // Fetch data from the Redux store once when the component mounts
    // setShowLoader(true);
    async function fetchData() {
      const resp = await apiRequest(null, serverUrl + "product", 'get');
      setShowLoader(false);
      if (resp?.data?.data) {
        setData(resp.data.data);
      }
    }
    fetchData()
  }, [showForm]);

      const isFormValid=()=>{
        const errors = validateErrors();
        if(errors.generalInfo?.length > 0){
          return false;
        } else if(errors.updateFormData?.length > 0){
          return false;
        }else if(errors.productTagsAndLabels?.length > 0){
          return false;
        }else if(errors.productSetting?.length > 0){
          return false;
        }
        return true
      }
      const updateFormData = (section, data, isValid) => {
        setFormData((prevData) => ({
          ...prevData,
          [section]: data,
        }));
      };
    
      const validateErrors = () => {
        const errors = {};
    
        if (formData.generalInfo) {
          errors.generalInfo = [];
          Object.keys(formData.generalInfo).forEach((f) => {
            const value = formData.generalInfo[f];
            if (typeof value === 'string' && value.trim() === '') {
              errors.generalInfo.push(`${f} is required`);
            }
          });
        }
    
        if (formData.productPrice) {
          errors.productPrice = [];
          Object.keys(formData.productPrice).forEach((f) => {
            const value = formData.productPrice[f];
            if (typeof value === 'string' && value.trim() === '') {
              errors.productPrice.push(`${f} is required`);
            }
          });
        }
    
        if (formData.productTagsAndLabels) {
          errors.productTagsAndLabels = [];
          Object.keys(formData.productTagsAndLabels).forEach((f) => {
            const value = formData.productTagsAndLabels[f];
            if (!value || (typeof value === 'string' && value.trim() === '')) {
              errors.productTagsAndLabels.push(`${f} is required`);
            }
          });
        }
        if (formData.productDeliveryOptions) {
          errors.productDeliveryOptions = [];
          Object.keys(formData.productDeliveryOptions).forEach((f) => {
            const value = formData.productDeliveryOptions[f];
            if (!value || (typeof value === 'string' && value.trim() === '')) {
              errors.productDeliveryOptions.push(`${f} is required`);
            }
          });
        }
        if (formData.productSetting) {
          errors.productSetting = [];
          Object.keys(formData.productSetting).forEach((f) => {
            const value = formData.productSetting[f];
            if (!value || (typeof value === 'string' && value.trim() === '')) {
              errors.productSetting.push(`${f} is required`);
            }
          });
        }
    
        return errors;
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
    
      const onSelectProductType = (type) => {
        console.log(type, '***type****');
        setProductType(type);
      };
      const closeSnakBar = () => {
        setOpenSnackBar(false)
      }

      
const handleSubmit = async () =>{
  const errors = validateErrors();
  console.log(errors, 'errors****');
  if (isFormValid()) {
    handleDialogClose();
          // Update local state (if needed)
          setFormData({ ...formData });
    try {
      // Prepare payload
      // formData.productInfo = {product_type: productType}
      const payload = {
        generalInfo: formData.generalInfo,
        productPrice: formData.productPrice,
        productTagsAndLabels: formData.productTagsAndLabels,
        productDeliveryOptions: formData.productDeliveryOptions,
        productSetting: formData.productSetting,
        productInfo: {product_type: productType} 
      };
      // Make API request
      // setShowLoader(true);
      const resp = await apiRequest(payload, serverUrl + "product ", 'post');
      setShowLoader(false);
      if(resp?.data?.data){
        setOpenSnackBar(true);
          const data = {
            type: "success",
            message: "product added  sucessfully!....",
            open: true
          }
          await getProduct();
      resetForm();
      setSnackBarData(data);
      setShowForm(false);
      }else{
        setOpenSnackBar(true);
      const data = {
        type: "error",
        message: 'product added failed.',
        open: true
      }
      setSnackBarData(data);
      setShowForm(false);
    }


      // Dispatch the ProductRequest action (if needed)
      // dispatch(ProductRequest(formData));

      console.log('Form submitted!', formData);
    } catch (error) {
      // Handle API request error
      console.error('API request failed:', error);
    }
  } else {
    setValidationErrors(errors);
    handleDialogOpen();
    console.error('Form is not valid. Please check the sections.');
  }
}
function onChange(data) {
  onChangeValueBind(formData, data);
}
const onEdit = (product_id) => {
  setSelectedId(product_id);
  const selectedRecord = data.find((d) => d.product_id === product_id);
  const updateForm = mapValuesToForm(selectedRecord, formData);
  setFormData((prevFormData) => {
    return updateForm;
  });
  setShowForm(true);
}
const onDelete = async (id) => {
  setShowLoader(true)
  const resp = await apiRequest(null, serverUrl + "product/" + id, 'delete');
  setShowLoader(false);
  if (resp?.data?.data) {
    setOpenSnackBar(true);
    const data = {
      type: "success",
      message: "product deleted  sucessfully!....",
      open: true
    }
    resetForm();
    setSnackBarData(data);
    setShowForm(false); // Hide the form after submission

  } else {
    setOpenSnackBar(true);
    const data = {
      type: "error",
      message: 'product deleted failed.',
      open: true
    }
    setSnackBarData(data);
  }
}
const handleAddNewItem = () => {
  setShowForm(true);
};
 
  return (
    <div >
    <div>
       <Typography variant="h4" align="center" style={{ marginTop: '20px' }} gutterBottom>
       Product Data
        </Typography>
        {!showForm && (
          <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: '20px', marginBottom: '2rem', float: 'right' }}>
            <Button variant="contained" onClick={handleAddNewItem}>
              Add New Product
            </Button>
          </Grid>
        )}
        {showForm && (
           <div >
      {!productType && <ProductTypeModal isOpen={true} onClose={null} onSelectProductType={onSelectProductType} />}
      {productType && (
       
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
              {selectedTabs.map((tab, index) => (
                <Tab key={index} className='tab' label={tab.label} {...a11yProps(index)} />
              ))}
            </Tabs>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', padding: 3 }}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                {selectedTabs.map((tab, index) => (
                  <TabPanel key={index} value={value} index={index}>
                    {tab.component}
                  </TabPanel>
                ))}
              </Paper>
            </Box>
          </div>
          <div style={{ padding: 3, textAlign: 'end' }}>
            <Button variant="contained" ref={ChildRef} onChange={onChange} onClick={handleSubmit}>
              Submit
            </Button>
          </div>
          <div>
            <ErrorDialog isOpen={dialogOpen} onClose={handleDialogClose} errors={validationErrors} />
          </div>
        </div>
        
      )}
      </div>
       )}
       </div>
      {!showForm && data?.length > 0 && (
        <div  className='table'>
        <GenericTable  data={data} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </div>      )}
      {(data?.length === 0) && !showForm && (
        <Typography variant="h6" align="center" style={{ marginTop: '10rem' }}>
          No data available. Please add new Product.
        </Typography>
      )}
        {openSnackBar && <SnackbarView {...snackBarData} onClose={closeSnakBar} />}
      {showLoader &&
        <Loader />
      }
    </div>
  );
};

export default Products;