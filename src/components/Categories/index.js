import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import InputFields from '../ReusableComponents/InputFields';
import { categoriesForm } from './model';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import GenericTable from '../common/GenericDataTable';
import { CategoriesRequest } from '../Redux/Reducer/CategoriesReducer';

const Categories = () => {
  const ChildRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(categoriesForm);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const columns = [
    { id: 'title', label: 'Title' },
    { id: 'parentCategory', label: 'Parent Category' },
    { id: 'uploadFile', label: 'Files' },

  ];

  const categoriesData = GetStoreData('CategoriesReducer')?.categoriesData;

  useEffect(() => {
    // Fetch data from the Redux store once when the component mounts
    setData(categoriesData);
  }, [categoriesData]);

  function submitFormData() {
    const payload = preparePayLoad(formData.fieldsArray);
    const isFileExist = formData.fieldsArray.filter((f)=> f.type==="file");
    if(isFileExist){
    payload.file = isFileExist[0]?.value;
    setFormData({ ...formData });
    }
    dispatch(CategoriesRequest(payload));
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
