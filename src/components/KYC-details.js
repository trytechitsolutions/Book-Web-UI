import React, { useState } from 'react';
import { Button, Grid, Container, Paper, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    fileInput: {
      backgroundColor: '#f5f5f5', // Add your desired background color here
      padding: '10px',
      borderRadius: '5px',
    },
  }));

const KYCForm = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        aadharCard: null,
        panCard: null,
        companyCIN: null,
        companyPAN: null,
        gst: null,
    });

    const handleInputChange = (event) => {
        const { name, files } = event.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };

    const handleSubmit = () => {

    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px' }}>
                <h1>KYC DETAILS</h1>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <InputLabel >Aadhar Card:</InputLabel>
                            <input
                                type="file"
                                accept=".jpg, .jpeg, .png, .pdf"
                                name="aadharCard"
                                onChange={handleInputChange}
                                className={classes.fileInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <InputLabel >PAN Card:</InputLabel>
                            <input
                                type="file"
                                accept=".jpg, .jpeg, .png, .pdf"
                                name="panCard"
                                onChange={handleInputChange}
                                className={classes.fileInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <InputLabel >Company CIN:</InputLabel>

                            <input
                                type="file"
                                accept=".jpg, .jpeg, .png, .pdf"
                                name="companyCIN"
                                onChange={handleInputChange}
                                className={classes.fileInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <InputLabel >Company PAN :</InputLabel>

                            <input
                                type="file"
                                accept=".jpg, .jpeg, .png, .pdf"
                                name="companyPAN"
                                onChange={handleInputChange}
                                className={classes.fileInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <InputLabel >GST:</InputLabel>

                            <input
                                type="file"
                                accept=".jpg, .jpeg, .png, .pdf"
                                name="gst"
                                onChange={handleInputChange}
                                className={classes.fileInput}
                            />
                        </Grid>
                        &nbsp;&nbsp;
                        <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} align="center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default KYCForm;
