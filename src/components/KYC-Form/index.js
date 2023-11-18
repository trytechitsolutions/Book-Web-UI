import React, { useEffect, useState, useRef } from 'react';
// import { Col, Row, Button, Card } from 'antd';

import { kycform } from './model';
import InputFields from '../ReusableComponents/InputFields';
import { Container, Grid, Typography } from '@mui/material';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import { KycRequest } from '../Redux/Reducer/KycReducer';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
// import { onChangeValueBind, preparePayLoad, getErrorMsg, upDateForm } from '../ReusableComponents/CoomonFunctions';



const KycForm = () => {
    const ChildRef   = useRef();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(kycform);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();



    const kycData = GetStoreData('KycReducer')?.kycData;
    
    useEffect(() => {
      // Fetch data from the Redux store once when the component mounts
      setData(kycData);
    }, [kycData]);

  function submitFormData(){
    const payload = preparePayLoad(formData.fieldsArray);
    const isFileExist = formData.fieldsArray.filter((f)=> f.type==="file");
    if(isFileExist){
    payload.file = isFileExist[0]?.value;
    setFormData({ ...formData });
    }
    dispatch(KycRequest(payload));
    setShowForm(false); // Hide the form after submission
  }

  
  function onChange(data) {
    onChangeValueBind(formData, data);
  }


  return (
    
    <>
    <Container >  
         <div >
       <Typography variant="h4" align="center" style={{ marginTop: "50px" }} gutterBottom>
                KYC DETAILS
            </Typography>
            <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: "70px" }} >
            
        <InputFields ref={ChildRef} modaldata={formData} onChange={onChange} submitFormData={submitFormData} />
        </Grid>
        </div>
        </Container>
    </>  
  )
}



export default KycForm;
