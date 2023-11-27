import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import InputFields from '../ReusableComponents/InputFields';
import { categoriesForm } from './model';
import { mapValuesToForm, onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import GenericTable from '../common/GenericDataTable';
import { apiRequest } from '../../services/api';
import * as securedLocalStorage from '../../services/secureLocalStorage';
import SnackbarView from '../common/SnackBar';
import Loader from '../common/Loader';


const Categories = () => {
  const ChildRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(categoriesForm);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const serverUrl = securedLocalStorage.baseUrl;
  const [selectedId, setSelectedId] = React.useState(null)
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarData, setSnackBarData] = React.useState();
  const [showLoader, setShowLoader] = React.useState(false);
  const categoriesData = GetStoreData('CategoriesReducer')?.categoriesData;

  const columns = [
    { id: 'name', label: 'Title' },
    { id: 'parent_id', label: 'Parent Category' },
    { id: 'file', label: 'Files' },
    { id: 'is_active', label: 'Status' }

  ];


  useEffect(() => {
    async function fetchData() {
      setShowLoader(true);
      const resp = await apiRequest(null, serverUrl + "preference/category", 'get');
      setShowLoader(false);

      if (resp?.data?.data) {
        setData(resp.data.data);
      }
    }
    fetchData()
  }, [showForm]);

  const submitFormData = async () => {
    setShowLoader(true);
    const payload = preparePayLoad(formData.fieldsArray);
    const isFileExist = formData.fieldsArray.filter((f) => f.type === "file");

    if (isFileExist) {
      payload.logo = isFileExist[0].value;
      setFormData({ ...formData });
    }
    let formDataToSend = new FormData();
    for (const key in payload) {
      formDataToSend.append(key, payload[key]);
    }
    // dispatch(BrandsRequest(payload));
    if(selectedId){
      formDataToSend.append('id', selectedId);
    }
    setShowLoader(true);
    const resp = await apiRequest(formDataToSend, serverUrl + "preference/category", 'post');
    setShowLoader(false);
    if (resp?.data?.data) {
      setOpenSnackBar(true);
      const data = {
        type: "success",
        message: "Categories added  sucessfully!....",
        open: true
      }
      setFormData(categoriesForm)
      setSnackBarData(data);
      setShowForm(false);
    } else {
      setOpenSnackBar(true);
      const data = {
        type: "error",
        message: 'Categories added failed.',
        open: true
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
    setFormData(categoriesForm)
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
    const resp = await apiRequest(null, serverUrl + "/preference/category/" + id, 'delete');
    setShowLoader(false);
    if (resp?.data?.data) {
      setOpenSnackBar(true);
      const data = {
        type: "success",
        message: "category deleted  sucessfully!....",
        open: true
      }
      setSelectedId(null)
      setSnackBarData(data);
      setShowForm(false); 
    } else {
      setOpenSnackBar(true);
      const data = {
        type: "error",
        message: 'category deleted failed.',
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
          Categories
        </Typography>
        {!showForm && (
          <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: '20px', marginBottom: '2rem', float: 'right' }}>
            <Button variant="contained" onClick={handleAddNewItem}>
              Add New Category
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
          No data available. Please add new Category.
        </Typography>
      )}
      {openSnackBar && <SnackbarView {...snackBarData} onClose={closeSnakBar} />}
      {showLoader &&
        <Loader />
      }
    </Container>
  );
};

export default Categories;
