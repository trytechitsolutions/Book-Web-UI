import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Container, Typography } from '@mui/material';
import Loader from './common/Loader';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        storeName: '',
        mobileNumber: '',
        email: '',
        businessCategory: '',
        city: '',
        
        country: '',
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <> <Container maxWidth="sm">
            {loading &&
                <Loader />}
            <Typography variant="h4" align="center" gutterBottom>
                Registration Form
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Full Name*"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Company Name"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Store Name*"
                            name="storeName"
                            value={formData.storeName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Mobile Number*"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Email*"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Business Category*</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formData.businessCategory}
                                label="Business Category*"
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Category 1">Category 1</MenuItem>
                                <MenuItem value="Category 2">Category 2</MenuItem>
                                <MenuItem value="Category 3">Category 3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="City*"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Country*"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
                &nbsp;&nbsp;
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} align="center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
        </>
    );
}

export default RegistrationForm;