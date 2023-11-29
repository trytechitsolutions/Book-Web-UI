import React, { forwardRef, useEffect, useImperativeHandle, useState, useCallback, useRef } from 'react';
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
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

const InputFields = forwardRef((props, ref) => {
  const { modaldata, onChange, submitFormData, index } = props;
  const [initialValues, setInitialValues] = useState({});
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [validationMessages, setValidationMessages] = useState({});

  const [inputValue, setInputValue] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);

  const handleInputChange = (name, type, value) => {
    // Handle Autocomplete input
    if (type === 'auto-complete-text') {
      setInputValue(value);
    }

    const field = modaldata.fieldsArray.find((field) => field.name === name);
    // Apply rules validation
    const validationMessages = field?.rules.reduce((messages, rule) => {
      if (rule.required && !value.trim()) {
        messages.push(rule.message || 'This field is required');
      } else if (rule.type === 'email' && !rule.regex.test(value)) {
        messages.push(rule.message || 'Please enter a valid email');
      } else if (rule.type === 'password' && !rule.regex.test(value)) {
        messages.push(rule.message || 'Please enter a valid password');
      } else if (rule.type === 'phonenumber' && !rule.regex.test(value)) {
        messages.push(rule.message || 'Please enter a valid phonenumber');
      } else if (rule.type === 'file' && !rule.regex.test(value)) {
        messages.push(rule.message || 'Please  Upload valid File');
      }
      return messages;
    }, []);
    setValidationMessages((prevMessages) => ({
      ...prevMessages,
      [name]: validationMessages.join(' '), // Combine multiple messages into one string
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (validationMessages.length === 0) {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        [name]: '',
      }));
    }
    console.log(name, type, value, 'onchange****')
    let obj = { name, type, value };
    onChange(obj, index);
  };

  // const handleKeyDown = (event) => {
  //   console.log(event, '**event***input fields****')
  //   if (event.key === 'Enter' && inputValue.trim() !== '') {
  //     setSelectedWords((prevWords) => [...prevWords, inputValue.trim()]);
  //     setInputValue('');
  //   }
  // };
  const ChildRef = useRef();
  const handleKeyDown = (event, name, type, value) => {
    console.log(event.key, '**event***input fields****')
    
    // if ((event.key === 'Enter') && (inputValue !=='')) {
    //   event.preventDefault();  // Prevent form submission
    //   setSelectedWords((prevWords) => [...prevWords, inputValue.trim()]);
    //   setInputValue('');
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     [name]: selectedWords,
    //   }));
    //   let obj = { name, type, value }; // Pass 'file' as the value
    //   // onChange(obj, index);
    //   console.log(formData, '***formData*****')
    //   // ChildRef.current && ChildRef.current.handleKeyDown(event);
    //   // ChildRef.current.handleKeyDown(event);  // Pass the event to InputFields component
    // }
  };
  const handleDelete = (wordToDelete) => {
    setSelectedWords((prevWords) =>
      prevWords.filter((word) => word !== wordToDelete)
    );
  };
  const bindValues = useCallback(() => {
    const initialValues = {};
    modaldata.fieldsArray.forEach((field) => {
      if ((field.name === 'file') && field.value) {
        setImagePreview(field.value);
      }
      initialValues[field.name] = field.value || '';
    });
    setInitialValues(initialValues);
    setFormData(initialValues)
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
                {ele.type === 'auto-complete-text' && (
                  <div>
                    <Autocomplete
                      freeSolo
                      value={inputValue}
                      onChange={(event, newValue) => setInputValue(newValue)}
                      onKeyDown={(e)=> handleKeyDown(e, ele.name, ele.type, e.target.value)}
                      options={[]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={ele.label}
                          variant="outlined"
                          fullWidth
                        />
                      )}
                    />
                    <div style={{ marginTop: 10 }}>
                      {selectedWords.map((word, index) => (
                        <Chip
                          key={index}
                          label={word}
                          onDelete={() => handleDelete(word)}
                          style={{ margin: 4 }}
                        />
                      ))}
                    </div>
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
                            checked={(formData[ele.name] || []).includes(option.value)}
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
                      <InputLabel>{ele.name}</InputLabel>
                      <Select
                        native
                        value={formData[ele.name] || ''}
                        onChange={(e) => handleInputChange(ele.name, ele.type, e.target.value)}
                        label={ele.name}
                      >
                        <option value=""></option>
                        {ele.options.map((option, j) => (
                          <option key={j} value={option.id}>
                            {option.name}
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
                {ele.type === 'file' && (
                  <FormControl fullWidth  >
                    <Input
                      accept=".jpg, .jpeg, .png, .pdf"
                      style={{ display: 'none' }}
                      id={`upload-button-${ele.name}`}
                      type="file"
                      multiple={ele.multiple}
                      onChange={(e) => handleFileChange(ele.name, ele.type, e)}

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
                style={{ marginTop: '10px', ...ele.style }}
                className={ele.style}
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
