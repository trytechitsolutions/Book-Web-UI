import { Container, FormControlLabel, Grid, Switch, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'


const ProductSetting = () => {
    const [isRefundable, setIsRefundable] = useState(false);
    const [cashOnDeliveryEnabled, setCashOnDeliveryEnabled] = useState(false);

    const handleSwitchChange = () => {
        setIsRefundable(!isRefundable);
      };
      const handleCashOnDeliveryToggle = () => {
        setCashOnDeliveryEnabled(!cashOnDeliveryEnabled);
      };
    
  return (
    <Container >
    <Typography variant="h5" align="center" gutterBottom>
      Product Setting
    </Typography>
    <form>
    <Grid container spacing={2}>
    <Grid item xs={12} sm={12}>
    <TextField
      fullWidth
      label="Stock Quantity Warning"
      name="StockQuantityWarning"
      placeholder="Enter stock quantity warning"
      variant="outlined"
      value={null}
      onChange={null}
    />
  </Grid>
 <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label="Warranty Period"
            name="WarrantyPeriod"
            inputVariant="outlined"
            format="MM/dd/yyyy"
            placeholder="MM/dd/yyyy"
            value={null}
            onChange={null}
          />
      </Grid>
      <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label="Guarantee period"
            name="GuaranteePeriod"
            inputVariant="outlined"
            format="MM/dd/yyyy"
            placeholder="MM/dd/yyyy"
            value={null}
            onChange={null}
          />
      </Grid>
      <Grid item xs={12} sm={12}>
    <FormControlLabel
     required
     control={
       <Switch
         checked={isRefundable}
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
  )
}

export default ProductSetting


