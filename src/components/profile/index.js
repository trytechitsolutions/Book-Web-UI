import React, { useEffect, useRef, useState } from 'react'
import { profileForm } from './model';
import { useDispatch } from 'react-redux';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { Container, Grid, Typography } from '@mui/material';
import InputFields from '../ReusableComponents/InputFields';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import { profileRequest } from '../Redux/Reducer/ProfileReducer';



const Profile = () => {
  const ChildRef   = useRef();
      const [formData, setFormData] = useState(profileForm);
      const dispatch = useDispatch();
      const [data, setData] = useState([]);
      const [showForm, setShowForm] = useState(false);

      const profileData = GetStoreData('ProfileReducer')?.profileData;

      useEffect(() => {
        // Fetch data from the Redux store once when the component mounts
        setData(profileData);
      }, [profileData]);

      function submitFormData() {
        const payload = preparePayLoad(formData.fieldsArray);
        setFormData({ ...formData });
        dispatch(profileRequest(payload));
        setShowForm(false); // Hide the form after submission
      }
   
    
      function onChange(data) {
        onChangeValueBind(formData, data);
      }



  return (
    <>
    <Container >  
         <div >
       <Typography variant="h4" align="center" style={{ marginTop: "20px" }} gutterBottom>
                Profile
            </Typography>
            <Grid xs={24} sm={16} md={12} lg={13} style={{ marginTop: "20px" }} >
        <InputFields ref={ChildRef} modaldata={formData} onChange={onChange} submitFormData={submitFormData} />
        </Grid>
        </div>
        </Container>
    </>  
  )
}

export default Profile ;