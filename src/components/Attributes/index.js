import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import InputFields from '../ReusableComponents/InputFields';
import { mapValuesToForm, onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import GenericTable from '../common/GenericDataTable';
import { attributesForm } from './model';
import { BrandsRequest } from '../Redux/Reducer/BrandsReducer';
import { apiRequest } from '../../services/api';
import * as securedLocalStorage from '../../services/secureLocalStorage';
import Loader from '../common/Loader';
import SnackbarView from '../common/SnackBar';


const Attributes = () => {
  const ChildRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(attributesForm);
  const dispatch = useDispatch();
  const [data, setData] = useState([])
  const serverUrl = securedLocalStorage.baseUrl;
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarData, setSnackBarData] = React.useState();
  const [showLoader, setShowLoader] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null)
  const brandsData = GetStoreData('BrandsReducer')?.brandsData;

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Brand Name' },
    { id: 'file', label: 'Brand Logo' },
    { id: 'is_active', label: 'Status' }
  ];

  const getBrand = async () => {
    setShowLoader(true);
    const resp = await apiRequest(null, serverUrl + "preference/brand", 'get');
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
    setSelectedId(null);
    // setShowForm(false);
    // formData.fieldsArray?.map((f) => {
    //   f.value = ''
    //   return f;
    // })
    // setFormData(formData);
  };
  useEffect(() => {
    // Fetch data from the Redux store once when the component mounts
    // setShowLoader(true);
    // async function fetchData() {
    //   const resp = await apiRequest(null, serverUrl + "preference/brand", 'get');
    //   setShowLoader(false);
    //   if (resp?.data?.data) {
    //     setData(resp.data.data);
    //     if (formData.fieldsArray) {
    //       formData.fieldsArray?.map((f) => {
    //         f.value = ''
    //         return f;
    //       })
    //       setFormData(formData)
    //     }
    //   }
    // }
    // fetchData()
  }, [showForm]);



  const submitFormData = async () => {
    setShowLoader(true);
    const payload = preparePayLoad(formData.fieldsArray);
    console.log(payload, '***payload***')
    // const isFileExist = formData.fieldsArray.filter((f) => f.type === "file");
    // if (isFileExist) {
    //   payload.logo = isFileExist[0].value;
    //   setFormData({ ...formData });
    // }
    // let formDataToSend = new FormData();
    // if (selectedId) {
    //   formDataToSend.append('id', selectedId);
    // }
    // for (const key in payload) {
    //   formDataToSend.append(key, payload[key]);
    // }
    // setShowLoader(true);
    // const resp = await apiRequest(formDataToSend, serverUrl + "preference/brand", 'post');
    // setShowLoader(false);
    // if (resp?.data?.data) {
    //   setOpenSnackBar(true);
    //   const data = {
    //     type: "success",
    //     message: "Brand added  sucessfully!....",
    //     open: true
    //   }
    //   await getBrand();
    //   resetForm();
    //   setSnackBarData(data);
    //   setShowForm(false);
    // } else {
    //   setOpenSnackBar(true);
    //   const data = {
    //     type: "error",
    //     message: 'Brand added failed.',
    //     open: true
    //   }
    //   setSnackBarData(data);
    //   setShowForm(false);
    // }

  }
  function onChange(data) {
    onChangeValueBind(formData, data);
  }
  const handleAddNewItem = () => {
    setShowForm(true);
    setFormData(attributesForm)
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
    const resp = await apiRequest(null, serverUrl + "preference/brand/" + id, 'delete');
    setShowLoader(false);
    if (resp?.data?.data) {
      setOpenSnackBar(true);
      const data = {
        type: "success",
        message: "Brand deleted  sucessfully!....",
        open: true
      }
      resetForm();
      setSnackBarData(data);
      setShowForm(false); // Hide the form after submission

    } else {
      setOpenSnackBar(true);
      const data = {
        type: "error",
        message: 'Brand deleted failed.',
        open: true
      }
      setSnackBarData(data);
    }

  }
  const closeSnakBar = () => {
    setOpenSnackBar(false)
  }
  // const handleAutoCompleteKeyDown = (event) => {
  //   console.log(event, 'index***')
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     // Add logic to handle Enter key press for AutoComplete
  //   }
  // };

  const handleKeyDown = (event) => {
    console.log(formData, '***formData*****')
    if (event.key === 'Enter') {
      event.preventDefault();  // Prevent form submission
      ChildRef.current.handleKeyDown(event);  // Pass the event to InputFields component
    }
  };

  return (
    <Container>
      <div>
        <Typography variant="h4" align="center" style={{ marginTop: '20px' }} gutterBottom>
          Attributes
        </Typography>
        {!showForm && (
          <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: '20px', marginBottom: '2rem', float: 'right' }}>
            <Button variant="contained" onClick={handleAddNewItem}>
              Add New Brand
            </Button>
          </Grid>
        )}
        {showForm && (
          <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: '20px' }}>
            <InputFields
              ref={ChildRef}
              modaldata={formData}
              handleKeyDown={handleKeyDown}  // Pass the handleKeyDown function
              onChange={onChange}
              submitFormData={submitFormData}
            />
          </Grid>
        )}
      </div>
      {!showForm && data?.length > 0 && (
        <GenericTable data={data} columns={columns} onEdit={onEdit} onDelete={onDelete} />
      )}
      {(data?.length === 0) && !showForm && (
        <Typography variant="h6" align="center" style={{ marginTop: '10rem' }}>
          No data available. Please add new Brand.
        </Typography>
      )}
      {openSnackBar && <SnackbarView {...snackBarData} onClose={closeSnakBar} />}
      {showLoader &&
        <Loader />
      }
    </Container>
  );
}

export default Attributes;