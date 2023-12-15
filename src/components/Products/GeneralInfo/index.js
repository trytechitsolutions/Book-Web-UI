import { Container, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './index.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const nodes = [
  {
    value: 'electronics',
    label: 'Electronics',
    children: [
      { value: 'laptops', label: 'Laptops' },
      { value: 'phones', label: 'Phones' },
      {
        value: 'books',
        label: 'Books',
        children: [
          { value: 'entertainment', label: 'Entertainment' },
          { value: 'educational', label: 'Educational' },
        ],
      },,
      { value: 'dress', label: 'Dress' },
    ],
  },
];
const GeneralInfo = ({ inputData, onUpdate }) => {
  // console.log(inputData, '***inputData')
  const [brandDialogOpen, setBrandDialogOpen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const description = JSON.stringify(rawContentState);
    handleFormChange('description', description);
  };

  const [formData, setFormData] = useState({
    product_name: inputData?.product_name || '' ,
    brand_id: inputData?.brand_id || '' ,
    unit: inputData?.unit || '' ,
    weight: inputData?.weight || '' ,
    min_purchase_qty: inputData?.min_purchase_qty || '' ,
    barcode: inputData?.barcode || '' ,
    product_category: inputData?.product_category || '' ,
    product_summary: inputData?.product_summary  || '' ,
    description: inputData?.description || '' ,
  });

  const handleFormChange = (field, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value,
    }));

    // Update parent component with the changed data
    onUpdate({ ...formData, [field]: value });
  };

  useEffect(()=>{
    onUpdate(formData);
  }, [formData, onUpdate])

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
    const handleCategoryChange = (checkedCategories) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        productCategory: checkedCategories,
      }));
    }
  return (
    <Container >
    <Typography variant="h5" align="center" gutterBottom>
      General Info
    </Typography>
    <form className='container'>
           <Grid container spacing={2} >  
           <Grid item xs={12} sm={12}>
           <InputLabel >Product Name</InputLabel>
            <TextField
              fullWidth
              name="product_name"
              placeholder="write product name"
              variant="outlined"
              value={formData.product_name}
              onChange={(e) => handleFormChange('product_name', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Brand</InputLabel>
            <TextField
              fullWidth
              name="brand_id"
              placeholder="unit (e.g KG etc )"
              variant="outlined"
              value={formData.brand_id}
              onChange={(e) => handleFormChange('brand_id', e.target.value)}
            />
            {/* <Select
              fullWidth
              label="Brand"
               name="brand_id"
               value={formData.brand_id}
              onClick={() => setBrandDialogOpen(true)}
                variant="outlined"
            >
           {brandsData.map((brand) => (
         <MenuItem key={brand.id} value={brand.id}>
           {brand.name}
         </MenuItem>
            ))}
             </Select> */}
          </Grid>

          <Grid item xs={6} sm={6}>
          <InputLabel >Unit </InputLabel>
            <TextField
              fullWidth
              name="unit"
              placeholder="unit (e.g KG etc )"
              variant="outlined"
              value={formData.unit}
              onChange={(e) => handleFormChange('unit', e.target.value)}
            />
        </Grid> 
        <Grid item xs={6} sm={6}>
        <InputLabel >Weight</InputLabel>
            <TextField
              fullWidth
              name="weight"
              placeholder="0.00"
              variant="outlined"
              value={formData.weight}
              onChange={(e) => handleFormChange('weight', e.target.value)}
            />
        </Grid>
        <Grid item xs={6} sm={6}>
        <InputLabel >Minimum Purchase Qty</InputLabel>
            <TextField
              fullWidth
              name="min_purchase_qty"
              placeholder="1"
              variant="outlined"
              value={formData.min_purchase_qty}
              onChange={(e) => handleFormChange('min_purchase_qty', e.target.value)}
              required
            />
        </Grid>    
        <Grid item xs={6} sm={6}>
        <InputLabel >Barcode</InputLabel>
            <TextField
              fullWidth
              name="barcode"
              placeholder="Barcode"
              variant="outlined"
              value={formData.barcode}
              onChange={(e) => handleFormChange('barcode', e.target.value)}
            />
        </Grid> 
        <Grid item xs={6} sm={6}>
        <InputLabel >Category</InputLabel>
            <TextField
              fullWidth
              name="product_category"
              placeholder="productCategory"
              variant="outlined"
              value={formData.product_category}
              onChange={(e) => handleFormChange('product_category', e.target.value)}
            />
        </Grid> 
        <Grid item xs={6} sm={6}>
        <InputLabel >Product Summary</InputLabel>
            <TextField
              fullWidth
              name="product_summary"
               variant="outlined"
              value={formData.product_summary}
              onChange={(e) => handleFormChange('product_summary', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
      <InputLabel>Description</InputLabel>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </Grid>
          {/* <Grid item xs={12} sm={12}>
          <FormControl fullWidth variant="outlined">
            <TextField
              label="Description"
              name="Description"
              multiline
              rows={4}
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Grid> */}
          </Grid>
          </form>
          </Container>
  )
}

export default GeneralInfo ;