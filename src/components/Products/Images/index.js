import React, { useState } from 'react';
import FileUploadPreview from '../../ReusableComponents/FileUploadPreview';
import { makeStyles } from '@mui/styles';
import { Button, Stack, Grid } from '@mui/material';
import { apiRequest } from '../../../services/api';

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
    gap: 8,
  },
  button: {
    flex: 1,
  },
}));

const Images = () => {
  const classes = useStyles();;
  const [featureImage, setFeatureImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarData, setSnackBarData] = React.useState();
  const [showLoader, setShowLoader] = React.useState(false);



  const handleFeatureImageChange = (file) => {
    setFeatureImage(file);
  };

  const handleAdditionalImagesChange = (files) => {
    setAdditionalImages(files);
  };

  const handleReset = () => {
    setFeatureImage(null);
    setAdditionalImages([]);
  };

  const onRemove = (label) => {
    // Similar logic as before...
  };

  const handleSubmit = async () => {
    setShowLoader(true);
    const formData = new FormData();
    const fileInputs = {

      'feature_image': featureImage,
    };

    for (const [fieldName, file] of Object.entries(fileInputs)) {
      if (file) {
        formData.append(fieldName, file);
      }
    }

  };


  return (
    <div className={classes.formContainer}>
      {/* ... Previous FileUploadPreview components ... */}

      <FileUploadPreview
        label="Feature Image"
        onFileChange={handleFeatureImageChange}
        previewUrl={null}
        onRemove={() => onRemove('Feature Image')}
      />

      <FileUploadPreview
        label="Additional Images"
        multiple
        onFileChange={handleAdditionalImagesChange}
        previewUrl={null}
        onRemove={() => onRemove('Additional Images')}
      />

      {/* ... Button and SnackBar components ... */}
    </div>
  );
};

export default Images;
