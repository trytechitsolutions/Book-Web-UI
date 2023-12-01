import { Container, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'

const GeneralInfo = () => {
  const [isRefundable, setIsRefundable] = useState(false);

  const handleSwitchChange = () => {
      setIsRefundable(!isRefundable);
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
              name="ProductName"
              placeholder="write product name"
              variant="outlined"
              value=''
              onChange={null}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="brand">Brand</InputLabel>
              <Select
                label="Brand"
                name="brand"
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
              value=''
              onChange={null}
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
              value=''
              onChange={null}
              required
            />
        </Grid>
        <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Minimum Purchase Qty"
              name="min-pur-qty"
              placeholder="1"
              variant="outlined"
              value=''
              onChange={null}
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
              value=''
              onChange={null}
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
              value=''
              onChange={null}
              required
            />
        </Grid> 
        <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Product Summery"
              name="ProductSummery"
              placeholder="Write product summery"
              variant="outlined"
              value=''
              onChange={null}
              required
            />
          </Grid>
        <Grid item xs={12} sm={12 }>
            <TextField
              fullWidth
              label="Description"
              name="Description"
              variant="outlined"
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
          <Grid item xs={6} sm={6}>
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
          </form>
          </Container>
  )
}

export default GeneralInfo ;