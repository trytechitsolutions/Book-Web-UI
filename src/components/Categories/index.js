import React, { useRef, useState } from 'react'
import { categoryForm } from './model';
import { Container, Grid, Typography } from '@mui/material';
import InputFields from '../ReusableComponents/InputFields';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
import { categoriesRequest } from '../Redux/Reducer/CategoriesReducer';
import { GetStoreData } from '../ReusableComponents/ReduxActions';

const Categories = () => {
    const ChildRef   = useRef();
    const [formData, setFormData] = useState(categoryForm);
    const dispatch = useDispatch();

    const CategoriesData = GetStoreData('CategoriesReducer');
    console.log(CategoriesData, "categoriesData");
    const getCategoriesData = CategoriesData.categoriesData;
    console.log(getCategoriesData);

    function submitFormData() {
        const payload = preparePayLoad(formData.fieldsArray);
        alert("called");
        setFormData({ ...formData })
        dispatch(categoriesRequest(payload));

      }
      function onChange(data) {
        onChangeValueBind(formData, data);

      }
    
  return (
    <>
    <Container maxWidth="sm" >  
         <div >
         <Typography variant="h4" align="center" style={{ marginTop: "20px" }} gutterBottom>
              Categories
            </Typography>
            <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: "20px" }} >
            
         <InputFields ref={ChildRef} modaldata={formData} onChange={onChange} submitFormData={submitFormData} />
        </Grid>
        </div>
        </Container>
    </>
  )
}

export default Categories