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

const Price = ({ onUpdate }) => {
  const [formData, setFormData] = useState({
    base_cost_price: '',
    regular_price: '',
    sale_price: '',
    tax_price: '',
    tax_class: '',
  });
  useEffect(()=>{
    onUpdate(formData);
  }, [formData, onUpdate])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

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
              label="Base Cost"
              name="base_cost_price"
              variant="outlined"
              value={formData.base_cost_price}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
          <InputLabel >Regular Price</InputLabel>
            <TextField
              fullWidth
              label="Regular Price"
              name="regular_price"
              variant="outlined"
              value={formData.regular_price}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
          <InputLabel >Sale Price</InputLabel>
            <TextField
              fullWidth
              label="Sale Price"
              name="sale_price"
              variant="outlined"
              value={formData.sale_price}
              onChange={handleInputChange}
              required
            />
          </Grid>        
          <Grid item xs={12} sm={12}>
          <InputLabel >Tax</InputLabel>
          <Link href="https://your.tax.info" target="_blank" rel="noopener noreferrer">
            <TextField
              fullWidth
              label="Tax"
              name="tax_price"
              variant="outlined"
              value={formData.tax_price}
              onChange={handleInputChange}
              required
              helperText="https://your.tax.info"
              />
              </Link>
          </Grid>
          <Grid item xs={6}>
          <InputLabel >Is Taxable</InputLabel>
            <TextField
              fullWidth
              label="Sale Price"
              name="tax_class"
              variant="outlined"
              value={formData.tax_class}
              onChange={handleInputChange}
              required
            />
          </Grid> 
        </Grid>
      </form>
    </Container>
  );
};

export default Price;
