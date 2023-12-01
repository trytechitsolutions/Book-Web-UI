import { Container, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react'

const TagsLabels = () => {
  return (
    <Container >
    <Typography variant="h5" align="center" gutterBottom>
    Tags and Labels
    </Typography>
    <form>
           <Grid container spacing={2}>  
           <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Product Tags"
              name="ProductTags"
              variant="outlined"
              value=''
              onChange={null}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <h6>add badges</h6>
            <TextField
              fullWidth
              label="Product Label"
              name="ProductLabel"
              variant="outlined"
              value=''
              onChange={null}
              required
            />
          </Grid>
          </Grid>
          </form>
          </Container>
  )
}

export default TagsLabels ;