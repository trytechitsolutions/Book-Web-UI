import React, { useEffect, useRef, useState } from 'react'
import GenericTable from '../common/GenericDataTable'
import { Container, Grid, Typography } from '@mui/material';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import { apiRequest } from '../../services/api';
import * as securedLocalStorage from '../../services/secureLocalStorage';
import { userDataEditForm } from '../CustomerUserSignUp/mode';
import { mapValuesToForm, onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import InputFields from '../ReusableComponents/InputFields';




const Users = () => {
  const ChildRef = useRef();
  const [data, setData] = useState([]);
  const userData = GetStoreData('UserSignUpReducer')?.userData;
  const serverUrl = securedLocalStorage.baseUrl;
  const [showLoader, setShowLoader] = React.useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(userDataEditForm);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarData, setSnackBarData] = React.useState();
  const [selectedId, setSelectedId] = React.useState(null)



  const columns = [
    { id: 'first_name', label: 'First Name' },
    { id: 'last_name', label: 'Last Name' },
    { id: 'email', label: 'Email' },
    { id: 'contact_number', label: 'Contact Number' },
    // { id: 'is_active', label: 'Status' },
  ];


  useEffect(() => {
    // Fetch data from the Redux store once when the component mounts
    async function fetchData() {
      const resp = await apiRequest(null, serverUrl + "preference/users", 'get');
      setShowLoader(false);
      if (resp?.data?.data) {
        setData(resp.data.data);
      }
    }
    fetchData()
  }, [showForm]);

  const onEdit = (id) => {
    setSelectedId(id);
    const selectedRecord = data.find((d) => d.id === id);
    const updateForm = mapValuesToForm(selectedRecord, formData);
    setFormData((prevFormData) => {
      return updateForm;
    });
    setShowForm(true);
  }
  const submitFormData = async () => {
    const payload = preparePayLoad(formData.fieldsArray);
    if(selectedId){
      payload.id = selectedId;
    }
    const resp = await apiRequest(payload, serverUrl + "preference/users", 'post');
    setShowLoader(false);
    if (resp?.data?.data) {
      setOpenSnackBar(true);
      const data = {
        type: "success",
        message: "User Data added sucessfully!....",
        open: true
      }
      setSelectedId(null);
      setSnackBarData(data);
      setShowForm(false);
    } else {
      setOpenSnackBar(true);
      const data = {
        type: "error",
        message: 'User data operation failed.',
        open: true
      }
      setSnackBarData(data);
    }
  }
  function onChange(data) {
    onChangeValueBind(formData, data);
  }
  const onDelete = async (id) => {
    const resp = await apiRequest(null, serverUrl + "/preference/users/" + id, 'delete');
    setShowLoader(false);
    if (resp?.data?.data) {
      setOpenSnackBar(true);
      const data = {
        type: "success",
        message: "user added  sucessfully!....",
        open: true
      }
      setSelectedId(null)
      setSnackBarData(data);
      setShowForm(false); // Hide the form after submission

    } else {
      setOpenSnackBar(true);
      const data = {
        type: "error",
        message: 'user added failed.',
        open: true
      }
      setSnackBarData(data);
    }

  }
  return (
    <Container>
      <div>
        <Typography variant="h4" align="center" style={{ marginTop: '20px' }} gutterBottom>
          Customers
        </Typography>
        {showForm && <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: '20px' }}>
          <InputFields ref={ChildRef} modaldata={formData} onChange={onChange} submitFormData={submitFormData} />
        </Grid>}
        {!showForm && <GenericTable data={data} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        }
      </div>
    </Container>

  )
}

export default Users