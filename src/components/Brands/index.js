import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import InputFields from '../ReusableComponents/InputFields';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import GenericTable from '../common/GenericDataTable';
import {brandsForm} from './model';
import { BrandsRequest } from '../Redux/Reducer/BrandsReducer';
import { apiRequest } from '../../services/api';
import * as securedLocalStorage from '../../services/secureLocalStorage';
import Loader from '../common/Loader';
import SnackbarView from '../common/SnackBar';




const columns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Brand Name' },
  { id: 'file', label: 'Brand Logo' },
  { id: 'is_active', label: 'Status' }
];

const Brands = () => {
    const ChildRef = useRef();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(brandsForm);
    const dispatch = useDispatch();
    const [data, setData] = useState([])


  const serverUrl = securedLocalStorage.baseUrl;
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarData, setSnackBarData] = React.useState();
  const [showLoader, setShowLoader] = React.useState(false);

    const brandsData = GetStoreData('BrandsReducer')?.brandsData;


    useEffect(() => {
      // Fetch data from the Redux store once when the component mounts
      async function  fetchData(){
      const resp = await apiRequest(null, serverUrl + "/preference/brand ", 'get');
      setShowLoader(false);
      if (resp?.data?.data) {
      setData(resp.data.data);

       }
      }
      fetchData()
    }, [brandsData]);
  
    
  
    const submitFormData = async () => {
      const payload = preparePayLoad(formData.fieldsArray);
      const isFileExist = formData.fieldsArray.filter((f)=> f.type==="file");
      console.log('payload', payload);
      console.log('fileexist', isFileExist);
      if(isFileExist){
      payload.logo = isFileExist[0].value;
      setFormData({ ...formData });
      }
      let formDataToSend = new FormData();
      for (const key in payload) {
          formDataToSend.append(key, payload[key]);
      }
console.log("formDataToSend,", formDataToSend)
      // dispatch(BrandsRequest(payload));
      const resp = await apiRequest(formDataToSend, serverUrl + "/preference/brand ", 'post');
      setShowLoader(false);
      if (resp?.data?.data) {
        setOpenSnackBar(true);
        const data = {
          type: "success",
          message: "Brand added  sucessfully!....",
          open: true
          
        }

        setSnackBarData(data);
        setShowForm(false); // Hide the form after submission

      } else {
        setOpenSnackBar(true);
        const data = {
          type: "error",
          message: 'Brand added failed.',
          open:true
        }
        setSnackBarData(data);
      }
    
    }
  
    function onChange(data) {
      onChangeValueBind(formData, data);
    }
  
    const handleAddNewItem = () => {
      setShowForm(true);
    };
    const onEdit=(id)=>{
console.log(id,'***Id****')
const selectedRecord = data.find((d)=>d.id===id);
setFormData(selectedRecord)
setShowForm(true);
    }
    const closeSnakBar = () => {
      setOpenSnackBar(false)
    }
  
    return (
      <Container>
        <div>
          <Typography variant="h4" align="center" style={{ marginTop: '20px' }} gutterBottom>
           Brands
          </Typography>
          {!showForm && (
            <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: '20px', marginBottom:'2rem', float:'right' }}>
              <Button variant="contained" onClick={handleAddNewItem}>
                Add New Brand
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
            <GenericTable data={data} columns={columns} onEdit={onEdit} onDelete={null} />
          ) : (
            <Typography variant="h6" align="center" style={{ marginTop: '10rem' }}>
              No data available. Please add new Brand.
            </Typography>
          )}
           {openSnackBar && <SnackbarView {...snackBarData} onClose={closeSnakBar}/> }
        {showLoader &&
          <Loader />
        }
      </Container>
    );
}

export default Brands ;