import React, { useEffect, useRef, useState } from 'react' ;
import { Container, Grid, Typography, Button } from '@mui/material';
import InputFields from '../ReusableComponents/InputFields';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { userForm } from './mode';
import { useDispatch } from 'react-redux';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import { userRequest } from '../Redux/Reducer/UserSignUpReducer';
import { apiRequest } from '../../services/api';
import * as securedLocalStorage from '../../services/secureLocalStorage';
import SnackbarView from '../common/SnackBar';
import Loader from '../common/Loader';



const UserSignUp = () => {
    const ChildRef = useRef();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(userForm);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const serverUrl = securedLocalStorage.baseUrl;
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [snackBarData, setSnackBarData] = React.useState();
    const [showLoader, setShowLoader] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(null)
    const userData = GetStoreData('UserSignUpReducer')?.userData;
    
    useEffect(() => {
      // Fetch data from the Redux store once when the component mounts
      setData(userData);
    }, [userData]);

    const submitFormData = async () => {
      const payload = preparePayLoad(formData.fieldsArray);
      console.log('payload', payload);   
      const resp = await apiRequest(payload, serverUrl + "preference/user_sign_up" , 'post' );
      setShowLoader(false);
      if (resp?.data?.data) {
        setOpenSnackBar(true);
        const data = {
          type: "success",
          message: "signUp   sucessfully!....",
          open: true
        }
        setSnackBarData(data);
        setShowForm(false);
       } else {
        setOpenSnackBar(true);
        const data = {
          type: "error",
          message: 'signUp failed.',
          open:true
        }
        setSnackBarData(data);
      }
    }
    function onChange(data) {
        onChangeValueBind(formData, data);
     }
     const closeSnakBar = () => {
      setOpenSnackBar(false)
    }
  return (
    <Container maxWidth="sm">
    <div>
        <Typography variant="h4" align="center" style={{ marginTop: '20px' }} gutterBottom>
          Create Account
        </Typography>
          <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: '20px' }}>
            <InputFields ref={ChildRef} modaldata={formData} onChange={onChange} submitFormData={submitFormData} />         
          </Grid>
          {openSnackBar && <SnackbarView {...snackBarData} onClose={closeSnakBar}/> }
        {showLoader &&
          <Loader />
        }
    </div>
    </Container>
  )
}

export default UserSignUp ;