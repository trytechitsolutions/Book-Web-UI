import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
    padding: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

function PublisherComponent() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send the data to an API
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        label="Name"
        fullWidth
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={classes.input}
      />
      <TextField
        label="Phone"
        fullWidth
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className={classes.input}
      />
      <TextField
        label="Email"
        fullWidth
        name="email"
        value={formData.email}
        onChange={handleChange}
        className={classes.input}
      />
      <TextField
        label="Address"
        fullWidth
        name="address"
        value={formData.address}
        onChange={handleChange}
        className={classes.input}
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}

export default PublisherComponent;
