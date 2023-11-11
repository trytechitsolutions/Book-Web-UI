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
} from '@mui/material';
import {
  AccountCircle,
  Lock,
  Phone,
  CloudUpload,
  AccountBalance,
} from '@mui/icons-material';
import './index.css';

const InputFields = forwardRef((props, ref) => {
  const { modaldata, onChange, submitFormData, index } = props;
  const [initialValues, setInitialValues] = useState({});
  const [formData, setFormData] = useState({});
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

  const handleInputChange = (name, value) => {
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    onChange(updatedFormData, index);
  };

  const validateForm = () => {
    submitFormData(formData);
  };

  const handlButton = (name) => {
    if (name.toLowerCase() === 'submit') {
      validateForm();
    } else if (name.toLowerCase() === 'reset') {
      reSetForm();
    }
  };

  useEffect(() => {
    bindValues();
  }, [bindValues])

  return (
    <Container>
      {modaldata.fieldsArray &&
        <form>
          <Grid container spacing={2}>
            {modaldata.fieldsArray.map((ele, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                {ele.type === 'text' && (
                  <TextField
                    label={ele.label}
                    fullWidth
                    placeholder={ele.placeholder}
                    value={formData[ele.name] || ''}
                    onChange={(e) => handleInputChange(ele.name, e.target.value)}
                  />
                )}
                {ele.type === 'text-area' && (
                  <TextareaAutosize
                    minRows={4}
                    maxRows={8}
                    placeholder={ele.placeholder}
                    value={formData[ele.name] || ''}
                    onChange={(e) => handleInputChange(ele.name, e.target.value)}
                  />
                )}
                {ele.type === 'email' && (
                  <TextField
                    label={ele.label}
                    fullWidth
                    placeholder={ele.placeholder}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    value={formData[ele.name] || ''}
                    onChange={(e) => handleInputChange(ele.name, e.target.value)}
                  />
                )}
                {ele.type === 'password' && (
                  <TextField
                    label={ele.label}
                    fullWidth
                    type="password"
                    placeholder={ele.placeholder}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                    value={formData[ele.name] || ''}
                    onChange={(e) => handleInputChange(ele.name, e.target.value)}
                  />
                )}
                {ele.type === 'number' && (
                  <TextField
                    label={ele.label}
                    fullWidth
                    type="number"
                    placeholder={ele.placeholder}
                    value={formData[ele.name] || ''}
                    onChange={(e) => handleInputChange(ele.name, e.target.value)}
                  />
                )}
                {ele.type === 'phonenumber' && (
                  <TextField
                    label={ele.label}
                    fullWidth
                    type="number"
                    placeholder={ele.placeholder}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                    value={formData[ele.name] || ''}
                    onChange={(e) => handleInputChange(ele.name, e.target.value)}
                  />
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
                  />
                )}
                {ele.type === 'date' && (
                  <TextField
                    label={ele.label}
                    fullWidth
                    type="date"
                    value={formData[ele.name] || ''}
                    onChange={(e) => handleInputChange(ele.name, e.target.value)}
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
                    <Checkbox
                      checked={formData[ele.name] || false}
                      onChange={(e) => handleInputChange(ele.name, e.target.checked)}
                    />
                  </FormControl>
                )}
                {ele.type === 'dropdown' && (
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
                onChange={(e) => handleInputChange(ele.name, e.target.value)}  row
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
                   <FormControl fullWidth>
                  <Input
                    accept=".jpg, .jpeg, .png, .pdf"
                    style={{ display: 'none' }}
                    id={`upload-button-${ele.name}`}
                    type="file"
                    multiple={ele.multiple}
                    onChange={(e) => handleInputChange(ele.name, e.target.files)}
                  />
                  <label htmlFor={`upload-button-${ele.name}`}>
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<CloudUpload />}
                    >
                      {ele.label}
                    </Button>
                  </label>
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
