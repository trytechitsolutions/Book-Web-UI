import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import InputFields from '../ReusableComponents/InputFields';
import { mapValuesToForm, onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import GenericTable from '../common/GenericDataTable';
import { apiRequest } from '../../services/api';
import * as securedLocalStorage from '../../services/secureLocalStorage';
import Loader from '../common/Loader';
import SnackbarView from '../common/SnackBar';
import { userForm } from '../CustomerUserSignUp/mode';



const Components = () => {
  const ChildRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(userForm);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const serverUrl = securedLocalStorage.baseUrl;
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarData, setSnackBarData] = React.useState();
  const [showLoader, setShowLoader] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null)
  const userData = GetStoreData('UserSignUpReducer')?.userData;

  const columns = [
    { id: 'title', label: 'Title' },
    { id: 'path', label: 'Path' },
    { id: 'is_active', label: 'Status' }
  ];

 
  useEffect(() => {
    // Fetch data from the Redux store once when the component mounts
    async function fetchData() {
      const resp = await apiRequest(null, serverUrl + "preference/components", 'get');
      setShowLoader(false);
      if (resp?.data?.data) {
        setData(resp.data.data);
      }
    }
    fetchData()
  }, [showForm]);

  const submitFormData = async () => {
    const payload = preparePayLoad(formData.fieldsArray);
    console.log('payload', payload);   
    const resp = await apiRequest(payload, serverUrl + "preference/components", 'post');
    setShowLoader(false);
    if (resp?.data?.data) {
      setOpenSnackBar(true);
      const data = {
        type: "success",
        message: "Component added  sucessfully!....",
        open: true
      }
      setSnackBarData(data);
      setShowForm(false);
     } else {
      setOpenSnackBar(true);
      const data = {
        type: "error",
        message: 'Component added failed.',
        open:true
      }
      setSnackBarData(data);
    }
  }
  const closeSnakBar = () => {
    setOpenSnackBar(false)
  }
  function onChange(data) {
    onChangeValueBind(formData, data);
  }

  const handleAddNewItem = () => {
    setShowForm(true);
  };
  const onEdit = (id) => {
    setSelectedId(id);
    const selectedRecord = data.find((d) => d.id === id);
    const updateForm = mapValuesToForm(selectedRecord, formData);
  
    setFormData((prevFormData) => {
      return updateForm;
    });
  
    setShowForm(true);
   }
   const onDelete = async (id) => {
    const resp = await apiRequest(null, serverUrl + "preference/component/"+id, 'delete');
    setShowLoader(false);
    if (resp?.data?.data) {
      setOpenSnackBar(true);
      const data = {
        type: "success",
        message: "Brand added  sucessfully!....",
        open: true
      }
    setSelectedId(null)
      setSnackBarData(data);
      setShowForm(false); // Hide the form after submission
    } else {
      setOpenSnackBar(true);
      const data = {
        type: "error",
        message: 'Brand added failed.',
        open: true
      }
      setSnackBarData(data);
    }
    }

  return (
    <Container>
      <div>
        <Typography variant="h4" align="center" style={{ marginTop: '20px' }} gutterBottom>
          Components
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
          <GenericTable data={data} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        ) : (
          <Typography variant="h6" align="center" style={{ marginTop: '10rem' }}>
            No data available. Please add new Component.
          </Typography>
        )}
          {openSnackBar && <SnackbarView {...snackBarData} onClose={closeSnakBar}/> }
        {showLoader &&
          <Loader />
        }
    </Container>
  );
};

export default Components;






