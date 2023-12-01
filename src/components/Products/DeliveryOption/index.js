import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  // Your styles here
}));

const DeliveryOptions = () => {
  const classes = useStyles();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [additionalOptions, setAdditionalOptions] = useState({
    giftWrap: false,
    tracking: false,
  });

  const handleOptionChange = (option) => () => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
  };

  const handleCheckboxChange = (name) => (event) => {
    setAdditionalOptions({ ...additionalOptions, [name]: event.target.checked });
  };

  // const handlePlaceOrder = () => {
  //   // Add logic to handle placing the order with the selected delivery options and additional options
  //   console.log('Order placed with delivery options:', selectedOptions);
  //   console.log('Additional options:', additionalOptions);
  // };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Select Delivery Options:</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Delivery Options</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions.includes('express')}
                  onChange={handleOptionChange('express')}
                />
              }
              label="Express Delivery"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions.includes('standard')}
                  onChange={handleOptionChange('standard')}
                />
              }
              label="Standard Delivery"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions.includes('Same-Day')}
                  onChange={handleOptionChange('Same-Day')}
                />
              }
              label="Same Day Delivery"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions.includes('scheduled')}
                  onChange={handleOptionChange('scheduled')}
                />
              }
              label="Scheduled Delivery"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions.includes('weekend')}
                  onChange={handleOptionChange('weekend')}
                />
              }
              label="Weekend  Delivery"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions.includes('evening')}
                  onChange={handleOptionChange('evening')}
                />
              }
              label="Evening Delivery"
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={selectedOptions.length === 0}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default DeliveryOptions;
