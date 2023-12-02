import { Container, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

const GeneralInfo = ({ onUpdate }) => {
  const [isRefundable, setIsRefundable] = useState(false);


  const [formData, setFormData] = useState({
    productName: '',
    brand: '',
    unit: '',
    weight: '',
    minPurchaseQty: '',
    tags: '',
    barcode: '',
    productCategory: '',
    productSummary: '',
    description: '',
  });


  // useEffect(()=>{
  //   onUpdate(formData);
  // }, [formData, onUpdate])

  const handleSwitchChange = () => {
      setIsRefundable(!isRefundable);
    };
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  return (
    <Container >
    <Typography variant="h5" align="center" gutterBottom>
      General Info
    </Typography>
    <form>
           <Grid container spacing={2}>  
           <Grid item xs={6} sm={6}>
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
            <TextField
              fullWidth
              label="Unit"
              name="unit"
              placeholder="unit (e.g KG etc )"
              variant="outlined"
              value={formData.unit}
             onChange={handleInputChange}
              required
            />
        </Grid> 
        <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Weight"
              name="weight"
              placeholder="0.00"
              variant="outlined"
              value={formData.weight}
             onChange={handleInputChange}
              required
            />
        </Grid>
        <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Minimum Purchase Qty"
              name="minPurQty"
              placeholder="1"
              variant="outlined"
              value={formData.minPurQty}
             onChange={handleInputChange}
              required
            />
        </Grid>    
        <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Tags"
              name="tags"
              placeholder="Type and hit enter to add a tag"
              variant="outlined"
              value={formData.tags}
             onChange={handleInputChange}
              required
            />
        </Grid>
        <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Barcode"
              name="barcode"
              placeholder="Barcode"
              variant="outlined"
              value={formData.barcode}
             onChange={handleInputChange}
              required
            />
        </Grid> 
        <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Product Category"
              name="productCategory"
              placeholder="Product Category"
              variant="outlined"
              value={formData.productCategory}
             onChange={handleInputChange}
              required
            />
        </Grid>
        <Grid item xs={12} sm={12}>
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