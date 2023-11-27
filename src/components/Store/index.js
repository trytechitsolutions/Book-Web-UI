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
import { apiRequest } from '../../services/api';
import * as securedLocalStorage from '../../services/secureLocalStorage';
import Loader from '../common/Loader';
import SnackbarView from '../common/SnackBar';


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
  const [storeTimings, setStoreTimings] = useState(null);
  const serverUrl = securedLocalStorage.baseUrl;
  const [showLoader, setShowLoader] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarData, setSnackBarData] = React.useState();


  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    social_instagram: '',
    social_facebook: '',
    social_whatsapp: '',
    social_twitter: '',
    social_youtube: '',
    social_pinterest: '',
    social_linkedin: '',
    social_snapchat:'',
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
        setShowLoader(true);
      const data = new FormData();
      const fileInputs = {
        'store_logo': storeLogoFile,
        'store_favicon': storeFeviconFile,
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
    if (storeLogoFile){
      data.append('store_logo', storeLogoFile)
    }
    if (storeFeviconFile){
      data.append('store_favicon', storeFeviconFile)
    }
    const resp = await apiRequest(data, serverUrl + "preference/store", 'post');
    setShowLoader(false);
    if (resp?.data?.data) {
      setOpenSnackBar(true);
      const data = {
        type: "success",
        message: "Store added  sucessfully!....",
        open: true
      }
      setSnackBarData(data);
      handleReset();

    } else {
      setOpenSnackBar(true);
      handleReset();
      const data = {
        type: "error",
        message: 'Store added failed.',
        open: true
      }
      setSnackBarData(data);
    }
   
    }
    const onChangeAction = (data) => {
      formData.store_timings= JSON.stringify(data)
      setFormData(formData)
      console.log(data)
     }
     const closeSnakBar = () => {
      setOpenSnackBar(false)
    }
  return (
    <div className={classes.formContainer}>
    <TextField
          label="Store Name"
          name="name"
           fullWidth
           required
           sx={{ marginBottom: '10px' }} 
           value={formData.name}
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
        value={formData.domain}
        onChange={handleInputChange}
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
        value={formData.social_youtube}
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
      label="Instagram"
      name="social_snapchat"
      id="outlined-start-adornment"
      sx={{ m: 1, width: '25ch' }}
       InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <InstagramIcon />
          </InputAdornment>
         ),
        }}
        value={formData.social_snapchat}
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
        {openSnackBar && <SnackbarView {...snackBarData} onClose={closeSnakBar} />}
      {showLoader &&
        <Loader />
      }
      </Grid>
    </div>
     )
}

export default Store