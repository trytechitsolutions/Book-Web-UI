import React, { useEffect, useState, useRef } from 'react';
// import { Col, Row, Button, Card } from 'antd';
import { loginForm } from './model';
import InputFields from '../ReusableComponents/InputFields';
import { Button, Container, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import { loginRequest } from '../Redux/Reducer/LoginReducer';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const ChildRef   = useRef();
      const [formData, setFormData] = useState(loginForm);
      const dispatch = useDispatch();
      const [page, setPage] = useState("Login");
      const [data, setData] = useState([]);
      const navigate = useNavigate();

      const registerData = GetStoreData('RegisterReducer')?.registerData;


    
      function submitFormData() {
        console.log('in submit', formData)
        // const loginPassword = loginData?.password;
      console.log(registerData[0].password)
      const registerPassword = registerData[0]?.password;
        const payload = preparePayLoad(formData.fieldsArray);
      const loginPassword = formData.fieldsArray[1].value;
      
      
        // Check if the registration password matches the login password
  if (loginPassword !== registerPassword ) {         
    
    alert('Passwords do not match. Please try again.');

        } else {
          dispatch(loginRequest(payload));      
          navigate('/profile '); 
        }
      }
      
      useEffect(() => {
        if (page === 'Login') {
          // Redirect to the login page
          navigate('/login');
        } else if (page === 'Register') {
          // Redirect to the registration page
          navigate('/register');  // Replace '/register' with the desired path for registration
        }
      }, [page]);


    
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
         <Typography variant="h6" align="center" style={{ marginTop: '3rem' }}>
         Clik here<Button type="link" onClick={() => setPage(page === "Login" ? "Register" : "Login")} >
                {page === "Login" ? "Register" : "Login"}
              </Button>
          </Typography>
        </Grid> 
        </div>
        </Container>
    </>  
  )
}



export default Login ; 