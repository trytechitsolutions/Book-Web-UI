import { Container, FormControlLabel, Grid, Switch, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePicker } from '@mui/x-date-pickers';

const ProductSetting = ({ onUpdate  }) => {
  const [cashOnDeliveryEnabled, setCashOnDeliveryEnabled] = useState(false);
  const [formData, setFormData] = useState({
    stockQuantityWarning: '',
    warrantyPeriod: '',
    guaranteePeriod: '',
    isRefundable: false,
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

  const handleSwitchChange = () => {
    setFormData({
      ...formData,
      isRefundable: !formData.isRefundable,
    });
  };

  const handleCashOnDeliveryToggle = () => {
    setCashOnDeliveryEnabled(!cashOnDeliveryEnabled);
  };

  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Product Setting
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Stock Quantity Warning"
              name="stockQuantityWarning"
              placeholder="Enter stock quantity warning"
              //like few (some number) products left
              variant="outlined"
              value={formData.stockQuantityWarning}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Warranty Period"
              name="warrantyPeriod"
              variant="outlined"
              format="MM/dd/yyyy"
              placeholder="MM/dd/yyyy"
              value={formData.warrantyPeriod}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Guarantee period"
              name="guaranteePeriod"
              variant="outlined"
              format="MM/dd/yyyy"
              placeholder="MM/dd/yyyy"
              value={formData.guaranteePeriod}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              required
              control={
                <Switch
                  checked={formData.isRefundable}
                  onChange={handleSwitchChange}
                  inputProps={{ 'aria-label': 'Is Refundable' }}
                />
              }
              label="Refundable"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={cashOnDeliveryEnabled}
                  onChange={handleCashOnDeliveryToggle}
                  color="primary"
                />
              }
              label="Cash on Delivery"
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProductSetting;
