import React, { useState } from 'react';
import FileUploadPreview from '../ReusableComponents/FileUploadPreview';
import { makeStyles } from '@mui/styles';
import { Button, Stack, Grid } from '@mui/material';
// import StoreTimingsConfigurator from '../ReusableComponents/StoreTimings';
import { apiRequest } from '../../services/api';
import * as securedLocalStorage from '../../services/secureLocalStorage';
import SnackbarView from '../common/SnackBar';
import Loader from '../common/Loader';

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

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarData, setSnackBarData] = React.useState();
  const [showLoader, setShowLoader] = React.useState(false);

  const serverUrl = securedLocalStorage.baseUrl;
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
    const resp = await apiRequest(formData, serverUrl + "preference/kyc ", 'post');
    setShowLoader(false);
    if (resp?.data?.data) {
      setOpenSnackBar(true);
      const data = {
        type: "success",
        message: "Kyc documents uploaded sucessfully!....",
        open: true
      }
      setSnackBarData(data);
      handleReset();
    } else {
      setOpenSnackBar(true);
      const data = {
        type: "error",
        message: 'Kyc documents upload failed.',
        open:true
      }
      setSnackBarData(data);
    }
  };
  const closeSnakBar = () => {
    setOpenSnackBar(false)
  }

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
      {openSnackBar && <SnackbarView {...snackBarData} onClose={closeSnakBar}/> }
        {showLoader &&
          <Loader />
        }
    </div>
  );
};

export default KycForm;
