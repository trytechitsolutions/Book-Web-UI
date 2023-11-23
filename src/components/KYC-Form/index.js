import React, { useState } from 'react';
import FileUploadPreview from '../ReusableComponents/FileUploadPreview';
import { makeStyles } from '@mui/styles';
import { Button, Stack, Grid } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: 8,
    border: '1px solid #ccc',
    borderRadius: 4,
    marginTop: 12,
  },
  buttonContainer: {
    marginTop: 16,
    display: 'flex',
    justifyContent: 'center',
    gap: 8, // Add space between buttons
  },
  button: {
    flex: 1,
  },
}));

const KycForm = () => {
  const classes = useStyles();
  const [aadharCardFile, setAadharCardFile] = useState(null);
  const [panCardFile, setPanCardFile] = useState(null);
  const [companyCIN, setCompanyCIN] = useState(null);
  const [companyPAN, setCompanyPAN] = useState(null);
  const [gst, setGst] = useState(null);

  const handleAadharCardChange = (file) => {
    setAadharCardFile(file);
  };

  const handlePanCardChange = (file) => {
    setPanCardFile(file);
  };
  const handleCompanyCINChange = (file) => {
    setCompanyCIN(file);
  };
  const handleCompanyPanCardChange = (file) => {
    setCompanyPAN(file);
  };
  const handleGstChange = (file) => {
    setGst(file);
  };

  const handleReset = () => {
    setAadharCardFile(null);
    setPanCardFile(null);
    setCompanyCIN(null);
    setCompanyPAN(null);
    setGst(null);
  };
  const onRemove = (label) => {
    if (label === 'Aadhar Card') {
      setAadharCardFile(null);
    }
    if (label === 'Pan Card') {
      setPanCardFile(null);
    }
    if (label === 'Company CIN') {
      setCompanyCIN(null);
    }
    if (label === 'Company Pan Card') {
      setCompanyPAN(null);
    }
    if (label === 'GST') {
      setGst(null);
    }

  }
  const handleSubmit = async () => {
    const formData = new FormData();
    const fileInputs = {
      'aadhar_card': aadharCardFile,
      'pan_card': panCardFile,
      'company_cin': companyCIN,
      'company_pan': companyPAN,
      'gst': gst,
    };
    for (const [fieldName, file] of Object.entries(fileInputs)) {
      if (file) {
        formData.append(fieldName, file);
      }
    }
    console.log('Form submitted:', formData);
    handleReset();
  };


  return (
    <div className={classes.formContainer}>
      <FileUploadPreview
        label="Aadhar Card"
        onFileChange={handleAadharCardChange}
        previewUrl={null}
        onRemove={() => onRemove('Aadhar Card')}
      />
      <FileUploadPreview
        label="Pan Card"
        onFileChange={handlePanCardChange}
        previewUrl={null}
        onRemove={() => onRemove('Pan Card')}
      />
      <FileUploadPreview
        label="Company CIN"
        onFileChange={handleCompanyCINChange}
        previewUrl={null}
        onRemove={() => onRemove('Company CIN')}
      />
      <FileUploadPreview
        label="Company Pan Card"
        onFileChange={handleCompanyPanCardChange}
        previewUrl={null}
        onRemove={() => onRemove('Company Pan Card')}
      />
      <FileUploadPreview
        label="GST"
        onFileChange={handleGstChange}
        previewUrl={null}
        onRemove={() => onRemove('GST')}
      />

      <Grid container className={classes.buttonContainer} >
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="outlined" color="secondary" className={classes.button} onClick={handleReset}>
            Reset
          </Button>
        </Stack>
      </Grid>
    </div>
  );
};

export default KycForm;
