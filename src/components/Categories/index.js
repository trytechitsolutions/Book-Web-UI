import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import InputFields from '../ReusableComponents/InputFields';
import { categoriesForm } from './model';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import GenericTable from '../common/GenericDataTable';
import { apiRequest } from '../../services/api';
import * as securedLocalStorage from '../../services/secureLocalStorage';


const Categories = () => {
  const ChildRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(categoriesForm);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const serverUrl = securedLocalStorage.baseUrl;
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarData, setSnackBarData] = React.useState();
  const [showLoader, setShowLoader] = React.useState(false);

  const columns = [
    { id: 'name', label: 'Title' },
    { id: 'parent_id', label: 'Parent Category' },
    { id: 'file', label: 'Files' },
    { id :'is_active', label:'Status'}

  ];

  const categoriesData = GetStoreData('CategoriesReducer')?.categoriesData;

  useEffect(() => {
    // Fetch data from the Redux store once when the component mounts
    async function  fetchData(){
      const resp = await apiRequest(null, serverUrl + "preference/category", 'get');
      setShowLoader(false);
      if (resp?.data?.data) {
      setData(resp.data.data);
formData.fieldsArray.map( (f)=>{
    if (f.name === "parent_id" ) {
      f.options=resp.data.data    
    }
})
   setFormData(formData)
       }
      }
      fetchData()
  },[showForm] );
console.log(formData)
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
    const resp = await apiRequest(formDataToSend, serverUrl + "preference/category ", 'post');
    setShowLoader(false);
    if (resp?.data?.data) {
      setOpenSnackBar(true);
      const data = {
        type: "success",
        message: "Categories added  sucessfully!....",
        open: true
      }

      setSnackBarData(data);
    } else {
      setOpenSnackBar(true);
      const data = {
        type: "error",
        message: 'Categories added failed.',
        open:true
      }
      setSnackBarData(data);
    }
  
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
          Categories
        </Typography>
        {!showForm && (
          <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: '20px', marginBottom:'2rem', float:'right' }}>
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
      {data?.length > 0 ? (
          <GenericTable data={data} columns={columns} onEdit={null} onDelete={null} />
        ) : (
          <Typography variant="h6" align="center" style={{ marginTop: '10rem' }}>
            No data available. Please add new Category.
          </Typography>
        )}
    </Container>
  );
};

export default Categories;
