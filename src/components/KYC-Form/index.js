import React, { useEffect, useState, useRef } from 'react';
// import { Col, Row, Button, Card } from 'antd';

import { kycform } from './model';
import InputFields from '../ReusableComponents/InputFields';
import { Container, Grid, Typography } from '@mui/material';
// import { onChangeValueBind, preparePayLoad, getErrorMsg, upDateForm } from '../ReusableComponents/CoomonFunctions';



const KYCF = () => {
  const ChildRef   = useRef();
    const [formData, setFormData] = useState(kycform);
    const [imagePreview, setImagePreview] = useState(null);


  function submitFormData(){
    submitFormData({ ...formData })
  }

  // function onChange(data) {
  //   onChangeValueBind(formData, data);
  // }
  return (
    
    <>
    <Container >  
         <div >
       <Typography variant="h4" align="center" style={{ marginTop: "50px" }} gutterBottom>
                KYC DETAILS
            </Typography>
            <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: "70px" }} >
            
        <InputFields ref={ChildRef} modaldata={formData} onChange={null} submitFormData={submitFormData} />
        </Grid>
        </div>
        </Container>
    </>  
  )
}



export default KYCF;
