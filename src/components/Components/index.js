import { Container, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import InputFields from '../ReusableComponents/InputFields'
import { useRef } from 'react';
import { componentsForm } from './model';
import { onChangeValueBind, preparePayLoad } from '../ReusableComponents/CommonFunctions';
import { useDispatch } from 'react-redux';
import { GetStoreData } from '../ReusableComponents/ReduxActions';
import { ComponentsRequest } from '../Redux/Reducer/ComponentsReducer';
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


const Components = () => {
    const ChildRef = useRef()
    const [formData , setFormData] = useState(componentsForm)
    const dispatch = useDispatch();


    const ComponentsData = GetStoreData('CategoriesReducer');
    console.log(ComponentsData, "componentsData");
    const getComponentsData = ComponentsData.componentsData;
    console.log(getComponentsData);


    function submitFormData(){
      const payload = preparePayLoad(formData.fieldsArray);
      alert("called");
      setFormData({ ...formData })
      dispatch(ComponentsRequest(payload));
    }
    function onChange(data){
        onChangeValueBind(formData, data);
    }

  return (
    <>
     <Container  >  
         <div >
         <Typography variant="h4" align="center" style={{ marginTop: "20px" }} gutterBottom>
              Components
            </Typography>
            <Grid item xs={24} sm={16} md={12} lg={13} style={{ marginTop: "20px" }} >
            
         <InputFields ref={ChildRef} modaldata={formData} onChange={onChange} submitFormData={submitFormData} />
        </Grid>
        </div>


        {/* <Row justify="center">
          <Col xs={24} sm={16} md={12} lg={13} style={{ marginTop: "70px" }}>
            <Table>
              <thead>
                <tr>             
                 <th>Title</th>
                 <th>Title</th>
               </tr>
               </thead>
              <tbody>
                 <tr>
                   <td>{ComponentsData.componentsTitle}</td>
                   <td>{ComponentsData.path}</td>
                 </tr>
              </tbody>
            </Table>
          </Col>
         </Row> */}
      <TableContainer >
      <Table>
        <TableHead>
          <TableRow>
          
            <TableCell>Title</TableCell>
            <TableCell>Path</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{ComponentsData.componentsTitle}</TableCell>
            <TableCell>{ComponentsData.path}</TableCell>

          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
        </Container>
    </>
  )
}

export default Components