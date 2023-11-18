import React, { useEffect, useState, useRef } from 'react';
// import { Col, Row, Button, Card } from 'antd';
import { part2, storeForm } from './model';
import InputFields from '../ReusableComponents/InputFields';
import { Container, Grid, Typography } from '@mui/material';
// import { onChangeValueBind, preparePayLoad, getErrorMsg, upDateForm } from '../ReusableComponents/CoomonFunctions';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { onChangeValueBind } from '../ReusableComponents/CommonFunctions';


const StoreFrom = () => {
  const ChildRef = useRef();
  // const [formData, setFormData] = useState(storeForm);
  const [expanded, setExpanded] = React.useState('panel1');




 //accordion
 const handleChange = (panel) => (event, newExpanded) => {
  setExpanded(newExpanded ? panel : false);
};
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  //accordion 
  function onChange1(data) {
    onChangeValueBind(storeForm, data);
}

function onChange2(data) {
    onChangeValueBind(part2, data);
}


function submit() {
    ChildRef.current.handlButton("submit");
}
  function submitFormData() {
    console.log(storeForm)
    console.log(part2)
}
   function resetForm(){

   }
  

  return (

    <>
      <Container maxWidth="lg">
        <div >
          <Typography variant="h4" align="center" style={{ marginTop: "50px" }} gutterBottom>
            Store Details Form
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={9} style={{ marginTop: "70px" }} >
              <InputFields ref={ChildRef} modaldata={storeForm} onChange={onChange1} submitFormData={submitFormData} />
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{ marginTop: "30px" }}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography> Add Timings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <InputFields ref={ChildRef} modaldata={part2} onChange={onChange2} submitFormData={submitFormData} />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Grid item xs={9}  align="end" style={{ marginTop: "20px" }}>
      <button type="primary" onClick={submit} style={{ marginRight:"10px" , marginBottom:"90px" }}>Add</button>
      <button type="primary" onClick={resetForm}>Clear </button>
      </Grid>
          </Grid>
          </Grid>
        </div>
      </Container>
    </>
  )
}

export default StoreFrom;
