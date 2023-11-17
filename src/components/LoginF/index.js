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



      const loginData = GetStoreData('LoginReducer')?.loginData;


      const registerPassword = formData.registerData.password;
  const loginPassword = loginData.password;

      useEffect(() => {
        // Fetch data from the Redux store once when the component mounts
        setData(loginData);
      }, [loginData]);
      

    
      function submitFormData() {
        const payload = preparePayLoad(formData.fieldsArray);
      
        // Dispatch the login request
        dispatch(loginRequest(payload));
      
        // Check if the registration password matches the login password
  if (registerPassword === loginPassword) {          // Passwords match, open the profile page (replace 'profile-page.html' with your actual page)
          navigate('/profile '); 
        } else {
          alert('Passwords do not match. Please try again.');
        }
      }
      
      // useEffect(() => {
      //   // Assuming you have a route for '/profile'
      //   if (page !== 'Login') {
      //     // Redirect to a different page (replace '/profile' with the desired path)
      //     navigate('/loginF');  
      //   }
      // }, [page]);



    
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
         <Typography variant="h6" align="center" style={{ marginTop: '10rem' }}>
         Clik here<Button type="link" onClick={() => setPage(page === "Login" ? "Register" : "Login")} >
                {page === "Login" ? "Register" : "Login"}
              </Button>
          </Typography>
        </Grid> 
        {/* {
            showAlert &&
            <AlertMessage data={alertData} />
          } */}
        </div>
        </Container>
    </>  
  )
}

export default Login ; 