import { Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react'

const Price = () => {
  return (
    <Container >
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
              value=""
              onChange={null} 
              required
            />
         </Grid>  
           <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Regular Price"
              name="regularprice"
              variant="outlined"
              value=""
              onChange={null} 
              required
            />
         </Grid>
         <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Sale Price"
              name="salePrice"
              variant="outlined"
              value=""
              onChange={null} 
              required
            />
         </Grid>
          
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="Is Taxable">Is Taxable</InputLabel>
              <Select
                label="Is Taxable"
                name="tax"
                required
              >
                <MenuItem value="Taxable">Taxable</MenuItem>
                <MenuItem value="Non-Taxable">Non-Taxable</MenuItem>
                {/* Add more role options here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="Tax">Tax Class</InputLabel>
              <Select
                label="Tax Class"
                name="taxClass"
                required
              >
                <MenuItem value="taxClass">tax-1</MenuItem>
                <MenuItem value="taxClass">Tax-2</MenuItem>
                {/* Add more role options here */}
              </Select>
            </FormControl>
          </Grid>
          </Grid>
          </form>
          </Container>
  )
}

export default Price ;