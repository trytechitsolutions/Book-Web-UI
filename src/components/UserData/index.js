import React, { useEffect, useState } from 'react'
import GenericTable from '../common/GenericDataTable'
import { Container, Typography } from '@mui/material';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import { apiRequest } from '../../services/api';
import * as securedLocalStorage from '../../services/secureLocalStorage';
import { mapValuesToForm } from '../ReusableComponents/CommonFunctions';
import { userForm } from '../UserSignUp/mode';




const Users = () => {
    const [data, setData] = useState([]);
    const userData = GetStoreData('UserSignUpReducer')?.userData;
    const serverUrl = securedLocalStorage.baseUrl;
    const [showLoader, setShowLoader] = React.useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(userForm);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [snackBarData, setSnackBarData] = React.useState();
    const [selectedId, setSelectedId] = React.useState(null)



    const columns = [
        { id: 'first_name', label: 'first_name' },
        { id: 'last_name', label: 'last_name' },
        { id: 'email', label: 'email' },
        { id: 'contact_number', label: 'contact_number' },
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

      const onDelete = async (id) => {
        const resp = await apiRequest(null, serverUrl + "/preference/users/"+id, 'delete');
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
          View Customers
        </Typography>
        <GenericTable data={data} columns={columns} onEdit={onEdit} onDelete={onDelete} />
    </div>
    </Container>

  )
}

export default Users