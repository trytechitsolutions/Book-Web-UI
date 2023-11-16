import React, { useEffect, useState, useRef } from 'react';
// import { Col, Row, Button, Card } from 'antd';
import { registrationForm } from './Model';
import InputFields from '../ReusableComponents/InputFields';
import { Container, Grid, Typography } from '@mui/material';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
import { registerRequest } from '../Redux/Reducer/RegisterReducer';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
// import { onChangeValueBind, preparePayLoad, getErrorMsg, upDateForm } from '../ReusableComponents/CoomonFunctions';
// import { useHistory } from 'react-router-dom';



const Register = () => {
  const ChildRef = useRef();
  const [formData, setFormData] = useState(registrationForm);
  const dispatch = useDispatch();
  // const history = useHistory();


  const RegisterData = GetStoreData('RegisterReducer');
  console.log(RegisterData, "registerData");
  const getRegisterData = RegisterData.registerData;
  console.log(getRegisterData);

  function submitFormData() {
    const payload = preparePayLoad(formData.fieldsArray);
    alert("called");
    const emptyFieldsArray = formData.fieldsArray.map(field => ({ ...field, value: '' }));
    setFormData({ ...formData , fieldsArray: emptyFieldsArray })
    dispatch(registerRequest(payload));
  }


  // if (RegisterData.password === RegisterData.confirmPassword) {
  //   // Redirect to login page
  //   // window.location.href = '/loginF';
  // } else {
  //   // Handle password mismatch error
  //   alert('Password and Confirm Password do not match');
  // }


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
          </Grid>
        </div>
      </Container>
    </>
  )
}

export default Register