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
    baseCost: '',
    regularPrice: '',
    salePrice: '',
    tax: '',
    taxClass: '',
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
            <TextField
              fullWidth
              label="Base Cost"
              name="baseCost"
              variant="outlined"
              value={formData.baseCost}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Regular Price"
              name="regularPrice"
              variant="outlined"
              value={formData.regularPrice}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Sale Price"
              name="salePrice"
              variant="outlined"
              value={formData.salePrice}
              onChange={handleInputChange}
              required
            />
          </Grid>        
          <Grid item xs={12} sm={12}>
          <Link href="https://your.tax.info" target="_blank" rel="noopener noreferrer">
            <TextField
              fullWidth
              label="Tax"
              name="tax"
              variant="outlined"
              value={formData.tax}
              onChange={handleInputChange}
              required
              helperText="https://your.tax.info"
              />
              </Link>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="Is Taxable">Is Taxable</InputLabel>
              <Select
                label="Is Taxable"
                name="tax"
                value={formData.tax}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="Taxable">Taxable</MenuItem>
                <MenuItem value="Non-Taxable">Non-Taxable</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Price;
