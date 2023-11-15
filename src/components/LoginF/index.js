import React, { useEffect, useState, useRef } from 'react';
// import { Col, Row, Button, Card } from 'antd';
import { loginForm } from './model';
import InputFields from '../ReusableComponents/InputFields';
import { Container, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import { loginRequest } from '../Redux/Reducer/LoginReducer';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';


const Login = () => {
    const ChildRef   = useRef();
      const [formData, setFormData] = useState(loginForm);
      const dispatch = useDispatch();

      const LoginData = GetStoreData('LoginReducer');
      console.log(LoginData, "loginData");
      const getLoginData = LoginData.loginData;
      console.log(getLoginData);
    
      function submitFormData() {
        const payload = preparePayLoad(formData.fieldsArray);
        alert("called");
        setFormData({ ...formData })
        dispatch(loginRequest(payload));
      }
    
      function onChange(data) {
        onChangeValueBind(formData, data);
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
        </Grid>
        </div>
        </Container>
    </>  
  )
}

export default Login ; 