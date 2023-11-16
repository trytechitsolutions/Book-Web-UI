import React, { useRef, useState } from 'react'
import { roleForm } from './model';
import { useDispatch } from 'react-redux';
import { RolesRequest } from '../Redux/Reducer/RolesReducer';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions'
import { GetStoreData } from '../ReusableComponents/ReduxActions'
import { Container, Grid, Typography } from '@mui/material';
import InputFields from '../ReusableComponents/InputFields';
import styled from 'styled-components';
import {  TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';




const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th, td {
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;


const Roles = () => {
    const ChildRef   = useRef();
    const [formData, setFormData] = useState(roleForm);
    const dispatch = useDispatch();

    const RolesData = GetStoreData('CategoriesReducer');
    console.log(RolesData, "rolesData");
    const getRolesData = RolesData.rolesData;
    console.log(getRolesData);
    
function submitFormData(){
  const payload = preparePayLoad(formData.fieldsArray);
  alert("called");
  setFormData({ ...formData })
  dispatch(RolesRequest(payload));

}
function onChange(data){
  onChangeValueBind(formData, data);   
}


return (
    <>
    <Container maxWidth="sm" >  
         <div >
         <Typography variant="h4" align="center" style={{ marginTop: "20px" }} gutterBottom>
              Roles
            </Typography>
            <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: "20px" }} >
            
         <InputFields ref={ChildRef} modaldata={formData} onChange={onChange} submitFormData={submitFormData} />
        </Grid>
        </div>

        <TableContainer >
      <Table>
        <TableHead>
          <TableRow>
          
            <TableCell>Roles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{RolesData.role}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
        </Container>
    </>
  )
}

export default Roles ;