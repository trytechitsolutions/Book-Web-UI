import { Checkbox, Container, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, Switch, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePicker } from '@mui/x-date-pickers';

const ProductSetting = ({ inputData,onUpdate  }) => {
  const [cashOnDeliveryEnabled, setCashOnDeliveryEnabled] = useState(false);
  const [formData, setFormData] = useState({
    stock_quantity_warning: inputData?.stock_quantity_warning || '',
    warranty_period: inputData?.warranty_period || '',
    guarantee_period: inputData?.guarantee_period || '',
    is_refundable: inputData?.is_refundable || false,
  });;
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


  const handleOptionChange = (option) => () => {
    // Update form data
    setFormData((prevFormData) => ({
      ...prevFormData,
      [option]: !prevFormData[option],
    }));
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
          <InputLabel>stock quantity</InputLabel>
            <TextField
              fullWidth
              name="stock_quantity_warning"
              placeholder="Enter stock quantity warning"
              //like few (some number) products left
              variant="outlined"
              value={formData.stock_quantity_warning}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
          <InputLabel>Warranty Period</InputLabel>
            <TextField
              fullWidth
              name="warranty_period"
              variant="outlined"
              format="MM/dd/yyyy"
              placeholder="MM/dd/yyyy"
              value={formData.warranty_period}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
          <InputLabel>Guarantee Period</InputLabel>
            <TextField
              fullWidth
              name="guarantee_period"
              variant="outlined"
              format="MM/dd/yyyy"
              placeholder="MM/dd/yyyy"
              value={formData.guarantee_period}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
          <FormControl component="fieldset">
          <FormGroup>              
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.is_refundable}
                      onChange={handleOptionChange('is_refundable')}
                    />
                  }
                  label="is_refundable"
                />
                </FormGroup>
                </FormControl>
         </Grid>
          {/* <Grid item xs={12} sm={12}>
            <FormControlLabel
              required
              control={
                <Switch
                  checked={formData.is_refundable}
                  onChange={handleSwitchChange}
                  inputProps={{ 'aria-label': 'Is Refundable' }}
                />
              }
              label="Refundable"
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={12}>
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
          </Grid> */}
        </Grid>
      </form>
    </Container>
  );
};

export default ProductSetting;
