import React, { useEffect, useState, useRef } from 'react';
// import { Col, Row, Button, Card } from 'antd';
import { storeForm } from './model';
import InputFields from '../ReusableComponents/InputFields';
import { Container, Grid, Typography } from '@mui/material';
// import { onChangeValueBind, preparePayLoad, getErrorMsg, upDateForm } from '../ReusableComponents/CoomonFunctions';



const StoreFrom = () => {
  const ChildRef = useRef();
  const [formData, setFormData] = useState(storeForm);


  function submitFormData() {
    submitFormData({ ...formData })
  }

  // function onChange(data) {

  //   onChangeValueBind(formData, data);
  // }
  return (

    <>
      <Container maxWidth="lg">
        <div >
          <Typography variant="h4" align="center" style={{ marginTop: "50px" }} gutterBottom>
            Store Details Form
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={9} style={{ marginTop: "70px" }} >
              <InputFields ref={ChildRef} modaldata={formData} onChange={null} submitFormData={submitFormData} />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  )
}

export default StoreFrom;
