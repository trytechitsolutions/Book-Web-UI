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
    expressDelivery: false,
    standardDelivery: false,
    sameDayDelivery: false,
    scheduledDelivery: false,
    weekendDelivery: false,
    eveningDelivery:false,
  }); 
  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleOptionChange = (option) => () => {
    // Update form data
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`${option}Delivery`]: !prevFormData[`${option}Delivery`],
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
                      checked={formData.expressDelivery}
                      onChange={handleOptionChange('express')}
                    />
                  }
                  label="Express Delivery"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.standardDelivery}
                      onChange={handleOptionChange('standard')}
                    />
                  }
                  label="Standard Delivery"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.sameDayDelivery}
                      onChange={handleOptionChange('sameDay')}
                    />
                  }
                  label="Same-Day Delivery"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.scheduledDelivery}
                      onChange={handleOptionChange('scheduled')}
                    />
                  }
                  label="Scheduled Delivery"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.weekendDelivery}
                      onChange={handleOptionChange('weekend')}
                    />
                  }
                  label="Weekend Delivery"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.eveningDelivery}
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
