import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import InputFields from '../ReusableComponents/InputFields';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import GenericTable from '../common/GenericDataTable';
import { RolesRequest } from '../Redux/Reducer/RolesReducer';
import { rolesForm } from './model';

const Roles = () => {
  const ChildRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(rolesForm);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const columns = [
    { id: 'role', label: 'Role' },
    { id :'is_active', label:'Status'}
  ];

const rolesData = GetStoreData('RolesReducer')?.rolesData;


const onEdit = (data) =>{
  console.log(data)
}

  useEffect(() => {
    // Fetch data from the Redux store once when the component mounts
    setData(rolesData);
  }, [rolesData]);

  function submitFormData() {
    const payload = preparePayLoad(formData.fieldsArray);
    setFormData({ ...formData });
    dispatch(RolesRequest(payload));
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
        Role
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
          <GenericTable data={data} columns={columns} onEdit={onEdit} onDelete={null} />
        ) : (
          <Typography variant="h6" align="center" style={{ marginTop: '10rem' }}>
            No data available. Please add new items.
          </Typography>
        )}
    </Container>
  );
};

export default Roles;
