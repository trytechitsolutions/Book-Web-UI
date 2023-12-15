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

const DeliveryOptions = ({ inputData, onUpdate }) => {
  const classes = useStyles();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formData, setFormData] = useState({
    express_delivery: inputData?.express_delivery || false,
    standard_delivery: inputData?.standard_delivery || false,
    same_day_delivery: inputData?.same_day_delivery || false,
    scheduled_delivery: inputData?.scheduled_delivery || false,
    weekend_delivery: inputData?.weekend_delivery || false,
    evening_delivery: inputData?.evening_delivery ||false,
  }); 
  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleOptionChange = (field, value) => {
    // Ensure that boolean fields receive a boolean value
    const Value = typeof value === 'boolean' ? value : value === 'on';
  
    // Update form data
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: Value,
    }));
  
    // Notify the parent component with the changed data
    onUpdate({ ...formData, [field]: Value });
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
                      onChange={(e) => handleOptionChange ('express_delivery' , e.target.value)}
                    />
                  }
                  label="Express Delivery"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.standard_delivery}
                      onChange={(e) => handleOptionChange ('standard_delivery' , e.target.value)}
                    />
                  }
                  label="Standard Delivery"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.same_day_delivery}
                      onChange={(e) => handleOptionChange ('same_day_delivery' , e.target.value)}
                    />
                  }
                  label="Same-Day Delivery"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.scheduled_delivery}
                      onChange={(e) => handleOptionChange ('scheduled_delivery' , e.target.value)}
                    />
                  }
                  label="Scheduled Delivery"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.weekend_delivery}
                      onChange={(e) => handleOptionChange ('weekend_delivery' , e.target.value)}
                    />
                  }
                  label="Weekend Delivery"
                />
                <FormControlLabel
              control={
                <Checkbox
                  checked={formData.evening_delivery}
                  onChange={(e) => handleOptionChange ('evening_delivery' , e.target.value)}
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
