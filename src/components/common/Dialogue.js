import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ErrorDialog = ({ isOpen, onClose, errors }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>Error</DialogTitle>
    <DialogContent>
      {Object.keys(errors).map((section, index) => (
        <div key={index}>
          <Typography ><p><span style={{fontWeight:'bolder'}}>{`${section.replace(/\b\w/g, match => match.toUpperCase())}`} </span> {` section has the following errors:`}</p></Typography>
          <ul style={{color:'red'}}>
            {errors[section].map((error, errorIndex) => (
              <li key={`${index}-${errorIndex}`}>{error.replace(/\b\w/g, match => match.toUpperCase())}</li>
            ))}
          </ul>
        </div>
      ))}
      <Button variant="contained" onClick={onClose}>
        Close
      </Button>
    </DialogContent>
  </Dialog>
  );
};

export default ErrorDialog;
