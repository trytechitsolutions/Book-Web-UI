import React, { useEffect, useState, useRef } from 'react';
import { kycform } from './model';
import InputFields from '../ReusableComponents/InputFields';
import { Container, Grid, Typography, Button } from '@mui/material';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import { KycRequest } from '../Redux/Reducer/KycReducer';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
import GenericTable from '../common/GenericDataTable';

// import { onChangeValueBind, preparePayLoad, getErrorMsg, upDateForm } from '../ReusableComponents/CoomonFunctions';



const KycForm = () => {
    const ChildRef   = useRef();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(kycform);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const columns = [
      { id: 'title', label: 'Title' },
      { id: 'path', label: 'Path' },
      { id: 'is_active', label: 'Status' }
    ];


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

  const handleAddNewItem = () => {
    setShowForm(true);
  };


  return (

    <Container>
      <div>
        <Typography variant="h4" align="center" style={{ marginTop: '20px' }} gutterBottom>
         KYC Details
        </Typography>
        {!showForm && (
          <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: '20px', marginBottom:'2rem', float:'right' }}>
            <Button variant="contained" onClick={handleAddNewItem}>
              Add New Item
            </Button>
          </Grid>
        )}
        {showForm && (
          <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: '20px' }}>
            <InputFields ref={ChildRef} modaldata={formData} onChange={onChange} submitFormData={submitFormData} />
          </Grid>
        )}
      </div>
      {data?.length > 0 ? (
          <GenericTable data={data} columns={columns} onEdit={null} onDelete={null} />
        ) : (
          <Typography variant="h6" align="center" style={{ marginTop: '10rem' }}>
            No data available. Please add new Component.
          </Typography>
        )}
    </Container>
 
  )
}



export default KycForm;
