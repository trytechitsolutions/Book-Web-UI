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
import { componentsForm } from './model';



const Components = () => {
  const ChildRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(componentsForm);
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

  const getComponents = async () => {
    setShowLoader(true);
    const resp = await apiRequest(null, serverUrl + "preference/role", 'get');
    setShowLoader(false);
    if (resp?.data?.data) {
      setData(resp.data.data);
      if (formData.fieldsArray) {
        formData.fieldsArray?.map((f) => {
          f.value = ''
          return f;
        })
        setFormData(formData)
      }
    }
  }
  const resetForm = () => {
    setFormData(componentsForm);
    setSelectedId(null);
  };
  useEffect(() => {
    async function fetchData() {
      setShowLoader(true);
      const resp = await apiRequest(null, serverUrl + "preference/components", 'get');
      setShowLoader(false); 
      if (resp?.data?.data) {
        setData(resp.data.data);
        if (formData.fieldsArray) {
          formData.fieldsArray?.map((f) => {
            f.value = ''
            return f;
          })
          setFormData(formData)
        }
      }
    }
    fetchData()
  }, [showForm]);

  const submitFormData = async () => {
    setShowLoader(true)
    const payload = preparePayLoad(formData.fieldsArray);
    
    let formDataToSend = new FormData();
    if (selectedId) {
      payload.id = selectedId
    } 
    for (const key in payload) {
      formDataToSend.append(key, payload[key]);
    }
    setShowLoader(true);
    const resp = await apiRequest(payload, serverUrl + "preference/components", 'post');
    setShowLoader(false);
    if (resp?.data?.data) {
      setOpenSnackBar(true);
      const data = {
        type: "success",
        message: "Component added successfully!....",
        open: true
      }
      await getComponents();
      resetForm();
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
      setShowForm(false);
    } 
  }
  function onChange(data) {
    onChangeValueBind(formData, data);
  }

  const handleAddNewItem = () => {
    setShowForm(true);
    setFormData(componentsForm)
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
    setShowLoader(true)
    const resp = await apiRequest(null, serverUrl + "preference/component/"+id, 'delete');
    setShowLoader(false);
    if (resp?.data?.data) {
      setOpenSnackBar(true);
      const data = {
        type: "success",
        message: "component deleted  sucessfully!....",
        open: true
      }
      resetForm();
      setSnackBarData(data);
      setShowForm(false); // Hide the form after submission
    } else {
      setOpenSnackBar(true);
      const data = {
        type: "error",
        message: 'component delete failed.',
        open: true
      }
      setSnackBarData(data);
    }
    }
    const closeSnakBar = () => {
      setOpenSnackBar(false)
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
      {!showForm && data?.length > 0 && (
          <GenericTable data={data} columns={columns} onEdit={onEdit} onDelete={onDelete} />
          )}
          {!showForm && (data?.length === 0) && (
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






