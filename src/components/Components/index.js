import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import InputFields from '../ReusableComponents/InputFields';
import { componentsForm } from './model';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import { ComponentsRequest } from '../Redux/Reducer/ComponentsReducer';
import GenericTable from '../common/GenericDataTable';

const Components = () => {
  const ChildRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(componentsForm);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const columns = [
    { id: 'title', label: 'Title' },
    { id: 'path', label: 'Path' },
    { id: 'is_active', label: 'Status' }
  ];

  const componentsData = GetStoreData('ComponentsReducer')?.componentsData;

  useEffect(() => {
    // Fetch data from the Redux store once when the component mounts
    setData(componentsData);
  }, [componentsData]);

  function submitFormData() {
    const payload = preparePayLoad(formData.fieldsArray);
    setFormData({ ...formData });
    dispatch(ComponentsRequest(payload));
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
          <GenericTable data={data} columns={columns} onEdit={null} onDelete={null} />
        ) : (
          <Typography variant="h6" align="center" style={{ marginTop: '10rem' }}>
            No data available. Please add new items.
          </Typography>
        )}
    </Container>
  );
};

export default Components;
