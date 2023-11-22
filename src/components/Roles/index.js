import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import InputFields from '../ReusableComponents/InputFields';
import { mapValuesToForm, onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import GenericTable from '../common/GenericDataTable';
import { rolesForm } from './model';
import { apiRequest } from '../../services/api';
import * as securedLocalStorage from '../../services/secureLocalStorage';
import Loader from '../common/Loader';
import SnackbarView from '../common/SnackBar';


const Roles = () => {
  const ChildRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(rolesForm);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);



  const serverUrl = securedLocalStorage.baseUrl;
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarData, setSnackBarData] = React.useState();
  const [showLoader, setShowLoader] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null)



  const columns = [
    { id: 'name', label: 'Role' },
    { id :'is_active', label:'Status'}
  ];

const rolesData = GetStoreData('RolesReducer')?.rolesData;



  useEffect(() => {
    // Fetch data from the Redux store once when the component mounts
    async function  fetchData(){
      const resp = await apiRequest(null, serverUrl + "/preference/role", 'get');
      setShowLoader(false);
      if (resp?.data?.data) {
      setData(resp.data.data);
       }
      }   fetchData()
   
  }, [showForm]);

  const submitFormData = async () => {
    const payload = preparePayLoad(formData.fieldsArray);
    
    let formDataToSend = new FormData();
    if (selectedId) {
      payload.id = selectedId
    } 
    for (const key in payload) {
      formDataToSend.append(key, payload[key]);
    }
    const resp = await apiRequest(payload, serverUrl + "/preference/role", 'post');
    setShowLoader(false);
    if (resp?.data?.data) {
      setOpenSnackBar(true);
      const data = {
        type: "success",
        message: "Role added  sucessfully!....",
        open: true
      }

      setSnackBarData(data);
      setShowForm(false);
    } else {
      setOpenSnackBar(true);
      const data = {
        type: "error",
        message: 'Role added failed.',
        open:true
      }
      setSnackBarData(data);
    }
  
    // setShowForm(false); // Hide the form after submission
  }
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
    const resp = await apiRequest(null, serverUrl + "/preference/role/"+id, 'delete');
    setShowLoader(false);
    if (resp?.data?.data) {
      setOpenSnackBar(true);
      const data = {
        type: "success",
        message: "Role deleted  sucessfully!....",
        open: true
      }
    setSelectedId(null)
      setSnackBarData(data);
      setShowForm(false); // Hide the form after submission 
    } else {
      setOpenSnackBar(true);
      const data = {
        type: "error",
        message: 'Role delete failed.',
        open: true
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

  return (
    <Container>
      <div>
        <Typography variant="h4" align="center" style={{ marginTop: '20px' }} gutterBottom>
        Role
        </Typography>
        {!showForm && (
          <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: '20px', marginBottom:'2rem', float:'right' }}>
            <Button variant="contained" onClick={handleAddNewItem}>
              Add New  Role
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
            No data available. Please add new  Role.
          </Typography>
        )}
         {openSnackBar && <SnackbarView {...snackBarData} onClose={closeSnakBar}/> }
        {showLoader &&
          <Loader />
        }
    </Container>
  );
};

export default Roles;
