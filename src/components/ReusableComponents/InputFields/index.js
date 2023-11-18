import React, { forwardRef, useEffect, useImperativeHandle, useState, useCallback } from 'react';
import {
  TextField,
  TextareaAutosize,
  Button,
  Checkbox,
  Select,
  Radio,
  InputLabel,
  FormControl,
  InputAdornment,
  Input as MaterialInput,
  Container,
  Grid,
  Typography,
  FormControlLabel,
  Input,
  RadioGroup,
  FormLabel,
  FormGroup,
} from '@mui/material';
  



import {
  AccountCircle,
  Lock,
  Phone,
  CloudUpload,
  AccountBalance,
} from '@mui/icons-material';
import './index.css';
import { validateField } from '../CommonFunctions';

const InputFields = forwardRef((props, ref) => {
  const { modaldata, onChange, submitFormData, index } = props;
  const [initialValues, setInitialValues] = useState({});
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [validationMessages, setValidationMessages] = useState({});

  const handleInputChange = (name, type, value) => {
    // Update the form data without immediate validation
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Clear the validation message for the current field
    setValidationMessages((prevMessages) => ({
      ...prevMessages,
      [name]: '',
    }));
    let obj = { name, type, value };
    onChange(obj, index);
  };
  



// console.log(props, '****props***')
  const bindValues = useCallback(() => {
    const initialValues = {};
    modaldata.fieldsArray.forEach((field) => {
      initialValues[field.name] = field.value || '';
    });
    setInitialValues(initialValues);
  }, [modaldata.fieldsArray]);

  useImperativeHandle(ref, () => ({
    reSetForm,
    handlButton,
    bindValues,
  }));

  const reSetForm = () => {
    setFormData(initialValues);
  };



  const handleFileChange = (name, type, e) => {
    const file = e.target.files[0];
    // Handle the selected file, you may want to upload it to a server or process it in some way
    setFormData({
      ...formData,
      [name]: file, // Update the form data with the selected file
    });
  
    setSelectedFile(file);
  
    // Create a preview URL for the selected file
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    } else {
      // Clear the preview if no file is selected
      setImagePreview(null);
    }
    setValidationMessages((prevMessages) => ({
      ...prevMessages,
      [name]: '', // Clear the validation message for the current field
    }));
    // Pass the correct values to the onChange function
    let obj = { name, type, value: file }; // Pass 'file' as the value
    onChange(obj, index);
  };
  

  const validateForm = () => {
    // Iterate through form data and perform validation
    const updatedFormData = { ...formData };
    const updatedValidationMessages = {};

    modaldata.fieldsArray.forEach((field) => {
      const fieldRules = field.rules || [];
      const validationResult = validateField(updatedFormData[field.name], fieldRules);

      if (!validationResult.isValid) {
        // Set the validation message for the current field
        updatedValidationMessages[field.name] = validationResult.message;
      }
    });

    if (Object.keys(updatedValidationMessages).length === 0) {
      // If there are no validation messages, the form is valid
      submitFormData(updatedFormData);
    } else {
      // If there are validation messages, update the state to display them
      setValidationMessages(updatedValidationMessages);
    }
  };

  const handlButton = (name) => {
    if (name.toLowerCase() === 'submit') {
      validateForm();
    } else if (name.toLowerCase() === 'reset') {
      reSetForm();
    }
  };



  //checkbox

  const handleCheckboxChange = (name, optionValue, checked) => {
    // If formData[name] doesn't exist, create it as an empty array
    formData[name] = formData[name] || [];

    if (checked) {
      // Add the checked option to the array
      formData[name].push(optionValue);
    } else {
      // Remove the unchecked option from the array
      formData[name] = formData[name].filter((value) => value !== optionValue);
    }

    // Call your general handleInputChange function
    // handleInputChange(name, formData[name]);
  };

  //checkbox

  useEffect(() => {
    bindValues();
  }, [bindValues])

  return (
    <Container>
      {modaldata.fieldsArray &&
        <form>
          <Grid container spacing={2}>
            {modaldata.fieldsArray.map((ele, i) => (
              <Grid item xs={ele.xs} sm={ele.sm} md={ele.md} lg={ele.lg} key={i}>
                {/* <Grid item xs={12} sm={6} md={4} lg={3} key={i}> */}
             {ele.type === 'text' && (
                <div>
                  <TextField
                    label={ele.label}
                    name={ele.name}
                    fullWidth
                    variant='outlined'
                    value={formData[ele.name] || ''}
                    onChange={(e) => handleInputChange(ele.name, ele.type, e.target.value)}
                    required={ele.required}
                  />
                  {validationMessages[ele.name] && (
                    <Typography variant="caption" color="error">
                      {validationMessages[ele.name]}
                    </Typography>
                  )}
                </div>
              )}
 
             {ele.type === 'text-area' && (
              <div>
              <TextField
                 label={ele.label}
                 name={ele.name}
                 fullWidth
                 variant='outlined'
                 multiline
                 minRows={2}
                //  maxRows={8}
                 placeholder={ele.label}
                 value={formData[ele.name] || ''}
                 onChange={(e) => handleInputChange(ele.name, ele.type, e.target.value)}
                 required={ele.required}
              />
              {validationMessages[ele.name] && (
              <Typography variant="caption" color="error">
               {validationMessages[ele.name]}
              </Typography>
                 )}
               </div>
               )}
                {ele.type === 'email' && (
                 <div>
               <TextField
              label={ele.label}
              fullWidth
              variant='outlined'
               placeholder={ele.placeholder}
                InputProps={{
                 startAdornment: (
                 <InputAdornment position="start">
                 <AccountCircle />
                </InputAdornment>
                ),
                }}
                 value={formData[ele.name] || ''}
                  onChange={(e) => handleInputChange(ele.name, ele.type, e.target.value)}
                 required={ele.required}
                  />
                  {validationMessages[ele.name] && (
                   <Typography variant="caption" color="error">
                    {validationMessages[ele.name]}
                  </Typography>
                   )}
                </div>
                    )}
          {ele.type === 'password' && (
            <div>
               <TextField
               label={ele.label}
               name={ele.name}
               fullWidth
               variant='outlined'
               type='password'
               value={formData[ele.name] || ''}
               onChange={(e) => handleInputChange(ele.name, ele.type, e.target.value)}
               required={ele.required}
             />
             {validationMessages[ele.name] && (
             <Typography variant="caption" color="error">
              {validationMessages[ele.name]}
             </Typography>
                )}
               </div>
               )}
              {ele.type === 'number' && (
               <div>
                <TextField
                  label={ele.label}
                  fullWidth
                  type="number"
                  placeholder={ele.placeholder}
                  value={formData[ele.name] || ''}
                 onChange={(e) => handleInputChange(ele.name, ele.type, e.target.value)}
                  required={ele.required}
                  />
                {validationMessages[ele.name] && (
                 <Typography variant="caption" color="error">
                    {validationMessages[ele.name]}
                 </Typography>
                  )}
                </div>
                 )}
                {ele.type === 'phonenumber' && (
                <div>
                 <TextField
                  label={ele.label}
                   fullWidth
                   type="number" // 'tel' type is often used for phone numbers
                   placeholder={ele.placeholder}
                   InputProps={{
                   startAdornment: (
                 <InputAdornment position="start">
                    <Phone />
                 </InputAdornment>
                   ),
                }}
                 value={formData[ele.name] || ''}
                 onChange={(e) => handleInputChange(ele.name, ele.type, e.target.value)}
                 required={ele.required}
                 />
                 {validationMessages[ele.name] && (
                 <Typography variant="caption" color="error">
                  {validationMessages[ele.name]}
                 </Typography>
                )}
               </div>
               )}
                {ele.type === 'accountnumber' && (
                  <TextField
                    label={ele.label}
                    fullWidth
                    type="number"
                    placeholder={ele.placeholder}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountBalance />
                        </InputAdornment>
                      ),
                    }}
                    value={formData[ele.name] || ''}
                    onChange={(e) => handleInputChange(ele.name, e.target.value)}
                    required={ele.required}
                  />
                )}
                {ele.type === 'date' && (
                  <TextField
                    label={ele.label}
                    fullWidth
                    type="date"
                    value={formData[ele.name] || ''}
                    onChange={(e) => handleInputChange(ele.name, e.target.value)}
                    required={ele.required}
                  />
                )}
                {ele.type === 'checkbox' && (
                  <FormControl>
                    <InputLabel>
                      {ele.label}
                      {ele.rules[0].required && (
                        <span style={{ color: 'red' }}>*</span>
                      )}
                    </InputLabel>
                    {ele.options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={formData[ele.name] && formData[ele.name].includes(option.value)}
                            onChange={(e) => handleCheckboxChange(ele.name, option.value, e.target.checked)}
                          />
                        }
                        label={option.label}
                      />
                    ))}
                  </FormControl>
                )}
               {ele.type === 'dropdown' && (
                 <div>
                 <FormControl fullWidth variant='outlined'>
                 <InputLabel>{ele.label}</InputLabel>
                     <Select
                       native
                       value={formData[ele.name] || ''}
                       onChange={(e) => handleInputChange(ele.name, ele.type, e.target.value)}
                       label={ele.label}
                      >
                  <option value=""></option>
                   {ele.options.map((option, j) => (
                  <option key={j} value={option.id}>
                   {option.value}
                  </option>
                 ))}
                  </Select>
                  {validationMessages[ele.name] && (
                    <Typography variant="caption" color="error">
                       {validationMessages[ele.name]}
                    </Typography>
                   )}
                 </FormControl>
                    </div>
                 )}

                {ele.type === 'day' && (
                  <FormControl fullWidth>
                    <InputLabel>{ele.label}</InputLabel>
                    <Select
                      native
                      value={formData[ele.name] || ''}
                      onChange={(e) => handleInputChange(ele.name, e.target.value)}
                      required={ele.required}
                    >
                      <option value=""></option>
                      {ele.options.map((option, j) => (
                        <option key={j} value={option.id}>
                          {option.value}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                )}
                {ele.type === 'time' && (
                  <FormControl fullWidth>
                    <InputLabel>{ele.label}</InputLabel>
                    <Select
                      native
                      value={formData[ele.name] || ''}
                      onChange={(e) => handleInputChange(ele.name, e.target.value)}
                    >
                      <option value=""></option>
                      {ele.options.map((option, j) => (
                        <option key={j} value={option.id}>
                          {option.value}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                )}
                {ele.type === 'radio' && (
                  <FormControl component="fieldset">
                    <FormLabel component="legend">{ele.label}</FormLabel>
                    <RadioGroup
                      name={ele.name}
                      value={formData[ele.name] || ''} // The value should be the selected option's value
                      onChange={(e) => handleInputChange(ele.name, e.target.value)} row
                    >
                      {ele.options.map((option, j) => (
                        <FormControlLabel
                          key={j}
                          value={option.value} // Use the value, not the ID
                          control={<Radio />}
                          label={option.label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
               {/* {ele.type === 'checkbox' && (
                <FormControl component="fieldset">
                 <FormLabel component="legend">{ele.label}</FormLabel>
                <FormGroup>
                  {ele.options.map((option, j) => (
                    <FormControlLabel
                    key={j}
                  control={
                  <Checkbox
                checked={formData[ele.name] && formData[ele.name].includes(option.value)}
              onChange={(e) => handleCheckboxChange(ele.name, option.value, e.target.checked)}
            />
          }
          label={option.label}
        />
      ))}
    </FormGroup>
  </FormControl>
)} */}

                {ele.type === 'file' && (
                  <FormControl fullWidth  >
                    <Input
                      accept=".jpg, .jpeg, .png, .pdf"
                      style={{ display: 'none' }}
                      id={`upload-button-${ele.name}`}
                      type="file"
                      multiple={ele.multiple}
                      onChange={(e)=>handleFileChange(ele.name, ele.type, e)}

                    />
                    {validationMessages[ele.name] && (
                    <Typography variant="caption" color="error">
                      {validationMessages[ele.name]}
                    </Typography>
                  )}
                    <label htmlFor={`upload-button-${ele.name}`}>
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<CloudUpload />}
                      >
                        {ele.label}
                      </Button>
                    </label>
                    <Typography>preview</Typography>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Image Preview"
                        style={{ width: '200px', height: '200px' }}
                      />

                    )}
                  </FormControl>
                )}
               
              </Grid>
            ))}
          </Grid>
        </form>
      }

      {modaldata?.buttonSecction?.buttons?.length > 0 && (
        <Grid container spacing={2} justifyContent={modaldata.buttonSecction.justify}>
          {modaldata.buttonSecction.buttons.map((ele, i) => (
            <Grid item key={i}>
              <Button
                variant={ele.type}
                disabled={ele.loading}
                onClick={() => handlButton(ele.fun)}
                style={ele.style}
              >
                {ele.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
});

export default InputFields;
