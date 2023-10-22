import React, { useState, useTransition  } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
} from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { apiRequest } from '../../services/api';
// import { useHistory } from 'react-router-dom';
// Import the history package from react router dom. 
import { useNavigate } from "react-router-dom"
import Loader from './Loader';

const LoginForm = (onLoginSuccess) => {
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Example usage in a component function
        // startTransition(async () => {
        try {
            setLoading(true)
            const response = await fetch('http://139.59.46.40:8000/api/auth/signin', {
                method: 'POST', // or 'PUT' for editing
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.status === 200) {
                const responseData = await response.json();
                const token = responseData?.data?.token;
                localStorage.setItem('token', token);
                // onLoginSuccess();
                setLoading(false)
                navigate('/books');
            }

        } catch (error) {
            // Handle errors
        }
    // })


    };

    return (
        <Container maxWidth="sm">
            {loading &&
                <Loader />}
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default LoginForm;
