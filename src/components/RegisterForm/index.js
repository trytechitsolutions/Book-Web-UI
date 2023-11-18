import React, { useEffect, useState, useRef } from 'react';
import { registrationForm } from './Model';
import InputFields from '../ReusableComponents/InputFields';
import { Button, Container, Grid, Typography } from '@mui/material';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
import { registerRequest } from '../Redux/Reducer/RegisterReducer';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  
  const ChildRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(registrationForm);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState("Register");


  const registerData = GetStoreData('RegisterReducer')?.registerData;

  useEffect(() => {
    // Fetch data from the Redux store once when the component mounts
    setData(registerData);
  }, [registerData]);

  function submitFormData() {
    const payload = preparePayLoad(formData.fieldsArray);
    setFormData({ ...formData });
    dispatch(registerRequest(payload));
    setShowForm(false); // Hide the form after submission

    if (formData.fieldsArray.find(field => field.name === 'password').value !==
    formData.fieldsArray.find(field => field.name === 'confirmPassword').value){
      // Handle password mismatch error
      alert('Password and Confirm Password do not match');
      return;
    }
  
    // Passwords match, proceed with the form submission
    const emptyFieldsArray = formData.fieldsArray.map(field => ({ ...field, value: '' }));
    setFormData({ ...formData, fieldsArray: emptyFieldsArray });
    dispatch(registerRequest(payload));
  
    // Redirect to login page 
    navigate('/login'); 
   }


   useEffect(() => {
    if (page === 'Login') {
      navigate('/login');
    } else if (page === 'Register') {
      navigate('/register');  
    }
  }, [page]);

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

      </Container>
    </>
  )
}

export default RegisterForm ;