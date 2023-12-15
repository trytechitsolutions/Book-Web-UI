import { Checkbox, Container, FormControl, FormControlLabel, Grid, InputLabel, FormLabel, FormGroup, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  // Your styles here
}));

const TagsLabels = ({inputData, onUpdate }) => {
  const classes = useStyles();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formData, setFormData] = useState({
    product_tags: inputData?.product_tags || '',
    best_seller: inputData?.best_seller || false,
    new_arrival: inputData?.new_arrival || false,
    limited_edition: inputData?.limited_edition || false,
    eco_friendly: inputData?.eco_friendly || false,
    top_rated: inputData?.top_rated || false,
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
          <InputLabel>Product Tags</InputLabel>
            <TextField
              fullWidth
              name="product_tags"
              variant="outlined"
              value={formData.product_tags}
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
                      checked={formData.best_seller}
                      onChange={handleOptionChange('best_seller')}
                    />
                  }
                  label="Best Seller"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.new_arrival}
                      onChange={handleOptionChange('new_arrival')}
                    />
                  }
                  label="New Arrival"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.limited_edition}
                      onChange={handleOptionChange('limited_edition')}
                    />
                  }
                  label="Limited Edition"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.eco_friendly}
                      onChange={handleOptionChange('eco_friendly')}
                    />
                  }
                  label="Eco-Friendly"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.top_rated}
                      onChange={handleOptionChange('top_rated')}
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
