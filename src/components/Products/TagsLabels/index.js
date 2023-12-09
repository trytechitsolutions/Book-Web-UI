import { Checkbox, Container, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, FormLabel, FormGroup, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  // Your styles here
}));

const TagsLabels = ({ onUpdate }) => {
  const classes = useStyles();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formData, setFormData] = useState({
    productTags: '',
    bestSeller: false,
    newArrival: false,
    limitedEdition: false,
    ecoFriendly: false,
    topRated: false,
  }); 
  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleOptionChange = (option) => () => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);

    // Update form data
    setFormData((prevFormData) => ({
      ...prevFormData,
      [option]: !prevFormData[option],
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };



  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Tags and Labels
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Product Tags"
              name="productTags"
              variant="outlined"
              value={formData.productTags}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Labels :</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.bestSeller}
                      onChange={handleOptionChange('bestSeller')}
                    />
                  }
                  label="Best Seller"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.newArrival}
                      onChange={handleOptionChange('newArrival')}
                    />
                  }
                  label="New Arrival"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.limitedEdition}
                      onChange={handleOptionChange('limitedEdition')}
                    />
                  }
                  label="Limited Edition"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.ecoFriendly}
                      onChange={handleOptionChange('ecoFriendly')}
                    />
                  }
                  label="Eco-Friendly"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.topRated}
                      onChange={handleOptionChange('topRated')}
                    />
                  }
                  label="Top Rated"
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TagsLabels;
