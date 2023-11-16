import { Container, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import InputFields from '../ReusableComponents/InputFields'
import { useRef } from 'react';
import { componentsForm } from './model';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import { ComponentsRequest } from '../Redux/Reducer/ComponentsReducer';

const Components = () => {
  const ChildRef = useRef()
  const [formData, setFormData] = useState(componentsForm)
  const dispatch = useDispatch();
  const [data, setData] = useState([])


  const componentsData = GetStoreData('ComponentsReducer')?.componentsData;
  useEffect(() => {
    // Fetch data from the Redux store once when the component mounts
    setData(componentsData);
    console.log(componentsData,)
  }, []);

  function submitFormData() {
    const payload = preparePayLoad(formData.fieldsArray);
    setFormData({ ...formData })
    dispatch(ComponentsRequest(payload));
  }
  function onChange(data) {
    onChangeValueBind(formData, data);
  }

  return (
    <>
      <Container  >
        <div >
          <Typography variant="h4" align="center" style={{ marginTop: "20px" }} gutterBottom>
            Components
          </Typography>
          <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: "20px" }} >

            <InputFields ref={ChildRef} modaldata={formData} onChange={onChange} submitFormData={submitFormData} />
          </Grid>
        </div>
      </Container>
    </>
  )
}

export default Components