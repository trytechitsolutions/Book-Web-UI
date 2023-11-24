import { Button, Container, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import FileUploadPreview from '../ReusableComponents/FileUploadPreview';
import { makeStyles } from '@mui/styles';
// import './index.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import StoreTimingsConfigurator from '../ReusableComponents/StoreTimings';

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

const Store = () => {
  const classes = useStyles();
  const [storeLogoFile, setStoreLogoFile] = useState(null);
  const [storeFeviconFile, setStoreFeviconFile] = useState(null);
  const [storeTimings, setStoreTimings] = useState([]);


  const [formData, setFormData] = useState({
    store_name: '',
    store_logo: null,
    store_fevicon: null,
    domain: '',
    social_instagram: '',
    social_facebook: '',
    social_whatsapp: '',
    social_twitter: '',
    social_youtube: '',
    social_pinterest: '',
    social_linkedin: '',
    store_timings: [],
  });






  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    const handleStoreLogoChange = (file) => {
        setStoreLogoFile(file);
      };   
      const handleStoreFeviconChange = (file) => {
        setStoreFeviconFile(file);
      };
      const handleReset = () => {
        setStoreLogoFile(null);
        setStoreFeviconFile(null);
          setStoreTimings([]);
      }
      const onRemove = (label) => {
        if (label === 'Store Logo') {
            setStoreLogoFile(null);
        }
        if (label === 'Store Fevicon') {
            setStoreFeviconFile(null);
        }
      }
      const handleSubmit = async () => {
      const data = new FormData();
      const fileInputs = {
        'store_logo': storeLogoFile,
        'store_fevicon': storeFeviconFile,
    };
    // for (const [fieldName, file] of Object.entries(fileInputs)) {
    //   if (file) {
    //     formData.append(fieldName, file);
    //   }
    // }

    for (const [key, value] of Object.entries(formData)) {
      if (value !== null && value !== undefined) {
        data.append(key, value);
      }
    }
    console.log('Form submitted:', data);
    handleReset();
    }
    const onChangeAction = (data) => {
      console.log(data)
     }

  return (
    <div className={classes.formContainer}>
    <TextField
          label="Store Name"
          name="store_name"
           fullWidth
           required
           sx={{ marginBottom: '10px' }} 
           value={formData.store_name}
        onChange={handleInputChange}
            /> 
    <FileUploadPreview
        label="Store Logo"
        name="logo"
        onFileChange={handleStoreLogoChange}
        // (file) => handleFileChange('store_logo', file)}
        previewUrl={null}
        onRemove={() => onRemove('Store Logo')}
      />
      <FileUploadPreview
        label="Store Fevicon"
        name=""
        onFileChange={handleStoreFeviconChange}
        previewUrl={null}
        onRemove={() => onRemove('Store Fevicon')}
      />   
      <TextField
        label="Domain"
        name="domain"
        fullWidth
        required
        sx={{ marginBottom: '10px' }} 
        />     
    <TextField
      label="Instagram"
      name="social_instagram"
      id="outlined-start-adornment"
      sx={{ m: 1, width: '25ch' }}
       InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <InstagramIcon />
          </InputAdornment>
         ),
        }}
        value={formData.social_instagram}
        onChange={handleInputChange}
       />
      <TextField
      label="Facebook"
      name="social_facebook"
      id="outlined-start-adornment"
      sx={{ m: 1, width: '25ch' }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FacebookIcon />
          </InputAdornment>
        ),
       }}
       value={formData.social_facebook}
       onChange={handleInputChange}
       />
      <TextField
        label="WhatsApp"
        name="social_whatsapp"
        id="outlined-whatsapp-adornment"
        sx={{ m: 1, width: '25ch' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <WhatsAppIcon />
            </InputAdornment>
          ),
        }}
        value={formData.social_whatsapp}
        onChange={handleInputChange}
      />
      <TextField
        label="Twitter"
        name="social_twitter"
        id="outlined-twitter-adornment"
        sx={{ m: 1, width: '25ch' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TwitterIcon />
            </InputAdornment>
          ),
        }}
        value={formData.social_twitter}
        onChange={handleInputChange}
      />
      <TextField
        label="YouTube"
        name="social_youtube"
        id="outlined-youtube-adornment"
        sx={{ m: 1, width: '25ch' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <YouTubeIcon />
            </InputAdornment>
          ),
        }}
        value={formData.social_instagram}
        onChange={handleInputChange}
      />
      <TextField
        label="Pinterest"
        name="social_pinterest"
        id="outlined-pinterest-adornment"
        sx={{ m: 1, width: '25ch' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PinterestIcon />
            </InputAdornment>
          ),
        }}
        value={formData.social_pinterest}
        onChange={handleInputChange}
      />
      <TextField
        label="LinkedIn"
        name="social_linkedin"
        id="outlined-linkedin-adornment"
        sx={{ m: 1, width: '25ch' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkedInIcon />
            </InputAdornment>
          ),
        }}
        value={formData.social_linkedin}
        onChange={handleInputChange}
      />
     <StoreTimingsConfigurator onChangeAction={onChangeAction}/> 

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
     )
}

export default Store