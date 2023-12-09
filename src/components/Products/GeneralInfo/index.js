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
    productName: '',
    brand: '',
    unit: '',
    weight: '',
    minPurchaseQty: '',
    barcode: '',
    productCategory: [],
    productSummery: '',
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
              name="productName"
              placeholder="write product name"
              variant="outlined"
              value={formData.productName}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
          <InputLabel >Brand</InputLabel>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="brand">Brand</InputLabel>
              <Select
                label="Brand"
                name="brand"
                value={formData.brand}
             onChange={handleInputChange}
                required
              >
                <MenuItem value="brand">brand</MenuItem>
                <MenuItem value="sub-brand">Sub brand</MenuItem>
                {/* Add more role options here */}
              </Select>
            </FormControl>
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
              name="minPurchaseQty"
              placeholder="1"
              variant="outlined"
              value={formData.minPurQty}
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
           <CheckboxTree
            nodes={nodes}
            checked={checked}
            expanded={expanded}
            onCheck={handleCheck}
            onExpand={handleExpand}
            onChange={handleCategoryChange}
            />
            </Grid>
        <Grid item xs={6} sm={6}>
        <InputLabel >Product Summery</InputLabel>
            <TextField
              fullWidth
              label="Product Summery"
              name="productSummery"
               variant="outlined"
              value={formData.productSummery}
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