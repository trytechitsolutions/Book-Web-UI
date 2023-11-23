import React, { useEffect, useState } from 'react'
import GenericTable from '../common/GenericDataTable'
import { Container, Typography } from '@mui/material';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import { apiRequest } from '../../services/api';
import * as securedLocalStorage from '../../services/secureLocalStorage';
import { userForm } from '../CustomerUserSignUp/mode';




const Users = () => {
    const [data, setData] = useState([]);
    const userData = GetStoreData('UserSignUpReducer')?.userData;
    const serverUrl = securedLocalStorage.baseUrl;
    const [showLoader, setShowLoader] = React.useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(userForm);



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
          const resp = await apiRequest(null, serverUrl + "preference/user_sign_up", 'get');
          setShowLoader(false);
          if (resp?.data?.data) {
            setData(resp.data.data);
          }
        }
        fetchData()
      }, [showForm]);
  return (
    <Container>   
     <div>
     <Typography variant="h4" align="center" style={{ marginTop: '20px' }} gutterBottom>
          View Customers
        </Typography>
        <GenericTable data={data} columns={columns} onEdit={null} onDelete={null} />
    </div>
    </Container>

  )
}

export default Users