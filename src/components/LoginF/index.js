import React, { useState, useRef } from 'react';
import { loginForm } from './model';
import InputFields from '../ReusableComponents/InputFields';
import { Button, Container, Grid, Typography } from '@mui/material';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useNavigate } from 'react-router-dom';
import * as securedLocalStorage from '../../services/secureLocalStorage';
import { apiRequest } from '../../services/api';
import Loader from '../common/Loader';
import SnackbarView from '../common/SnackBar';

const Login = () => {
  const ChildRef = useRef();
  const [formData, setFormData] = useState(loginForm);
  const [page, setPage] = useState("Login");
  const serverUrl = securedLocalStorage.baseUrl;
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarData, setSnackBarData] = React.useState();
  const [showLoader, setShowLoader] = React.useState(false);
  const navigate = useNavigate();

  const submitFormData = async () => {
    try {
      setShowLoader(true);
      let paylaod = preparePayLoad(formData.fieldsArray)
      const resp = await apiRequest(paylaod, serverUrl + "/auth/signin/admin ", 'post');
      setShowLoader(false);
      if (resp?.data?.data) {
        setOpenSnackBar(true);
        const data = {
          type: "success",
          message: "Logged in sucessfully!....",
          open: true
        }
        navigate('/kyc-form')

        setSnackBarData(data);
      } else {
        setOpenSnackBar(true);
        const data = {
          type: "error",
          message: 'Login failed.',
          open:true
        }
        setSnackBarData(data);
      }
    } catch (err) {
      setOpenSnackBar(true);
      const data = {
        type: "error",
        message: 'Login failed.',
        open: true,
      }
      setSnackBarData(data);
    }
  };

  function onChange(data) {
    onChangeValueBind(formData, data);
  }

  const closeSnakBar = () => {
    setOpenSnackBar(false)
  }

  return (
    <>
      <Container maxWidth="sm" >
        <div >
          <Typography variant="h4" align="center" style={{ marginTop: "20px" }} gutterBottom>
            Login
          </Typography>
          <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: "20px" }} >

            <InputFields ref={ChildRef} modaldata={formData} onChange={onChange} submitFormData={submitFormData} />
            <Typography variant="h6" align="center" style={{ marginTop: '10rem' }}>
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

export default Login; 