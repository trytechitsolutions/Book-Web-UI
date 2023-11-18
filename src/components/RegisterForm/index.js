import React, { useEffect, useState, useRef } from 'react';
import { registrationForm } from './Model';
import InputFields from '../ReusableComponents/InputFields';
import { Button, Container, Grid, Typography } from '@mui/material';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import { useNavigate } from 'react-router-dom';
import * as securedLocalStorage from '../../services/secureLocalStorage';
import { apiRequest } from '../../services/api';
import Loader from '../common/Loader';
import SnackbarView from '../common/SnackBar';

const RegisterForm = () => {
  
  const ChildRef = useRef();
  const [formData, setFormData] = useState(registrationForm);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState("Register");

  const serverUrl = securedLocalStorage.baseUrl;
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarData, setSnackBarData] = React.useState();
  const [showLoader, setShowLoader] = React.useState(false);

  const registerData = GetStoreData('RegisterReducer')?.registerData;

  useEffect(() => {
    // Fetch data from the Redux store once when the component mounts
    setData(registerData);
  }, [registerData]);

  const submitFormData = async () => {
    try {
      let paylaod = preparePayLoad(formData.fieldsArray)
      setShowLoader(true);
      paylaod.role = 1;
      const resp = await apiRequest(paylaod, serverUrl + "/auth/register/admin ", 'post');
      setShowLoader(false);
      if (resp?.data?.data) {
        setOpenSnackBar(true);
        const data = {
          type: "success",
          message: "Registered sucessfully!...."
        }

        setSnackBarData(data);
      } else {
        setOpenSnackBar(true);
        const data = {
          type: "error",
          message: 'Registration failed.',
          open:true
        }
        setSnackBarData(data);
      }
    } catch (err) {
      setOpenSnackBar(true);
      const data = {
        type: "error",
        message: 'Registration failed.',
        open: true,
      }
      setSnackBarData(data);
    }
  };

  const closeSnakBar = () => {
    setOpenSnackBar(false)
  }
  function onChange(data) {
    onChangeValueBind(formData, data);
  }
  return (

    <>
      <Container >
        <div >
          <Typography variant="h4" align="center" style={{ marginTop: "20px" }} gutterBottom>
            Registration Form
          </Typography>
          <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: "20px" }}>
            <InputFields ref={ChildRef} modaldata={formData}  onChange={onChange} submitFormData={submitFormData} />
            <Typography variant="h6" align="center" style={{ marginTop: '5rem' }}>
            Clik here<Button type="link" onClick={() => setPage(page === "Login" ? "Register" : "Login")} >
                {page === "Login" ? "Register" : "Login"}
              </Button>
          </Typography>
          </Grid>

        </div>
        {openSnackBar && <SnackbarView {...snackBarData} onClose={closeSnakBar}/> }
        {showLoader &&
          <Loader />
        }
      </Container>
    </>
  )
}

export default RegisterForm ;