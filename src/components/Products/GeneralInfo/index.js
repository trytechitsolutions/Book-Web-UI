import { Container, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './index.css';


const nodes = [
  {
    value: 'electronics',
    label: 'Electronics',
    children: [
      { value: 'laptops', label: 'Laptops' },
      { value: 'phones', label: 'Phones' },
      {
        value: 'books',
        label: 'Books',
        children: [
          { value: 'entertainment', label: 'Entertainment' },
          { value: 'educational', label: 'Educational' },
        ],
      },,
      { value: 'dress', label: 'Dress' },
    ],
  },
];
const GeneralInfo = ({ onUpdate }) => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const handleCheck = (newChecked) => {
    setChecked(newChecked);
  };

  const handleExpand = (newExpanded) => {
    setExpanded(newExpanded);
  };


  const [formData, setFormData] = useState({
    product_name: '',
    brand_id: '',
    unit: '',
    weight: '',
    min_purchase_qty: '',
    barcode: '',
    product_category: '',
    product_summary: '',
    description: '',
  });


  useEffect(()=>{
    onUpdate(formData);
  }, [formData, onUpdate])

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
    const handleCategoryChange = (checkedCategories) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        productCategory: checkedCategories,
      }));
    }
  return (
    <Container >
    <Typography variant="h5" align="center" gutterBottom>
      General Info
    </Typography>
    <form className='container'>
           <Grid container spacing={2} >  
           <Grid item xs={12} sm={12}>
           <InputLabel >Product Name</InputLabel>
            <TextField
              fullWidth
              label="Product Name"
              name="product_name"
              placeholder="write product name"
              variant="outlined"
              value={formData.product_name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
          <InputLabel >Brand </InputLabel>
            <TextField
              fullWidth
              label="Brand"
              name="brand_id"
              placeholder="unit (e.g KG etc )"
              variant="outlined"
              value={formData.brand_id}
             onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
          <InputLabel >Unit </InputLabel>
            <TextField
              fullWidth
              label="Unit"
              name="unit"
              placeholder="unit (e.g KG etc )"
              variant="outlined"
              value={formData.unit}
             onChange={handleInputChange}
            />
        </Grid> 
        <Grid item xs={6} sm={6}>
        <InputLabel >Weight</InputLabel>
            <TextField
              fullWidth
              label="Weight"
              name="weight"
              placeholder="0.00"
              variant="outlined"
              value={formData.weight}
             onChange={handleInputChange}
            />
        </Grid>
        <Grid item xs={6} sm={6}>
        <InputLabel >Minimum Purchase Qty</InputLabel>
            <TextField
              fullWidth
              label="Minimum Purchase Qty"
              name="min_purchase_qty"
              placeholder="1"
              variant="outlined"
              value={formData.min_purchase_qty}
             onChange={handleInputChange}
              required
            />
        </Grid>    
        <Grid item xs={6} sm={6}>
        <InputLabel >Barcode</InputLabel>
            <TextField
              fullWidth
              label="Barcode"
              name="barcode"
              placeholder="Barcode"
              variant="outlined"
              value={formData.barcode}
             onChange={handleInputChange} 
            />
        </Grid> 
        <Grid item xs={6} sm={6}>
        <InputLabel >Category</InputLabel>
            <TextField
              fullWidth
              label="productCategory"
              name="product_category"
              placeholder="productCategory"
              variant="outlined"
              value={formData.product_category}
             onChange={handleInputChange} 
            />
        </Grid> 
        <Grid item xs={6} sm={6}>
        <InputLabel >Product Summary</InputLabel>
            <TextField
              fullWidth
              label="Product Summary"
              name="product_summary"
               variant="outlined"
              value={formData.product_summary}
              onChange={handleInputChange}
              required
            />
          </Grid>
        <Grid item xs={12} sm={12 }>
        <InputLabel >Description</InputLabel>
            <TextField
              fullWidth
              label="Description"
              name="description"
              variant="outlined"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              required
            />
          </Grid>
          {/* <Grid item xs={12} sm={12}>
          <FormControl fullWidth variant="outlined">
            <TextField
              label="Description"
              name="Description"
              multiline
              rows={4}
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Grid> */}
          </Grid>
          </form>
          </Container>
  )
}

export default GeneralInfo ;