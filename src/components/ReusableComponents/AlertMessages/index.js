import React, { useEffect } from 'react';
import { Snackbar, Alert, Box } from '@mui/material';

const AlertMessage = (props) => {
    const { type, message, closeAlert } = props.data;

    useEffect(() => {
        const timer = setTimeout(() => {
            closeAlert();
        }, 10000);

        return () => {
            clearTimeout(timer);
        };
    }, [closeAlert]);

    const handleClose = () => {
        closeAlert();
    };

    return (
        <Snackbar
            open={true} // Assuming you want the Snackbar to be open by default
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={type}
                sx={{ width: '100%', fontFamily: 'ITALIC SERIF', fontWeight: 'bold' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertMessage;
