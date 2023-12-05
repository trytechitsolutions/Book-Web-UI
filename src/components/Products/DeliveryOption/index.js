import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    // Add your styles here
  },
}));

const DeliveryOptions = ({ onUpdate }) => {
  const classes = useStyles();
  const [selectedOptions, setSelectedOptions] = useState([]);


  const handleOptionChange = (option) => () => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
  };


  // Update the form data in the parent component
  const updateParentFormData = () => {
    const formData = {
      selectedOptions,
    };
    onUpdate(formData);
  };

  // Call the updateParentFormData whenever selectedOptions or additionalOptions change
 useEffect(() => {
    updateParentFormData();
  }, [selectedOptions]);

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
    </Grid>
  );
};

export default DeliveryOptions;
