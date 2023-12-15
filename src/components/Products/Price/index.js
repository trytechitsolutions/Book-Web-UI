import React, { useEffect, useState } from 'react';
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const Price = ({ inputData, onUpdate }) => {
  const [formData, setFormData] = useState({
    base_cost_price: inputData?.base_cost_price || '',
    regular_price: inputData?.regular_price || '',
    sale_price: inputData?.sale_price || '',
    tax_price: inputData?.tax_price || '',
    tax_class: inputData?.tax_class || '',
  });
  const handleFormChange = (field, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value,
    }));

    onUpdate({ ...formData, [field]: value });
  };

  useEffect(()=>{
    onUpdate(formData);
  }, [formData, onUpdate])

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };
  

  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Price Manage
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
          <InputLabel >Base Cost</InputLabel>
            <TextField
              fullWidth
              name="base_cost_price"
              variant="outlined"
              value={formData.base_cost_price}
              onChange={(e) => handleFormChange('base_cost_price', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
          <InputLabel >Regular Price</InputLabel>
            <TextField
              fullWidth
              name="regular_price"
              variant="outlined"
              value={formData.regular_price}
              onChange={(e) => handleFormChange('regular_price', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
          <InputLabel >Sale Price</InputLabel>
            <TextField
              fullWidth
              name="sale_price"
              variant="outlined"
              value={formData.sale_price}
              onChange={(e) => handleFormChange('sale_price' , e.target.value)}
              required
            />
          </Grid>        
          <Grid item xs={12} sm={12}>
          <InputLabel >Tax</InputLabel>
          <Link href="https://your.tax.info" target="_blank" rel="noopener noreferrer">
            <TextField
              fullWidth
              name="tax_price"
              variant="outlined"
              value={formData.tax_price}
              onChange={(e) => handleFormChange('tax_price', e.target.value)}
              required
              helperText="https://your.tax.info"
              />
              </Link>
          </Grid>
          <Grid item xs={6}>
          <InputLabel >Is Taxable</InputLabel>
            <TextField
              fullWidth
              name="tax_class"
              variant="outlined"
              value={formData.tax_class}
              onChange={(e) => handleFormChange('tax_class', e.target.value)}
              required
            />
          </Grid> 
        </Grid>
      </form>
    </Container>
  );
};

export default Price;
