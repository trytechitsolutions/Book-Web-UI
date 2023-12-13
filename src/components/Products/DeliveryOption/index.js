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
  const [formData, setFormData] = useState({
    express_delivery: false,
    standard_delivery: false,
    same_day_delivery: false,
    scheduled_delivery: false,
    weekend_delivery: false,
    evening_delivery:false,
  }); 
  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleOptionChange = (option) => () => {
    // Update form data
    setFormData((prevFormData) => ({
      ...prevFormData,
      [option]: !prevFormData[option],
    }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Select Delivery Options:</Typography>
      </Grid>
      <Grid item xs={12}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.express_delivery}
                      onChange={handleOptionChange('express_delivery')}
                    />
                  }
                  label="Express Delivery"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.standard_delivery}
                      onChange={handleOptionChange('standard_delivery')}
                    />
                  }
                  label="Standard Delivery"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.same_day_delivery}
                      onChange={handleOptionChange('same_day_delivery')}
                    />
                  }
                  label="Same-Day Delivery"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.scheduled_delivery}
                      onChange={handleOptionChange('scheduled_delivery')}
                    />
                  }
                  label="Scheduled Delivery"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.weekend_delivery}
                      onChange={handleOptionChange('weekend_delivery')}
                    />
                  }
                  label="Weekend Delivery"
                />
                <FormControlLabel
              control={
                <Checkbox
                  checked={formData.evening_delivery}
                  onChange={handleOptionChange('evening_delivery')}
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
